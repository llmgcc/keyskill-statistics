from typing import Optional
from pydantic import BaseModel


class OrderBy(BaseModel):
    column: Optional[str] = None
    descending: Optional[bool] = None


class BaseFilter(BaseModel):
    period: Optional[int] = None
    experience: Optional[str] = None


class Pagination(BaseModel):
    offset: Optional[int] = 0
    limit: Optional[int] = None
