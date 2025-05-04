from sqlmodel import SQLModel
from src.keyskills.schemas import CategoriesResponse
from typing import List


class HighlightsDefaultResponse(SQLModel):
    name: str
    count: int
    prev_count: int | None
    place: int
    prev_place: int | None
    categories: List[CategoriesResponse] | None
    technologies: List[CategoriesResponse] | None
    average_salary: float | None
    translation: str | None
    # chart: List[ChartResponse]
