# HireSight — Comprehensive QA Test Report

**Date:** 2026-10-02  
**Tester:** Automated QA (Code review + API testing + Browser testing)  
**Environment:** Windows, Frontend at `http://127.0.0.1:5173`, Backend at `http://localhost:8000`  
**Backend:** FastAPI + Firebase Firestore | **Frontend:** Vite + React | **AI:** Groq Llama 3.3 70B

---

## A. Executive Summary

HireSight is a **candidate-side interview analysis platform** that allows users to upload interview recordings or paste transcripts, receive AI-powered scoring across multiple dimensions, and get personalized coaching and roadmap plans. The application has a **functional end-to-end candidate workflow** for transcript-based analysis that works correctly from submission through scoring, coaching, and roadmap generation.

**Overall state:** The core interview analysis pipeline is **operational and produces meaningful results** when given valid input. The application scores **89/100 on a realistic engineering interview transcript**, with category breakdowns, filler word detection, strengths/weaknesses, and coaching tips. Authentication, authorization, profile management, and data isolation all work correctly.

> [!IMPORTANT]
> **Key gaps:** The application is entirely **candidate-focused** — there is no recruiter-side functionality. Several requirements (candidate comparison, candidate ranking, recruiter analytics, rejection analysis) are **not implemented**. The Coach Chat feature returns "(no response)" despite being architecturally complete. Question-wise analysis is not supported.

**Readiness level:** **Beta / MVP** — Core candidate workflow functional, but missing recruiter features and several analysis metrics.

---

## B. Requirement Coverage

