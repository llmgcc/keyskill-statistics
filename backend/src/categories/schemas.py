from sqlmodel import SQLModel


class CategoriesResponse(SQLModel):
    name: str
    count: int
    prev_count: int | None
    place: int
    prev_place: int | None
    # top: List[Any]
    # chart: List[ChartResponse]
    average_salary: float | None
    # salary_chart: List[ChartResponse] | None


# class CategoriesListResponse(SQLModel):
# categories: List[CategoriesResponse]
# count_bins: int
# salary_bins: int
