from sqlmodel import SQLModel
from typing import List, Optional
from datetime import datetime
from src.schemas import BaseFilter


class ChartsResponse(SQLModel):
    bin: int
    count: int


class SalaryChartResponse(SQLModel):
    chart: List[ChartsResponse] | None
    salary_from: float
    salary_to: float


class TrendChartResponse(SQLModel):
    chart: List[ChartsResponse] | None
    date_from: datetime
    date_to: datetime


class ChartFilter(BaseFilter):
    name: Optional[str] = None
    number_of_bins: int = 25
    related_to: Optional[str] = None
