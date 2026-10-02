/**
 * Mock data fallback for Demo Mode.
 * Ensures the frontend can run seamlessly even if backend is offline.
 */

export const MOCK_DEMO_TOKEN = 'demo-seeded-token-alex-chen';

export const MOCK_DEMO_USER = {
  id: 'demo-alex-chen-id',
  name: 'Alex Chen',
  email: 'alex.chen@hiresight.ai',
  role: 'Senior Fullstack Engineer',
  college: 'Stanford University',
  created_at: '2026-09-15T10:00:00.000000',
  phone: '+1 (415) 890-2134',
  location: 'San Francisco, CA',
  level: 'Senior (6+ yrs)',
  github: 'https://github.com/alexchen-dev',
  linkedin: 'https://linkedin.com/in/alexchen-dev',
  gmail: 'alex.chen@hiresight.ai',
  skills: 'React, TypeScript, Python, FastAPI, Node.js, PostgreSQL, Docker, AWS, System Design, GraphQL',
  bio: 'Senior full-stack engineer passionate about distributed systems, developer velocity, and scalable web architectures.',
  resume_url: '',
  hirescore: 89,
  roadmap_days: 30,
};

export const MOCK_DEMO_INTERVIEW = {
  id: 'demo-interview-stripe-001',
  user_id: 'demo-alex-chen-id',
  created_at: '2026-10-01T14:20:00.000000',
  status: 'completed',
  completed_at: '2026-10-01T14:22:30.000000',
  job_description: 'We are seeking a Senior Fullstack Engineer to build high-availability payment flows, robust backend APIs, and developer-facing dashboards.',
  job_title: 'Senior Fullstack Engineer',
  company_name: 'Stripe',
  audio_url: '',
  has_transcript_text: true,
  original_filename: 'stripe_technical_round.txt',
  file_kind: 'transcript',
  file_ext: '.txt',
  total_score: 89.0,
  grade: 'A-',
  report: {
    total_score: 89.0,
    grade: 'A-',
    category_breakdown: {
      public_speaking: {
        score: 27.0,
        max: 30,
        sub_scores: {
          'Clarity (0-8)': 7.5,
          'Tone (0-8)': 8.0,
          'Confidence (0-8)': 7.5,
          'Articulation (0-6)': 4.0,
        },
      },
      answer_quality: {
        score: 36.0,
        max: 40,
        sub_scores: {
          'Question Relevance (0-13)': 12.0,
          'Technical Correctness (0-15)': 14.0,
          'JD Relevance (0-12)': 10.0,
        },
      },
      consistency_truthfulness: {
        score: 18.0,
        max: 20,
        sub_scores: {
          'Profile Truth (0-10)': 9.0,
          'Role Alignment (0-10)': 9.0,
        },
      },
      filler_word_assessment: {
        score: 8.0,
        max: 10,
        sub_scores: {
          '"um"': 0,
          '"uh"': 0,
          '"like"': 1,
          '"basically"': 1,
          '"literally"': 0,
          '"actually"': 1,
          'Total Fillers': 3,
          'Filler Rate (per min)': 0.8,
          'Score Penalty': 2,
        },
      },
    },
    strengths: [
      'Exceptional depth in distributed systems, idempotency keys, and transaction guarantees',
      'Clear, structured communication with crisp technical articulation',
      'Strong resilience planning, detailing fallback mechanisms when Redis or cache nodes fail',
    ],
    improvement_areas: [
      'Consider proactively mentioning metrics or latency impact under heavy database contention',
      'Slightly fast cadence during the Redis fallback explanation',
      'Could briefly address clock drift across multi-region deployments',
    ],
    executive_summary:
      'The candidate demonstrated exceptional domain expertise for the Senior Fullstack Engineer role at Stripe. The architectural approach to idempotency, distributed locking, and cache fallback was robust, battle-tested, and well-articulated. Overall HireScore of 89/100 (A-) reflects strong hire potential.',
    metadata: {
      full_transcript:
        'Interviewer: Can you explain how you design and implement distributed idempotency in a high-volume payment processing system?\n\nCandidate: Certainly. At Stripe, when a client submits a charge request, network retries or timeouts can cause the request to be delivered more than once. To guarantee idempotency, we require every state-mutating API call to carry a unique Idempotency-Key header. On the gateway, we first check a distributed Redis lock and cache with a short lease using SETNX. If a request with the same idempotency key is currently executing, subsequent concurrent requests receive a 409 or wait for the initial lock. Once processing completes inside a transactional database boundary in PostgreSQL, we store the full response payload and status alongside the idempotency key in an idempotency table. If any identical request arrives subsequently within a 24-hour expiration window, we bypass business logic execution entirely and safely replay the cached response.\n\nInterviewer: That is very solid. How do you handle a scenario where Redis fails mid-transaction?\n\nCandidate: Redis acts strictly as a fast admission-control layer, not the source of truth. The authoritative idempotency check is always backed by a unique constraint on the idempotency key column in PostgreSQL. If Redis fails, the request falls back directly to the primary database with optimistic locking and insert-on-conflict handling.',
      candidate_word_count: 285,
    },
  },
  coaching: {
    tips: [
      {
        area: 'System Architecture',
        tip: 'When discussing high-throughput distributed locks, explicitly contrast Redis redlock vs PostgreSQL row locks under cross-region latency.',
      },
      {
        area: 'Delivery & Pacing',
        tip: 'Incorporate a brief pause when transitioning between the cache tier and database transaction boundary to give the interviewer time to absorb the architecture.',
      },
    ],
    improvement_areas: [
      'Consider proactively mentioning metrics or latency impact under heavy database contention',
      'Slightly fast cadence during the Redis fallback explanation',
      'Could briefly address clock drift across multi-region deployments',
    ],
    strengths: [
      'Exceptional depth in distributed systems, idempotency keys, and transaction guarantees',
      'Clear, structured communication with crisp technical articulation',
      'Strong resilience planning, detailing fallback mechanisms when Redis or cache nodes fail',
    ],
  },
  transcript_text_full:
    'Interviewer: Can you explain how you design and implement distributed idempotency in a high-volume payment processing system?\n\nCandidate: Certainly. At Stripe, when a client submits a charge request, network retries or timeouts can cause the request to be delivered more than once. To guarantee idempotency, we require every state-mutating API call to carry a unique Idempotency-Key header. On the gateway, we first check a distributed Redis lock and cache with a short lease using SETNX. If a request with the same idempotency key is currently executing, subsequent concurrent requests receive a 409 or wait for the initial lock. Once processing completes inside a transactional database boundary in PostgreSQL, we store the full response payload and status alongside the idempotency key in an idempotency table. If any identical request arrives subsequently within a 24-hour expiration window, we bypass business logic execution entirely and safely replay the cached response.\n\nInterviewer: That is very solid. How do you handle a scenario where Redis fails mid-transaction?\n\nCandidate: Redis acts strictly as a fast admission-control layer, not the source of truth. The authoritative idempotency check is always backed by a unique constraint on the idempotency key column in PostgreSQL. If Redis fails, the request falls back directly to the primary database with optimistic locking and insert-on-conflict handling.',
};

