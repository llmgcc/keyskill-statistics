from sqlmodel import SQLModel


class CategoriesResponse(SQLModel):
    name: str
    count: int
    prev_count: int | None
    place: int
    prev_place: int | None
    median_salary: float | None