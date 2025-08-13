from typing import List, Optional
from pydantic import BaseModel
from sqlmodel import SQLModel
from src.schemas import BaseFilter


class DomainsResponse(SQLModel):
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


class DomainsListResponse(SQLModel):
    domains: List[DomainsResponse]
    rows: int


class FavouriteDomainsRequest(BaseModel):
    names: List[str]


class DomainFilter(BaseFilter):
    domain: Optional[str] = None
