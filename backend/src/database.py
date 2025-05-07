from sqlmodel import create_engine
from src.config import settings
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = f"postgresql+asyncpg://{settings.user}:{settings.password}@{settings.host}/{settings.database}"
engine = create_engine(DATABASE_URL)

async_engine = create_async_engine(DATABASE_URL, echo=True, future=True)