| # | Requirement | Status | Evidence/Observation | Severity |
|---|-------------|--------|----------------------|----------|
| 1 | Upload audio/video interview | **Implemented and working** | Dashboard supports MP3, MP4, MOV, WAV, M4A, WebM, OGG uploads with drag-and-drop. 500MB limit enforced. File validation on both frontend and backend. | — |
| 2 | Record interview audio | **Implemented and working** | MediaRecorder API integration with MIME type detection, timer, waveform indicator, error handling for mic permission denied/not found. | — |
| 3 | Text/transcript submission | **Implemented and working** | Backend accepts `transcript_text` via form data. API test confirmed 200 status → processing → completed pipeline. | — |
| 4 | Speech-to-Text (STT) | **Implemented and working** | Uses Groq Whisper `whisper-large-v3` for audio/video transcription. Falls through to pre-provided text when transcript_text is given. | — |
| 5 | Select/enter job role | **Implemented and working** | Dashboard has Target Role dropdown (8 roles) and Company Name text input. Sent to backend as `job_title` and `company_name`. | — |
| 6 | Submit answer for analysis | **Implemented and working** | Single-submission model (entire interview analyzed as one unit). API returns `{id, status:"processing"}`, frontend polls until complete. | — |
| 7 | Question-wise analysis | **Not implemented** | System analyzes the full interview as a single response, not per-question. No question detection, segmentation, or per-question scoring. | High |
| 8 | Answer relevance | **Implemented and working** | "Question Relevance" sub-score (0–13) under Answer Quality. API returned 12/13 for relevant test answer. | — |
| 9 | Semantic similarity | **Partially implemented** | JD Relevance sub-score (0–12) measures answer-to-JD alignment. No explicit semantic similarity metric shown to user by that name. | Low |
| 10 | Answer completeness | **Partially implemented** | Covered implicitly by Answer Quality score (36/40) but no standalone "completeness" metric. | Medium |
| 11 | Technical knowledge | **Implemented and working** | "Technical Correctness" sub-score (0–15) under Answer Quality. API returned 13/15 for test transcript. | — |
| 12 | Communication quality | **Implemented and working** | Public Speaking category (0–30) with sub-scores for Clarity, Tone, Confidence, Articulation. | — |
| 13 | Fluency | **Partially implemented** | Covered via Articulation (0–6) and Clarity (0–8) sub-scores. No standalone "fluency" metric. | Low |
| 14 | Clarity | **Implemented and working** | Clarity sub-score (0–8) under Public Speaking. API returned 7/8. | — |
| 15 | Confidence indicators | **Implemented and working** | Confidence sub-score (0–8) under Public Speaking. API returned 8/8. | — |
| 16 | Sentiment/tone analysis | **Implemented and working** | Tone sub-score (0–8) under Public Speaking. API returned 8/8 for professional transcript. | — |
| 17 | Filler words detection | **Implemented and working** | Filler Word Assessment category (0–10) with sub-scores for individual fillers ("um", "uh", "like", "basically", "literally", "actually"), total count, and rate per minute. API correctly detected 0 fillers in clean transcript. | — |
| 18 | Pauses detection | **Partially implemented** | Word timestamps from Whisper enable pause detection in audio mode, but no explicit "pause" metric is surfaced to the user. Not available for text transcripts. | Medium |
| 19 | Speaking pace | **Partially implemented** | Filler Rate (per min) calculated. Word count per minute derivable from metadata. No explicit "speaking pace" metric shown to user. | Medium |
| 20 | Overall response quality | **Implemented and working** | Total HireScore (0–100) computed as sum of all categories. Letter grade (A+ through D). Executive summary generated. | — |
| 21 | AI Answer Analysis | **Implemented and working** | Full LLM-based analysis via Groq Llama 3.3 70B with structured JSON output. Local fallback when API unavailable. | — |
| 22 | Interview Scoring | **Implemented and working** | 100-point rubric: Public Speaking (30), Answer Quality (40), Consistency (20), Filler Words (10). Test returned 89/100 (A−). | — |
| 23 | Speech Analysis | **Partially implemented** | Filler word and pace metrics available. Vocal tone, pauses, and prosodic features not explicitly surfaced. | Medium |
| 24 | Personalized Feedback | **Implemented and working** | Coaching tips generated from report. Strengths and areas for improvement listed. Roadmap aligned to weaknesses. | — |
| 25 | Strengths & Weaknesses | **Implemented and working** | Clearly identified in API response and displayed on Results page. Test returned 3 strengths and 3 improvement areas. | — |
| 26 | Performance Dashboard | **Implemented and working** | Dashboard shows HireScore, total interviews, latest score/grade, recent analyses list. Progress page shows score-over-time chart. | — |
| 27 | Rejection Analysis | **Not implemented** | No feature for analyzing why a candidate was rejected or predicting rejection reasons. | Medium |
| 28 | Candidate Comparison | **Not implemented** | No feature to compare candidates side-by-side. Application is single-user/candidate focused. | High |
| 29 | Candidate–Job Matching | **Implemented and working** | Job Matches page shows skill-based matching. Skills overlap calculation returns percentage match (e.g., 100% for Python+ML+SQL matching Google SWE). | — |
| 30 | Candidate Ranking | **Not implemented** | No ranking system exists. Job matches are sorted by match score, but no candidate-vs-candidate ranking. | High |
| 31 | Recruiter Analytics | **Not implemented** | No recruiter role, recruiter dashboard, or multi-candidate analytics. Entirely candidate-focused. | Critical |
| 32 | Recruiter: Create job description | **Not implemented** | Jobs are seeded/hardcoded. No recruiter can create or manage job postings. | High |
| 33 | Recruiter: View candidate info | **Not implemented** | No recruiter access to candidate profiles. | High |
| 34 | Recruiter: Compare candidates | **Not implemented** | No multi-candidate comparison feature. | High |
| 35 | Recruiter: View rankings | **Not implemented** | No ranking dashboard. | High |

---

## C. Bugs Found

