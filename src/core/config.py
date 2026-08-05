from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "VCS (Vibe Coder Starterpack)"
    version: str = "0.1"
    theme: str = "dark" # dark, light, auto

    class Config:
        env_file = ".env"

settings = Settings()
