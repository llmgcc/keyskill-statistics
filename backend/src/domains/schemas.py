from sqlmodel import SQLModel


class DomainsResponse(SQLModel):
    name: str
    count: int
    prev_count: int | None
    place: int
    prev_place: int | None
    average_salary: float | None
