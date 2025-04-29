from sqlmodel import create_engine
from src.config import settings

DATABASE_URL = f"postgresql://{settings.user}:{settings.password}@{settings.host}/{settings.database}"
engine = create_engine(DATABASE_URL)
