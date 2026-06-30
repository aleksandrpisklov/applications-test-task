from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Applications"
    debug: bool = True

    database_url: str = "sqlite:///./applications.db"

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    static_dir: str = "static"
    images_dir: str = "static/images"

    JWT_SECRET_KEY: str
    JWT_ACCESS_COOKIE_NAME: str
    JWT_COOKIE_CSRF_PROTECT: bool = False

    class Config:
        env_file = ".env"


settings = Settings()

Path(settings.static_dir).mkdir(exist_ok=True)
Path(settings.images_dir).mkdir(parents=True, exist_ok=True)
