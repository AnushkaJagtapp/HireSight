"""Database and local file storage helpers (Zero-config, standalone local mode)."""
import os
import shutil
import uuid

from .config import settings
from .local_db import LocalDB

_db = None


def init_db():
    """Initialize local database."""
    global _db
    if _db is None:
        _db = LocalDB(settings.LOCAL_DB_PATH)
    return _db


def get_db():
    """Return active database instance."""
    global _db
    if _db is None:
        init_db()
    return _db


def upload_file(local_path: str, dest_folder: str = "uploads") -> str:
    """Store uploaded file locally and return path."""
    if not local_path or not os.path.exists(local_path):
        return local_path

    target_dir = os.path.join(settings.UPLOAD_DIR, dest_folder)
    os.makedirs(target_dir, exist_ok=True)

    ext = os.path.splitext(local_path)[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    target_path = os.path.join(target_dir, filename)

    if os.path.abspath(local_path) != os.path.abspath(target_path):
        shutil.copy2(local_path, target_path)

    return target_path


def delete_file(storage_uri: str) -> None:
    """Delete a local file if present."""
    if not storage_uri or storage_uri.startswith("gs://"):
        return
    if os.path.exists(storage_uri):
        try:
            os.remove(storage_uri)
        except OSError:
            pass


def download_file(storage_uri: str, local_path: str) -> str:
    """Download/access a file (no-op copy for local files)."""
    if not storage_uri or storage_uri.startswith("gs://"):
        return storage_uri
    if os.path.exists(storage_uri):
        if os.path.abspath(storage_uri) != os.path.abspath(local_path):
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            shutil.copy2(storage_uri, local_path)
        return local_path
    return storage_uri
