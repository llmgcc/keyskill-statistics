from sqlmodel import SQLModel
from typing import List


class ChartsResponse(SQLModel):
    bin: int
    count: int


class SalaryChartResponse(SQLModel):
    chart: List[ChartsResponse]
    max_salary: float | None
