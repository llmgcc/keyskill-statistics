from sqlmodel import SQLModel
from typing import List


class ChartResponse(SQLModel):
    bin: int
    count: int | None


class CategoriesResponse(SQLModel):
    name: str
    confidence: float


class SkillsResponse(SQLModel):
    place: int
    name: str
    ratio: float
    translation: str | None
    count: int
    prev_count: int | None
    prev_place: int | None
    average_salary: float | None
    image: str | None
    domains: List[CategoriesResponse] | None
    categories: List[CategoriesResponse] | None


class KeySkillsResponse(SQLModel):
    skills: List[SkillsResponse]
    count_bins: int
    salary_bins: int
    max_salary: float
    rows: int
