"""FastAPI application entrypoint for the AI service."""
import os
import shutil
import tempfile
from typing import Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from pipeline_v2 import evaluate_interview

app = FastAPI(
    title="HireSight AI Service",
    description="Internal AI service for speech transcription, diarization, and interview evaluation.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"service": "ai", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/evaluate")
async def evaluate(
    file: Optional[UploadFile] = File(None),
    resume_file: Optional[UploadFile] = File(None),
    transcript_text: Optional[str] = Form(None),
    job_description: str = Form(""),
    job_title: str = Form(""),
    company_name: str = Form(""),
    github_url: Optional[str] = Form(None),
    linkedin_url: Optional[str] = Form(None),
    language: str = Form("en"),
):
    """Run the complete interview evaluation pipeline and return structured report."""
    temp_dir = tempfile.mkdtemp(prefix="hiresight_ai_")
    interview_file_path = ""
    resume_file_path = None

    try:
        if file and file.filename:
            interview_file_path = os.path.join(temp_dir, file.filename)
            content = await file.read()
            with open(interview_file_path, "wb") as f:
                f.write(content)

        if resume_file and resume_file.filename:
            resume_file_path = os.path.join(temp_dir, resume_file.filename)
            res_content = await resume_file.read()
            with open(resume_file_path, "wb") as f:
                f.write(res_content)

        report = evaluate_interview(
            interview_path=interview_file_path,
            job_description=job_description or "",
            job_title=job_title or "",
            company_name=company_name or "",
            resume_path=resume_file_path,
            github_url=github_url or None,
            linkedin_url=linkedin_url or None,
            language=language or "en",
            transcript_text=transcript_text or None,
        )
        return report.to_dict()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
