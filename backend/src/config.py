from pydantic_settings import BaseSettings, SettingsConfigDict
import datetime

# MAX_DATE = datetime.datetime(2025, 5, 16)
MAX_DATE = datetime.datetime.now()


class Settings(BaseSettings):
    user: str
    password: str
    host: str
    database: str

    max_date: datetime.datetime = MAX_DATE
    min_date: datetime.datetime = MAX_DATE - datetime.timedelta(days=90)
    skills_min_count: int = 5
    max_salary: int = 10**6  # RUB

    model_config = SettingsConfigDict(env_file="./.env.example")


settings = Settings()
