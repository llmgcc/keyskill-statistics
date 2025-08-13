from sqlmodel import Session, select, func, cast, Date, distinct
from src.models import Vacancy, KeySkill, Currency, VacancySalary
from src.config import settings
from src.common import average_salary_case


async def get_general_stats(session: Session):
    last_update = (
        select(
            func.max(cast(Vacancy.created_at, Date)).label("last_update"),
        )
        .select_from(Vacancy)
        .where(Vacancy.created_at <= settings.max_date)
        .where(Vacancy.created_at >= settings.min_date)
    )

    min_date = (
        select(
            func.min(cast(Vacancy.created_at, Date)).label("date_from"),
        )
        .select_from(Vacancy)
        .where(Vacancy.created_at <= settings.max_date)
        .where(Vacancy.created_at >= settings.min_date)
    )

    unique_skills = (
        select(func.count(distinct(KeySkill.name)).label("unique_skills"))
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at <= settings.max_date)
        .where(Vacancy.created_at >= settings.min_date)
    )

    vacancies = (
        select(func.count(Vacancy.id).label("number_of_vacancies"))
        .select_from(Vacancy)
        .where(Vacancy.created_at <= settings.max_date)
        .where(Vacancy.created_at >= settings.min_date)
    )

    avg_salary_query = (
        select(func.avg(average_salary_case()).label("max_salary"))
        .select_from(Vacancy)
        .where(Vacancy.created_at <= settings.max_date)
        .where(Vacancy.created_at >= settings.min_date)
        .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id)
        .join(Currency, Currency.currency_code == VacancySalary.currency)
    )

    last_update_awaited = (await session.exec(last_update)).first()
    return {
        "last_update": last_update_awaited.strftime("%d.%m.%Y"),
        "unique_skills": (await session.exec(unique_skills)).first(),
        "date_from": (await session.exec(min_date)).first().strftime("%d.%m.%Y"),
        "date_to": last_update_awaited.strftime("%d.%m.%Y"),
        "number_of_vacancies": (await session.exec(vacancies)).first(),
        "max_salary": (await session.exec(avg_salary_query)).first() * 8,
    }


async def get_currency_list(session: Session):
    currency_query = select(
        Currency.currency_rate,
        Currency.currency_abbr,
        Currency.currency_name,
        Currency.currency_code,
    )
    return await session.exec(currency_query)
