from pydantic_settings import BaseSettings, SettingsConfigDict
import datetime

MAX_DATE = datetime.datetime(2025, 4, 1)


class Settings(BaseSettings):
    user: str
    password: str
    host: str
    database: str

    max_date: datetime.datetime = MAX_DATE
    min_date: datetime.datetime = MAX_DATE - datetime.timedelta(days=60)

    model_config = SettingsConfigDict(env_file="./.env.example")


settings = Settings()
