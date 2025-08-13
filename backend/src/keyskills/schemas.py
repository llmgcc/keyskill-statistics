from pydantic import BaseModel
from sqlmodel import SQLModel
from typing import List, Optional
from enum import Enum
from src.schemas import BaseFilter


class ChartResponse(SQLModel):
    bin: int
    count: int | None


class CategoriesResponse(SQLModel):
    name: str
    confidence: float


class SkillShort(SQLModel):
    name: str
    translation: str | None
    image: str | None
    domains: List[CategoriesResponse] | None
    categories: List[CategoriesResponse] | None


class SkillOrderBy(str, Enum):
    place = "place"
    average_salary = "average_salary"
    change = "change"
    similarity_score = "similarity_score"


class SkillOrderByQueryParams(BaseModel):
    order_by: Optional[SkillOrderBy] = None
    descending: bool = False


class SkillsResponse(SQLModel):
    name: str
    place: int | None
    all_time_place: int | None
    ratio: float | None
    translation: str | None
    count: int | None
    prev_count: int | None
    prev_place: int | None
    average_salary: float | None
    prev_average_salary: float | None
    image: str | None
    domains: List[CategoriesResponse] | None
    categories: List[CategoriesResponse] | None
    experience_counts: dict[str | None, int] | None
    complexity_score: float | None
    similarity_score: float | None = None


class SkillsSimilarityResponse(SkillsResponse):
    similarity_score: float


class KeySkillsSimilarResponse(SQLModel):
    skills: List[SkillsSimilarityResponse]
    rows: int


class KeySkillsResponse(SQLModel):
    skills: List[SkillsResponse]
    rows: int


class FavouriteSkillsRequest(BaseModel):
    names: List[str]


class SkillsFilter(BaseFilter):
    skill: Optional[str] = None
    domain: Optional[str] = None
    category: Optional[str] = None
    strict: Optional[bool] = False
    related_to: Optional[str] = None
    similar_to: Optional[str] = None
