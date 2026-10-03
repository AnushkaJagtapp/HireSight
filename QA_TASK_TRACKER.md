# HireSight QA Report Task Tracker

| Priority | ID | Task | Owner | Status | Notes |
|---|---|---|---|---|---|
| **P0** | SEC-001 | Remove exposed `GROQ_API_KEY` from `backend/.env` & sanitize configs | Security | ✅ Completed | Key removed from `.env` files, placeholder in `.env.example`, rotation required in Groq console |
| **P0** | SEC-002 | Remove Firebase service account JSON from repo & ensure `.gitignore` rules | Security | ✅ Completed | Service account JSON ignored in root & backend `.gitignore`, credentials rotation required in Firebase console |
| **P0** | BUG-001 | Fix Coach Chat returning "(no response)" | AI/Backend | ✅ Completed | Budget relaxed (80/120 words), raw fallback added, preamble stripping narrowed, raw output logged |
| **P1** | BUG-002 | Fix demo mode (seeded demo account or frontend mock data) | Frontend/Backend | ✅ Completed | Added `/api/auth/demo` endpoint with seeded demo account & interview analysis; added frontend mock fallback |
| **P1** | FE-001 | Add transcript paste textarea to Dashboard UI | Frontend | ✅ Completed | Added Paste Transcript tab, textarea, sample loader, word/char counters, and submit support |
| **P1** | SEC-003 | Add rate limiting to auth (signup, login) & interview submission | Backend | ✅ Completed | Implemented slowapi rate limiting (5/min signup, 10/min login/interview submit) with custom 429 handler |
| **P1** | SEC-004 | Replace weak `SECRET_KEY` with strong env secret | Security | ✅ Completed | Replaced weak key with cryptographically strong 64-char hex secret and enhanced production validation |
| **P2** | BUG-007 | Add hamburger menu / bottom nav for mobile screens (<768px) | Frontend | ⏳ Pending | |
| **P2** | BE-001 | Persist Roadmap task completion states to backend | Backend | ⏳ Pending | |
| **P2** | BUG-004 | Replace hardcoded Activity Log in `Progress.jsx` with real data | Frontend | ⏳ Pending | |
| **P2** | BUG-005 | Derive badge earned status from real user data | Frontend | ⏳ Pending | |
| **P2** | BUG-003 | Read resume filename and metadata from profile API | Frontend | ⏳ Pending | |
| **P2** | FE-002 | Send Interview Round field to backend | Frontend | ⏳ Pending | |
| **P2** | FE-003 | Show clear message when Job Matches falls back to placeholders | Frontend | ⏳ Pending | |
| **P2** | FE-004 | Show clear guidance on Results page for unauthenticated demo users | Frontend | ⏳ Pending | |
| **P2** | SEC-005 | Add password strength validation on signup | Backend/Frontend | ⏳ Pending | |
| **P2** | SEC-006 | Add email verification on signup | Backend | ⏳ Pending | |
| **P2** | SEC-007 | Add CSRF protection / httpOnly cookies for JWT | Security/Backend | ⏳ Pending | |
| **P2** | AI-001 | Surface speaking pace (WPM) metric to users | AI/Frontend | ⏳ Pending | |
| **P2** | AI-002 | Surface pause detection metric for audio mode | AI/Frontend | ⏳ Pending | |
| **P3** | BUG-008 | Generate at least one coaching tip for high-scoring interviews | AI | ⏳ Pending | |
| **P3** | BUG-006 | Fix Job Apply links using `href="#"` | Frontend | ⏳ Pending | |
| **P3** | FE-005 | Add scoring methodology explanations on Results page | Frontend | ⏳ Pending | |
| **P3** | FE-006 | Hide/fix Profile quick links when GitHub/LinkedIn URLs empty | Frontend | ⏳ Pending | |
| **P3** | FE-007 | Replace hardcoded marketing stats on Home page or label illustrative | Frontend | ⏳ Pending | |
| **P3** | FE-008 | Fix Recharts tooltip styling for light theme | Frontend | ⏳ Pending | |
| **P3** | BE-002 | Update deprecated Firestore positional filter arguments | Backend | ✅ Completed | Fully replaced Firestore with zero-config LocalDB |
| **P3** | BE-003 | Add pagination to history/interviews endpoints | Backend | ⏳ Pending | |
| **P3** | BE-004 | Review Windows UTF-8 encoding workaround in `interviews.py` | Backend | ⏳ Pending | |
| **P3** | BE-005 | Review local file upload storage when no Firebase bucket configured | Backend | ✅ Completed | Local persistent file storage adopted as primary standalone storage |
| **P4** | FEAT-001 | Question-wise analysis (detection, segmentation, per-question scoring) | AI/Backend | ⏳ Pending | Est. 1-2 weeks |
| **P4** | FEAT-002 | Recruiter role & dashboard | Fullstack | ⏳ Pending | Est. 3-4 weeks |
| **P4** | FEAT-003 | Candidate comparison & ranking | Fullstack | ⏳ Pending | Est. 2-3 weeks |
| **P4** | FEAT-004 | Rejection analysis | AI/Backend | ⏳ Pending | |
| **P4** | FEAT-005 | Standalone metrics (completeness, semantic similarity, fluency) | AI | ⏳ Pending | |
| **P4** | FEAT-006 | Zoom recording import | Integrations | ⏳ Pending | |
| **P4** | FEAT-007 | Video player for uploaded recordings | Frontend | ⏳ Pending | |
| **P4** | FEAT-008 | Real activity tracking (XP, streaks) | Gamification | ⏳ Pending | |
