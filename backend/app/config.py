from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_ENV: str = "development"
    SECRET_KEY: str = "dev-secret-change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    ALGORITHM: str = "HS256"

    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "openai/gpt-oss-120b"

    USE_LOCAL_DB: bool = True
    LOCAL_DB_PATH: str = "./local_data.json"

    FRONTEND_ORIGIN: str = "http://localhost:5173"
    UPLOAD_DIR: str = "./uploads"
    AI_SERVICE_URL: str = ""

    @property
    def is_production(self) -> bool:
        return self.APP_ENV.lower() == "production"

    def validate_production(self) -> None:
        if not self.is_production:
            return
        missing = []
        weak_secrets = {
            "dev-secret-change-me",
            "dev-local-secret-please-change",
            "replace-with-at-least-32-random-characters",
        }
        if self.SECRET_KEY in weak_secrets or len(self.SECRET_KEY) < 32:
            missing.append("SECRET_KEY (must be strong and at least 32 characters)")
        if not self.GROQ_API_KEY:
            missing.append("GROQ_API_KEY")
        if not (self.FRONTEND_ORIGIN.startswith("https://") or self.FRONTEND_ORIGIN.startswith("http://")):
            missing.append("FRONTEND_ORIGIN must start with https:// or http://")
        if missing:
            raise RuntimeError(
                "Invalid production configuration: " + "; ".join(missing)
            )


settings = Settings()
