from sqlmodel import SQLModel


class CurrencyResponse(SQLModel):
    currency_code: str
    currency_abbr: str
    currency_name: str
    currency_rate: float


class StatsResponse(SQLModel):
    last_update: str
    unique_skills: int
    date_from: str
    date_to: str
    number_of_vacancies: int
    max_salary: float
