from sqlmodel import create_engine
from src.config import settings
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = f"postgresql://{settings.user}:{settings.password}@{settings.host}/{settings.database}"
engine = create_engine(DATABASE_URL)

DATABASE_URL_ASYNC = f"postgresql+asyncpg://{settings.user}:{settings.password}@{settings.host}/{settings.database}"
async_engine = create_async_engine(DATABASE_URL_ASYNC, echo=False, future=True)
