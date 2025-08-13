from typing import List
from pydantic import BaseModel
from sqlmodel import SQLModel
from src.schemas import BaseFilter
from typing import Optional


class CategoriesResponse(SQLModel):
    name: str
    count: int
    prev_count: int | None
    place: int
    prev_place: int | None
    average_salary: float | None
    all_time_place: int | None
    experience_counts: dict[str | None, int] | None
    complexity_score: float | None
    prev_average_salary: float | None


class CategoriesListResponse(SQLModel):
    categories: List[CategoriesResponse]
    rows: int


class FavouriteCategoriesRequest(BaseModel):
    names: List[str]


class CategoryFilter(BaseFilter):
    category: Optional[str] = None
