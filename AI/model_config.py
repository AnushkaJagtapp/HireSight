"""Central configuration for Groq model selection.

Groq deprecated llama-3.3-70b-versatile in August 2026.
The recommended replacement is openai/gpt-oss-120b (or qwen/qwen3.8-27b).
"""
import os

DEPRECATED_MODELS = {
    "llama-3.3-70b-versatile": "openai/gpt-oss-120b",
    "llama-3.1-70b-versatile": "openai/gpt-oss-120b",
    "llama-3.1-8b-instant": "openai/gpt-oss-20b",
    "llama3-70b-8192": "openai/gpt-oss-120b",
    "llama3-8b-8192": "openai/gpt-oss-20b",
    "mixtral-8x7b-32768": "openai/gpt-oss-120b",
}

DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b"


def get_groq_model() -> str:
    """Return the active Groq LLM model, automatically replacing deprecated names."""
    model = (os.environ.get("GROQ_MODEL") or DEFAULT_GROQ_MODEL).strip()
    return DEPRECATED_MODELS.get(model, model or DEFAULT_GROQ_MODEL)
