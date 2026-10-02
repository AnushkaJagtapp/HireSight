"""Signup / login routes."""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm

from ..firebase import get_db
from ..schemas import SignupRequest, LoginRequest, TokenResponse
from ..security import (
    hash_password, verify_password, create_access_token, get_current_user,
)
from ..limiter import limiter

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _user_public(doc_id: str, data: dict) -> dict:
    data = {**data, "id": doc_id}
    data.pop("password_hash", None)
    return data


def seed_demo_account(db) -> tuple[str, dict]:
    """Ensure a rich demo user and seeded interview exist, returning (doc_id, user_data)."""
    users = db.collection("users")
    demo_email = "alex.chen@hiresight.ai"
    found = list(users.where("email", "==", demo_email).limit(1).stream())

    if found:
        user_doc = found[0]
        user_id = user_doc.id
        user_data = user_doc.to_dict()
    else:
        user_ref = users.document()
        user_id = user_ref.id
        user_data = {
            "name": "Alex Chen",
            "email": demo_email,
            "password_hash": hash_password("DemoPassword123!"),
            "role": "Senior Fullstack Engineer",
            "college": "Stanford University",
            "created_at": "2026-09-15T10:00:00.000000",
            "phone": "+1 (415) 890-2134",
            "location": "San Francisco, CA",
            "level": "Senior (6+ yrs)",
            "github": "https://github.com/alexchen-dev",
            "linkedin": "https://linkedin.com/in/alexchen-dev",
            "gmail": demo_email,
            "skills": "React, TypeScript, Python, FastAPI, Node.js, PostgreSQL, Docker, AWS, System Design, GraphQL",
            "bio": "Senior full-stack engineer passionate about distributed systems, developer velocity, and scalable web architectures.",
            "resume_url": "",
            "hirescore": 89,
            "roadmap_days": 30,
        }
        user_ref.set(user_data)

    # Check if demo user has any interviews
    interviews = db.collection("interviews")
    demo_interviews = list(interviews.where("user_id", "==", user_id).limit(1).stream())
    if not demo_interviews:
        # Seed realistic completed interview
        interview_ref = interviews.document()
        transcript = (
            "Interviewer: Can you explain how you design and implement distributed idempotency in a high-volume payment processing system?\n\n"
            "Candidate: Certainly. At Stripe, when a client submits a charge request, network retries or timeouts can cause the request to be delivered more than once. "
            "To guarantee idempotency, we require every state-mutating API call to carry a unique Idempotency-Key header. On the gateway, we first check a distributed Redis lock and cache "
            "with a short lease using SETNX. If a request with the same idempotency key is currently executing, subsequent concurrent requests receive a 409 or wait for the initial lock. "
            "Once processing completes inside a transactional database boundary in PostgreSQL, we store the full response payload and status alongside the idempotency key in an idempotency table. "
            "If any identical request arrives subsequently within a 24-hour expiration window, we bypass business logic execution entirely and safely replay the cached response. "
            "We also ensure that database mutations use ACID transactions with row-level locks on account balance ledgers to prevent double-spending or race conditions.\n\n"
            "Interviewer: That's very solid. How do you handle a scenario where Redis fails or cache nodes crash mid-transaction?\n\n"
            "Candidate: Great question. Redis acts strictly as a fast admission-control layer, not the source of truth. The authoritative idempotency check is always backed by a unique constraint "
            "on the idempotency key column in PostgreSQL. If Redis fails, the request falls back directly to the primary database with optimistic locking and insert-on-conflict handling. "
            "Furthermore, for downstream payment networks, we pass our own deterministic internal payment reference ID as their external idempotency identifier so upstream retries never result in duplicate external charges."
        )
        report = {
            "total_score": 89.0,
            "grade": "A-",
            "category_breakdown": {
                "public_speaking": {
                    "score": 27.0,
                    "max": 30,
                    "sub_scores": {
                        "Clarity (0-8)": 7.5,
                        "Tone (0-8)": 8.0,
                        "Confidence (0-8)": 7.5,
                        "Articulation (0-6)": 4.0,
                    },
                },
                "answer_quality": {
                    "score": 36.0,
                    "max": 40,
                    "sub_scores": {
                        "Question Relevance (0-13)": 12.0,
                        "Technical Correctness (0-15)": 14.0,
                        "JD Relevance (0-12)": 10.0,
                    },
                },
                "consistency_truthfulness": {
                    "score": 18.0,
                    "max": 20,
                    "sub_scores": {
                        "Profile Truth (0-10)": 9.0,
                        "Role Alignment (0-10)": 9.0,
                    },
                },
                "filler_word_assessment": {
                    "score": 8.0,
                    "max": 10,
                    "sub_scores": {
                        '"um"': 0,
                        '"uh"': 0,
                        '"like"': 1,
                        '"basically"': 1,
                        '"literally"': 0,
                        '"actually"': 1,
                        "Total Fillers": 3,
                        "Filler Rate (per min)": 0.8,
                        "Score Penalty": 2,
                    },
                },
            },
            "strengths": [
                "Exceptional depth in distributed systems, idempotency keys, and transaction guarantees",
                "Clear, structured communication with crisp technical articulation",
                "Strong resilience planning, detailing fallback mechanisms when Redis or cache nodes fail",
            ],
            "improvement_areas": [
                "Consider proactively mentioning metrics or latency impact under heavy database contention",
                "Slightly fast cadence during the Redis fallback explanation",
                "Could briefly address clock drift across multi-region deployments",
            ],
            "executive_summary": (
                "The candidate demonstrated exceptional domain expertise for the Senior Fullstack Engineer role. "
                "The architectural approach to idempotency, distributed locking, and cache fallback was robust, "
                "battle-tested, and well-articulated. Overall HireScore of 89/100 (A-) reflects strong hire potential."
            ),
            "metadata": {
                "full_transcript": transcript,
                "candidate_word_count": 285,
                "questions_evaluated": [
                    "Can you explain how you design and implement distributed idempotency in a high-volume payment processing system?",
                    "How do you handle a scenario where Redis fails or cache nodes crash mid-transaction?",
                ],
            },
        }
        coaching = {
            "tips": [
                {
                    "area": "System Architecture",
                    "tip": "When discussing high-throughput distributed locks, explicitly contrast Redis redlock vs PostgreSQL row locks under cross-region latency.",
                },
                {
                    "area": "Delivery & Pacing",
                    "tip": "Incorporate a brief pause when transitioning between the cache tier and database transaction boundary to give the interviewer time to absorb the architecture.",
                },
            ],
            "improvement_areas": report["improvement_areas"],
            "strengths": report["strengths"],
        }
        interview_ref.set({
            "user_id": user_id,
            "created_at": "2026-10-01T14:20:00.000000",
            "status": "completed",
            "completed_at": "2026-10-01T14:22:30.000000",
            "job_description": "We are seeking a Senior Fullstack Engineer to build high-availability payment flows, robust backend APIs, and developer-facing dashboards.",
            "job_title": "Senior Fullstack Engineer",
            "company_name": "Stripe",
            "audio_url": "",
            "has_transcript_text": True,
            "original_filename": "stripe_technical_round.txt",
            "file_kind": "transcript",
            "file_ext": ".txt",
            "total_score": 89.0,
            "grade": "A-",
            "report": report,
            "coaching": coaching,
            "transcript_text_full": transcript,
        })
    return user_id, user_data