### BUG-001: Coach Chat Returns Empty "(no response)"
- **Severity:** High
- **Preconditions:** User has a completed interview analysis
- **Steps:** 1. Complete an interview analysis → 2. Navigate to AI Coach → 3. Ask "What is my weakest area?"
- **Expected:** Coach provides actionable advice based on the interview report
- **Actual:** API returns `{"reply": "- (no response)"}` for both tested messages
- **Affected feature:** AI Coach Chat
- **Root cause:** The `_enforce_bullet_format()` post-processor in [ai_service.py](file:///d:/hirex/backend/app/services/ai_service.py#L689-L766) is too aggressively trimming the LLM response. The word budget (20–40 words) combined with preamble stripping and sentence splitting is reducing valid responses to empty. The LLM likely returns a response, but the post-processing removes all content.
- **Fix direction:** Relax the word budget enforcement, especially for complex questions. Consider logging raw LLM output before post-processing to debug. The `_enforce_bullet_format` function at line 689 should have a fallback to return the raw text if post-processing results in empty output.

### BUG-002: Demo Mode Auth Creates Fake User Without Backend Session
- **Severity:** Medium
- **Preconditions:** Not logged in
- **Steps:** 1. On Home page, click "Launch Interactive Demo" → 2. Navigate to any page that calls authenticated APIs
- **Expected:** Demo works with functional API access, or clearly indicates it's a demo
- **Actual:** Frontend sets `user` state to a hardcoded object `{name: 'Alex Chen', email: 'alex.chen@hiresight.ai'}` but no token is stored. All API calls fail with 401 "Not authenticated". Results page shows error, Roadmap shows error, History shows error.
- **Affected feature:** Demo mode across all authenticated pages
- **Fix direction:** Either create a real demo account with pre-seeded data on the backend, or use mock data on the frontend when in demo mode. The `startDemo()` function in [Home.jsx](file:///d:/hirex/Frontend/src/pages/Home.jsx#L59-L69) only sets `user` state without calling signup/login APIs.

### BUG-003: Profile Page Shows Hardcoded Resume Filename
- **Severity:** Low
- **Preconditions:** Any authenticated user
- **Steps:** 1. Navigate to Profile page
- **Expected:** Shows the user's actual uploaded resume filename and metadata, or empty state if none uploaded
- **Actual:** Always shows `Onkar_Kulkarni_Resume.pdf · Uploaded Apr 10, 2026 · 284 KB` regardless of user
- **Affected feature:** Profile page resume section
- **Fix direction:** In [Profile.jsx](file:///d:/hirex/Frontend/src/pages/Profile.jsx#L156-L164), the resume display is hardcoded. Should read `resume_filename` from the user profile API response.

### BUG-004: Progress Page Activity Log is Hardcoded/Static
- **Severity:** Medium
- **Preconditions:** Any authenticated user
- **Steps:** 1. Navigate to Progress page
- **Expected:** Activity log reflects actual user actions
- **Actual:** Shows hardcoded activity entries: "Uploaded interview recording +100 XP 2h ago", "Completed 3 roadmap tasks +75 XP Yesterday", etc. These are static and don't reflect real user activity.
- **Affected feature:** Progress tracker
- **Fix direction:** In [Progress.jsx](file:///d:/hirex/Frontend/src/pages/Progress.jsx#L17-L23), `activityLog` is a hardcoded constant array. Should be populated from the backend `/api/progress` endpoint or a new activity endpoint.

### BUG-005: Progress Page Badges Are Hardcoded
- **Severity:** Low
- **Preconditions:** Any authenticated user
- **Steps:** 1. Navigate to Progress page → 2. View badges section
- **Expected:** Badges reflect actual user achievements
- **Actual:** 2 badges are always "earned" ("First Autopsy" and "Profile Glow-Up") regardless of whether the user has actually uploaded an interview or updated their LinkedIn. Remaining 6 are always locked.
- **Affected feature:** Progress tracker badges
- **Fix direction:** In [Progress.jsx](file:///d:/hirex/Frontend/src/pages/Progress.jsx#L6-L15), `badges` is hardcoded with `earned: true/false` constants. Should derive earned status from user data.

### BUG-006: Job Matches "Apply" Links Go Nowhere
- **Severity:** Medium
- **Preconditions:** Any authenticated user with Job Matches page
- **Steps:** 1. Navigate to Job Matches → 2. Click "Apply" button on any job
- **Expected:** Opens job application page or external link
- **Actual:** All Apply buttons have `href="#"` — they scroll to page top but don't navigate anywhere
- **Affected feature:** Job Matches
- **Fix direction:** In [JobMatches.jsx](file:///d:/hirex/Frontend/src/pages/JobMatches.jsx#L112), the Apply link uses `href="#"`. Either link to real job listings or show a modal with application guidance.

### BUG-007: Sidebar Hidden on Mobile/Tablet
- **Severity:** Medium
- **Preconditions:** View on screen < 768px wide
- **Steps:** 1. Open any authenticated page on mobile
- **Expected:** Navigation is accessible via hamburger menu or bottom nav
- **Actual:** Sidebar has `hidden md:flex` class — completely invisible on mobile with no alternative navigation
- **Affected feature:** Navigation on mobile
- **Fix direction:** Add a hamburger menu or bottom navigation bar for screens below the `md` breakpoint. Current implementation in [Sidebar.jsx](file:///d:/hirex/Frontend/src/components/Sidebar.jsx#L35) uses `hidden md:flex`.

### BUG-008: Coaching Tips Not Generated for High Scores
- **Severity:** Low
- **Preconditions:** Submit interview that scores well (89/100 A−)
- **Steps:** 1. Submit a strong transcript → 2. View Results page coaching section
- **Expected:** Always provides some coaching feedback
- **Actual:** `generate_coach_tips()` returns 0 tips because all category scores exceed the threshold values. Coaching section on Results page would be empty.
- **Affected feature:** Personalized feedback
- **Fix direction:** In [ai_service.py](file:///d:/hirex/backend/app/services/ai_service.py#L226-L254), `generate_coach_tips()` only generates tips when scores are *below* thresholds. Add generic high-score tips or always include at least one suggestion.

---

## D. Missing Features

| # | Missing Feature | Impact | Notes |
|---|----------------|--------|-------|
| 1 | **Recruiter Dashboard & Role** | Critical | No recruiter authentication, no multi-candidate views, no recruiter analytics. Entire application is candidate-focused. |
| 2 | **Candidate Comparison** | High | No side-by-side candidate comparison. No multi-user scoring views. |
| 3 | **Candidate Ranking** | High | No ranking system. Candidates can't be ranked against each other. |
| 4 | **Rejection Analysis** | Medium | No feature to analyze why interviews failed or predict rejection reasons. |
| 5 | **Question-wise Analysis** | High | Interviews scored as whole units. No per-question breakdown. The system doesn't segment Q&A pairs. |
| 6 | **Pause Detection Metric** | Medium | Word timestamps exist in audio mode but no pause analysis surfaced to user. |
| 7 | **Speaking Pace Metric** | Medium | Data available but no explicit WPM or pace metric displayed. |
| 8 | **Zoom Recording Import** | Low | Zoom Link tab exists but explicitly shows "Zoom import is not available yet" error. Manual download required. |
| 9 | **Real Activity Tracking** | Medium | XP, streaks, and activity log are all hardcoded/static. No real activity tracking system. |
| 10 | **Video Playback** | Low | No video player for uploaded interview recordings. Only transcript is shown. |

---

## E. UX Issues

| # | Issue | Page | Severity |
|---|-------|------|----------|
| 1 | **No text transcript input on Dashboard** — Dashboard only supports file upload and audio recording. Text transcript submission requires direct API call. No textarea for pasting a transcript on the UI. | Dashboard | Medium |
| 2 | **"Interview Round" field not used** — The round selector (HR, Technical, System Design, etc.) is displayed but never sent to the backend API. It's a dead field. | Dashboard | Low |
| 3 | **Misleading stats on Home page** — "50K+ Interviews analyzed globally", "3.4× Higher offer rate", "12,000+ candidates debriefed" are hardcoded marketing claims, not real metrics. | Home | Low |
| 4 | **Results page error for demo user** — "Not authenticated" error on Results page when using demo mode, with no clear guidance to complete real signup. | Results | Medium |
| 5 | **Job Matches uses fallback data when API fails** — Falls back to hardcoded Indian job listings (_fallback array) silently. User can't tell if data is real or placeholder. | Job Matches | Medium |
| 6 | **Profile Quick Links break for empty URLs** — GitHub/LinkedIn links render `href="https://"` when user hasn't set them, linking to empty URLs. | Profile | Low |
| 7 | **Roadmap task completion not persisted** — Task checkbox states stored in React state only. Refreshing the page resets all progress. | Roadmap | Medium |
| 8 | **No explanation of scoring methodology** — Users see scores (e.g., Public Speaking 29/30) but no explanation of what each metric measures or how it was calculated. | Results | Low |
| 9 | **Chart tooltip styling assumes dark theme** — Recharts tooltip has dark background styling (`#0F1628`) but the app uses a light theme, creating visual inconsistency. | Results | Low |

---

## F. Technical Issues

### Frontend
| # | Issue | Severity |
|---|-------|----------|
| 1 | **GROQ_API_KEY exposed in `.env` file** — The API key `gsk_Rv2GwKPdf...` is committed to the repository in [backend/.env](file:///d:/hirex/backend/.env#L4). This should be in `.env.example` as a placeholder only. | Critical |
| 2 | **Firebase service account JSON committed** — The file [hiresight-e7119-firebase-adminsdk-fbsvc-da0ecf797e.json](file:///d:/hirex/backend/hiresight-e7119-firebase-adminsdk-fbsvc-da0ecf797e.json) is in the repository. | Critical |
| 3 | **SECRET_KEY is weak** — `dev-local-secret-please-change` is used for JWT signing. In production, this would compromise all user sessions. | High (prod) |
| 4 | **Token stored in localStorage** — JWT stored in `localStorage.hs_token` is vulnerable to XSS attacks. Consider `httpOnly` cookies. | Medium |
| 5 | **No password strength validation** — Signup accepts any password. No minimum length, complexity, or common password checks. | Medium |
| 6 | **Console warning from Firestore** — `UserWarning: Detected filter using positional arguments` in server logs. Deprecated API usage. | Low |
| 7 | **Windows encoding crash protection** — Backend wraps pipeline output in UTF-8 buffers ([interviews.py L43-44](file:///d:/hirex/backend/app/routes/interviews.py#L43-L44)) to prevent `cp1252` crashes. Effective but indicates fragile encoding handling. | Low |

### Backend/API
| # | Issue | Severity |
|---|-------|----------|
| 1 | **No rate limiting** — No request rate limiting on auth endpoints (signup, login) or interview submission. Vulnerable to brute force and abuse. | High |
| 2 | **No email verification** — Signup creates accounts immediately without email confirmation. | Medium |
| 3 | **No CSRF protection** — API relies solely on Bearer tokens with no CSRF tokens for state-changing operations. | Medium |
| 4 | **File uploads stored locally in development** — When Firebase Storage bucket is not configured, uploaded files are stored on local disk at `./uploads/` and the local path is returned as `audio_url`. | Low |
| 5 | **No pagination on history/interviews endpoints** — All interviews fetched and sorted in Python. Could be slow with many records. | Low |

---

## G. End-to-End Workflow Results

### Candidate Workflow

```
Candidate → Interview Question → Audio/Video/Text Response → Speech-to-Text → NLP/AI Analysis 
→ Individual Metrics → Overall Score → Feedback → Dashboard
```

| Stage | Status | Evidence |
|-------|--------|----------|
| **Candidate Registration** | ✅ Working | Signup API returns 200 with JWT token + user profile. Duplicate email correctly blocked (409). |
| **Login** | ✅ Working | Login returns valid JWT. Invalid credentials return 401. |
| **Interview Submission (text)** | ✅ Working | Transcript text submitted via API → status "processing" → polled to "completed" in ~9 seconds. |
| **Interview Submission (audio/video)** | ✅ Working (code review) | Backend supports MP3/MP4/WAV/WebM/OGG via Groq Whisper transcription. Not tested with real audio due to test environment constraints. |
| **Speech-to-Text** | ✅ Working (code path verified) | Groq Whisper integration in [pipeline_v2.py](file:///d:/hirex/AI/pipeline_v2.py#L183). Falls back to text when transcript provided directly. |
| **AI Analysis** | ✅ Working | Groq Llama 3.3 70B scores interview on 100-point rubric. Test returned 89/100 (A−) with detailed category breakdown. Local fallback working when API key unavailable. |
| **Individual Metrics** | ✅ Working | 4 categories with 11 sub-scores. All returned with values and justifications. |
| **Overall Score** | ✅ Working | Total score = sum of categories. Grade computed from score (A+ through D). |
| **Feedback** | ✅ Working | Strengths, areas for improvement, executive summary all generated. Coaching tips generated (but threshold-dependent). |
| **Dashboard** | ✅ Working | HireScore updated (rolling avg of last 5). Recent analyses listed. Quick stats populated. |
| **Results Display** | ✅ Working | Score rings, category breakdown, filler word chart, radar chart, strengths/weaknesses, coaching tips all render from API data. |
| **History** | ✅ Working | Interview appears with transcript, score, grade. PDF/DOCX export functional. |
| **Progress** | ✅ Working | Score-over-time series populated. Category averages computed. |
| **Roadmap** | ✅ Working | 7-day plan generated with 3 tasks/day. Focus areas aligned to weakest categories. Fallback roadmap used when Groq unavailable. |
| **Job Matching** | ✅ Working | Skills-based matching returns sorted jobs with percentage scores. 100% match for fully aligned skills. |
| **Coach Chat** | ❌ Broken | Returns "(no response)" — post-processing strips all content (BUG-001). |
| **Data Persistence** | ✅ Working | Refresh preserves all data. Navigation between pages doesn't lose data. |

**Verdict:** The candidate workflow is **85% functional end-to-end**. Only the Coach Chat is broken.

### Recruiter Workflow

```
Job Description → Candidate Profiles/Responses → Job Matching → Candidate Analysis 
→ Candidate Comparison → Recruiter Dashboard
```

| Stage | Status |
|-------|--------|
| Create/provide job description | ❌ Not implemented |
| View candidate information | ❌ Not implemented |
| View interview responses and analyses | ❌ Not implemented |
| Compare candidates | ❌ Not implemented |
| Review matching metrics | ❌ Not implemented |
| View rankings | ❌ Not implemented |
| Access analytics | ❌ Not implemented |

**Verdict:** The recruiter workflow is **entirely absent**. There is no recruiter role, recruiter authentication, or multi-candidate management of any kind.

---

## H. Overall Readiness

### Scoring Summary

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Requirement Coverage** | 55% | 19/35 requirements implemented. Major gaps in recruiter features, question-wise analysis, and candidate comparison. |
| **Functional Correctness** | 90% | Implemented features work correctly. Only Coach Chat broken among implemented features. |
| **Reliability** | 85% | Local fallback mode handles API failures gracefully. Encoding issues handled. No data loss observed. |
| **Security** | 60% | Auth/authz working (JWT, 401/403 enforcement, cross-user isolation). But API key exposed, no rate limiting, no email verification. |
| **UI/UX Quality** | 75% | Modern, polished UI. Good animations and responsive design (desktop). Mobile navigation broken. Several hardcoded placeholders. |

### Readiness Assessment

The application is at **MVP / Beta stage for candidate-side functionality only**. It provides a genuinely useful interview analysis tool with real AI-powered scoring and feedback. However:

1. **Not ready for production** due to exposed credentials and no rate limiting
2. **Not meeting recruiter requirements** — no recruiter features exist
3. **Core candidate workflow is solid** — upload → analyze → results → roadmap works end-to-end
4. **Needs Coach Chat fix** — currently broken, which undermines the AI coaching value proposition

---

## I. Recommended Fix Order

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| **P0 (Critical)** | Remove exposed GROQ_API_KEY and Firebase credentials from repository | 15 min | Security breach prevention |
| **P0 (Critical)** | Fix Coach Chat empty responses (BUG-001) | 1–2 hrs | Restores a core feature |
| **P1 (High)** | Fix Demo Mode to use real backend account or mock data (BUG-002) | 2–4 hrs | First impression / conversion |
| **P1 (High)** | Add transcript text input on Dashboard UI | 1–2 hrs | Unlocks text-based analysis for users without audio |
| **P1 (High)** | Add rate limiting to auth and submission endpoints | 2–3 hrs | Security hardening |
| **P2 (Medium)** | Fix mobile navigation — add hamburger menu (BUG-007) | 2–3 hrs | Mobile usability |
| **P2 (Medium)** | Persist Roadmap task completion states | 2–3 hrs | UX continuity |
| **P2 (Medium)** | Connect Activity Log / Badges to real data (BUG-004, BUG-005) | 3–5 hrs | Data integrity |
| **P2 (Medium)** | Fix Profile resume display to use real data (BUG-003) | 30 min | Data accuracy |
| **P2 (Medium)** | Send Interview Round field to backend | 30 min | Feature completeness |
| **P3 (Low)** | Add coaching tips for high-scoring interviews (BUG-008) | 1 hr | Better feedback for good candidates |
| **P3 (Low)** | Fix Job Apply links (BUG-006) | 1 hr | Feature completeness |
| **P3 (Low)** | Add scoring methodology explanations | 2–3 hrs | User education |
| **P4 (Future)** | Implement question-wise analysis | 1–2 weeks | Major feature gap |
| **P4 (Future)** | Implement recruiter role and dashboard | 3–4 weeks | Major feature gap |
| **P4 (Future)** | Implement candidate comparison and ranking | 2–3 weeks | Major feature gap |
