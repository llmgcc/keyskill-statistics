from pydantic_settings import BaseSettings, SettingsConfigDict
import datetime

# MAX_DATE = datetime.datetime(2025, 5, 21)
MAX_DATE = datetime.datetime.now()


class Settings(BaseSettings):
    user: str
    password: str
    host: str
    database: str

    max_date: datetime.datetime = MAX_DATE
    min_date: datetime.datetime = MAX_DATE - datetime.timedelta(days=60)
    skills_min_count: int = 5
    max_salary: int = 10**6  # RUB
    min_confidence: float = 0.05

    model_config = SettingsConfigDict(env_file="./.env.example")


settings = Settings()
