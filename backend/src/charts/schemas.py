from sqlmodel import SQLModel
from typing import List
from datetime import datetime

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