from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Chimera Chess"
    API_V1_STR: str = "/api/v1"

    # DATABASE
    # Using async sqlite by default
    DATABASE_URL: str = "sqlite+aiosqlite:///./sql_app.db"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