@router.post("/signup", response_model=TokenResponse)
@limiter.limit("5/minute")
def signup(request: Request, req: SignupRequest):
    db = get_db()
    users = db.collection("users")
    # check email unique
    existing = list(users.where("email", "==", req.email.lower()).limit(1).stream())
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    doc_ref = users.document()
    payload = {
        "name": req.name,
        "email": req.email.lower(),
        "password_hash": hash_password(req.password),
        "role": req.role or "",
        "college": req.college or "",
        "created_at": datetime.utcnow().isoformat(),
        # profile defaults (editable from Profile page)
        "phone": "", "location": "", "level": "",
        "github": "", "linkedin": "", "gmail": req.email.lower(),
        "skills": "", "bio": "",
        "resume_url": "",
        "hirescore": 0,
    }
    doc_ref.set(payload)

    token = create_access_token(subject=doc_ref.id)
    return TokenResponse(access_token=token, user=_user_public(doc_ref.id, payload))


@router.post("/login", response_model=TokenResponse)
@limiter.limit("10/minute")
def login(request: Request, req: LoginRequest):
    db = get_db()
    users = db.collection("users")
    found = list(users.where("email", "==", req.email.lower()).limit(1).stream())
    if not found:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    doc = found[0]
    data = doc.to_dict()
    if not verify_password(req.password, data.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(subject=doc.id)
    return TokenResponse(access_token=token, user=_user_public(doc.id, data))


@router.post("/token", response_model=TokenResponse)
@limiter.limit("10/minute")
def token_login(request: Request, form: OAuth2PasswordRequestForm = Depends()):
    """OAuth2 password-flow adapter (so Swagger UI `Authorize` works)."""
    return login(request, LoginRequest(email=form.username, password=form.password))


@router.post("/demo", response_model=TokenResponse)
@limiter.limit("15/minute")
def demo_auth(request: Request):
    """Return a session for a real seeded demo user with pre-populated interview data."""
    db = get_db()
    user_id, user_data = seed_demo_account(db)
    token = create_access_token(subject=user_id)
    return TokenResponse(access_token=token, user=_user_public(user_id, user_data))


@router.get("/me")
def me(current=Depends(get_current_user)):
    return current
