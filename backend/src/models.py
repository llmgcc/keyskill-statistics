from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime


class Vacancy(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    created_at: datetime = Field(default=None, index=True)
    experience: str = Field(default=None)


class KeySkill(SQLModel, table=True):
    vacancy_id: Optional[int] = Field(
        default=None, foreign_key="vacancy.id", primary_key=True, index=True
    )
    name: str = Field(primary_key=True, unique=True, index=True)


class Specialization(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str


class VacancySpecialization(SQLModel, table=True):
    specialization_id: Optional[int] = Field(
        default=None, foreign_key="specialization.id", primary_key=True
    )
    vacancy_id: Optional[int] = Field(
        default=None, foreign_key="vacancy.id", primary_key=True
    )


class VacancySalary(SQLModel, table=True):
    vacancy_id: Optional[int] = Field(
        default=None, foreign_key="vacancy.id", primary_key=True, index=True
    )
    salary_from: Optional[int] = Field(default=None)
    salary_to: Optional[int] = Field(default=None)
    currency: Optional[str] = Field(
        default=None, foreign_key="currency.currency_code", index=True
    )


class Currency(SQLModel, table=True):
    currency_code: str = Field(primary_key=True)
    currency_abbr: str = Field()
    currency_name: str = Field()
    currency_rate: float = Field()


class KeySkillImage(SQLModel, table=True):
    name: Optional[str] = Field(
        default=None, foreign_key="keyskill.name", primary_key=True
    )
    image: str


class KeySkillTranslation(SQLModel, table=True):
    name: str = Field(default=None, foreign_key="keyskill.name", primary_key=True)
    translation: str


class Domain(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(default=None)


class KeySkillDomain(SQLModel, table=True):
    domain_id: Optional[int] = Field(
        default=None, foreign_key="domain.id", primary_key=True, index=True
    )
    name: str = Field(default=None, primary_key=True)
    confidence: float = Field()


class Category(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(default=None)


class KeySkillCategory(SQLModel, table=True):
    category_id: Optional[int] = Field(
        default=None, foreign_key="category.id", primary_key=True, index=True
    )
    name: str = Field(default=None, primary_key=True)
    confidence: float = Field()
