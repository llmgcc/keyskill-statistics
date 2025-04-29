from sqlmodel import Session, select, func, cast, Date, distinct
from src.models import *
from src.config import settings


def get_main_page_stats(session: Session):
    last_update = select(
        func.max(cast(Vacancy.created_at, Date)).label("last_update"),
    ).select_from(Vacancy)

    min_date = select(
        func.min(cast(Vacancy.created_at, Date)).label("date_from"),
    ).select_from(Vacancy)

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

    return {
        "last_update": session.exec(last_update).first().strftime("%d.%m.%Y"),
        "unique_skills": session.exec(unique_skills).first(),
        "date_from": session.exec(min_date).first().strftime("%d.%m.%Y"),
        "date_to": session.exec(last_update).first().strftime("%d.%m.%Y"),
        "number_of_vacancies": session.exec(vacancies).first(),
    }


def get_currency_list(session: Session):
    currency_query = select(
        Currency.currency_rate,
        Currency.currency_abbr,
        Currency.currency_name,
        Currency.currency_code,
    )
    return session.exec(currency_query).all()


def get_experience_list(session: Session):
    experience_query = (
        select(Vacancy.experience).distinct().order_by(Vacancy.experience)
    )
    return session.exec(experience_query).all()
