import axios from 'axios';

// In Vercel multi-service deployment, /api rewrites route directly to the backend service.
// In standalone Vite dev, vite.config.js proxies /api to http://127.0.0.1:8000.
const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({ baseURL: API_BASE });

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hs_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

import {
  MOCK_DEMO_TOKEN,
  MOCK_DEMO_USER,
  MOCK_DEMO_INTERVIEW,
  MOCK_DEMO_DASHBOARD,
  MOCK_DEMO_ROADMAP,
} from './mockDemo';

export const isDemoToken = (token) =>
  token === MOCK_DEMO_TOKEN || (typeof token === 'string' && token.startsWith('demo-'));

// On 401, clear session (unless in mock demo mode)
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const token = localStorage.getItem('hs_token');
    if (err?.response?.status === 401 && !isDemoToken(token)) {
      localStorage.removeItem('hs_token');
      localStorage.removeItem('hs_user');
    }
    return Promise.reject(err);
  }
);

export default api;

// ── Auth ──
export const signup = (data) => api.post('/api/auth/signup', data).then(r => r.data);
export const login = (data) => api.post('/api/auth/login', data).then(r => r.data);
export const getMe = () => {
  const token = localStorage.getItem('hs_token');
  return api.get('/api/auth/me').then(r => r.data).catch(err => {
    if (isDemoToken(token)) return MOCK_DEMO_USER;
    throw err;
  });
};

export const demoLogin = async () => {
  try {
    const res = await api.post('/api/auth/demo');
    if (res?.data?.access_token) {
      return res.data;
    }
  } catch (err) {
    console.warn('[demoLogin] Backend demo auth unavailable, using mock session fallback:', err?.message);
  }
  return {
    access_token: MOCK_DEMO_TOKEN,
    user: MOCK_DEMO_USER,
  };
};

export const saveSession = ({ access_token, user }) => {
  localStorage.setItem('hs_token', access_token);
  localStorage.setItem('hs_user', JSON.stringify(user));
};
export const loadSession = () => {
  const token = localStorage.getItem('hs_token');
  const user = localStorage.getItem('hs_user');
  if (!token || !user) return null;
  try { return { token, user: JSON.parse(user) }; } catch { return null; }
};
export const clearSession = () => {
  localStorage.removeItem('hs_token');
  localStorage.removeItem('hs_user');
};

// ── Profile ──
export const updateProfile = (patch) => api.patch('/api/users/me', patch).then(r => r.data);
export const uploadResume = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/api/users/me/resume', fd).then(r => r.data);
};

// ── Interviews ──
export const submitInterview = ({ file, transcript_text, job_description, job_title, company_name }) => {
  const fd = new FormData();
  if (file) fd.append('file', file);
  if (transcript_text) fd.append('transcript_text', transcript_text);
  fd.append('job_description', job_description || '');
  fd.append('job_title', job_title || '');
  fd.append('company_name', company_name || '');
  return api.post('/api/interviews/', fd).then(r => r.data);
};
export const listInterviews = () => {
  const token = localStorage.getItem('hs_token');
  return api.get('/api/interviews/').then(r => r.data).catch(err => {
    if (isDemoToken(token)) return [MOCK_DEMO_INTERVIEW];
    throw err;
  });
};
export const getInterview = (id) => {
  const token = localStorage.getItem('hs_token');
  return api.get(`/api/interviews/${id}`).then(r => r.data).catch(err => {
    if (isDemoToken(token)) return MOCK_DEMO_INTERVIEW;
    throw err;
  });
};

// ── Dashboard / Progress / Jobs / Coach / Roadmap ──
export const getDashboard = () => {
  const token = localStorage.getItem('hs_token');
  return api.get('/api/dashboard').then(r => r.data).catch(err => {
    if (isDemoToken(token)) return MOCK_DEMO_DASHBOARD;
    throw err;
  });
};
export const getProgress = () => {
  const token = localStorage.getItem('hs_token');
  return api.get('/api/progress').then(r => r.data).catch(err => {
    if (isDemoToken(token)) {
      return {
        series: [{ date: '2026-10-01', score: 89 }],
        category_averages: { public_speaking: 27, answer_quality: 36, consistency_truthfulness: 18, filler_word_assessment: 8 },
        total: 1,
      };
    }
    throw err;
  });
};
export const getJobs = () => api.get('/api/jobs').then(r => r.data);
export const getCoach = () => {
  const token = localStorage.getItem('hs_token');
  return api.get('/api/coach').then(r => r.data).catch(err => {
    if (isDemoToken(token)) return MOCK_DEMO_INTERVIEW.coaching;
    throw err;
  });
};
export const getRoadmap = (days) => {
  const token = localStorage.getItem('hs_token');
  return api.get('/api/roadmap', { params: days ? { days } : {} }).then(r => r.data).catch(err => {
    if (isDemoToken(token)) return MOCK_DEMO_ROADMAP;
    throw err;
  });
};
export const saveRoadmapPreferences = (days) =>
  api.post('/api/roadmap/preferences', { days }).then(r => r.data);
export const postCoachChat = ({ message, history }) =>
  api.post('/api/coach/chat', { message, history: history || [] }).then(r => r.data);

// ── History ──
export const listHistory = () => api.get('/api/history').then(r => r.data);
export const deleteHistoryEntry = (id) => api.delete(`/api/history/${id}`).then(r => r.data);