export const MOCK_DEMO_DASHBOARD = {
  hirescore: 89,
  total_interviews: 1,
  latest_score: 89,
  latest_grade: 'A-',
  latest_breakdown: MOCK_DEMO_INTERVIEW.report.category_breakdown,
  recent: [
    {
      id: MOCK_DEMO_INTERVIEW.id,
      total_score: 89,
      grade: 'A-',
      completed_at: '2026-10-01T14:22:30.000000',
      job_title: 'Senior Fullstack Engineer',
    },
  ],
};

export const MOCK_DEMO_ROADMAP = {
  days: 30,
  focus_areas: ['Distributed Systems Latency', 'Pacing & Strategic Pauses', 'ACID Trade-off Articulation'],
  weeks: [
    {
      week_num: 1,
      title: 'Advanced System Architecture & Latency Profiling',
      description: 'Master deep dives into distributed locks, caching invalidation, and database indexing.',
      days: [
        {
          day: 1,
          theme: 'Idempotency & Distributed Locking',
          tasks: [
            'Whiteboard Redis Redlock vs Postgres row locks under network partition scenarios.',
            'Record a 3-minute explanation contrasting at-least-once vs exactly-once semantics.',
            'Review HireSight coaching tips on delivery pacing.',
          ],
        },
        {
          day: 2,
          theme: 'Database Indexing & Query Plans',
          tasks: [
            'Analyze EXPLAIN ANALYZE for B-Tree vs Hash vs GIN indexes in PostgreSQL.',
            'Draft a response on how to mitigate table bloat during high-frequency updates.',
            'Practice vocal pausing after stating key quantitative throughput metrics.',
          ],
        },
      ],
    },
  ],
};
