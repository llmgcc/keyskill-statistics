from typing import Optional
from sqlalchemy import case
from sqlmodel import Session, or_, select, func, desc
from src.models import (
    Currency,
    KeySkill,
    Vacancy,
    Category,
    KeySkillCategory,
    VacancySalary,
)
import datetime
from src.common import average_salary_case, get_order_by_clause
from src.config import settings
from src.schemas import Pagination, OrderBy
from src.categories.schemas import CategoryFilter


def create_complexity_subquery(current_from, current_to):
    category_vacancies = (
        select(
            Category.name,
            Vacancy.id.label("vacancy_id"),
            Vacancy.experience.label("experience"),
        )
        .select_from(Category)
        .join(KeySkillCategory, KeySkillCategory.category_id == Category.id)
        .join(KeySkill, KeySkill.name == KeySkillCategory.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(current_from, current_to))
        .where(KeySkillCategory.confidence >= settings.min_confidence)
        .where(
            or_(
                average_salary_case() <= settings.max_salary,
                average_salary_case() is None,
            )
        )
        .distinct(Category.name, Vacancy.id)
    ).subquery()

    experience_counts_subquery = (
        select(
            category_vacancies.c.name,
            category_vacancies.c.experience,
            func.count().label("exp_count"),
        )
        .select_from(category_vacancies)
        .group_by(category_vacancies.c.name, category_vacancies.c.experience)
    ).subquery()

    experience_json_subquery = (
        select(
            experience_counts_subquery.c.name,
            func.json_object_agg(
                func.coalesce(experience_counts_subquery.c.experience, "unknown"),
                experience_counts_subquery.c.exp_count,
            ).label("experience_counts"),
            (
                func.sum(
                    experience_counts_subquery.c.exp_count
                    * case(
                        (experience_counts_subquery.c.experience == "unknown", 0.0),
                        (
                            experience_counts_subquery.c.experience == "noExperience",
                            0.0,
                        ),
                        (
                            experience_counts_subquery.c.experience == "between1And3",
                            0.3,
                        ),
                        (
                            experience_counts_subquery.c.experience == "between3And6",
                            0.7,
                        ),
                        (experience_counts_subquery.c.experience == "moreThan6", 1.0),
                        else_=0.0,
                    )
                )
                / func.sum(experience_counts_subquery.c.exp_count)
            ).label("raw_complexity_score"),
        ).group_by(experience_counts_subquery.c.name)
    ).subquery()

    normalized_complexity_subquery = (
        select(
            experience_json_subquery.c.name,
            experience_json_subquery.c.experience_counts,
            experience_json_subquery.c.raw_complexity_score.label("complexity_score"),
        ).select_from(experience_json_subquery)
    ).subquery()

    return normalized_complexity_subquery


def get_base_categories(
    days_period=None,
    experience=None,
    category=None,
    order_by=None,
    descending=None,
):
    if days_period is None:
        current_to = settings.max_date
        current_from = settings.min_date
        prev_to = current_from
        prev_from = prev_to - (current_to - current_from)
    else:
        current_to = settings.max_date
        current_from = current_to - datetime.timedelta(days=days_period)
        prev_to = current_from
        prev_from = prev_to - datetime.timedelta(days=days_period)

    category_vacancies = (
        select(Category.name, Vacancy.id.label("vacancy_id"), Vacancy.created_at)
        .select_from(Category)
        .join(KeySkillCategory, KeySkillCategory.category_id == Category.id)
        .join(KeySkill, KeySkill.name == KeySkillCategory.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(settings.min_date, settings.max_date))
        .where(KeySkillCategory.confidence >= settings.min_confidence)
        .where(
            or_(
                average_salary_case() <= settings.max_salary,
                average_salary_case() is None,
            )
        )
        .where(
            Vacancy.experience == (None if experience == "unknown" else experience)
            if experience is not None
            else True
        )
        .distinct(Category.name, Vacancy.id)
    ).subquery()

    count = (
        func.count()
        .filter(category_vacancies.c.created_at.between(current_from, current_to))
        .label("count")
    )

    all_time_count = func.count().label("count")

    prev_count = (
        func.count()
        .filter(category_vacancies.c.created_at.between(prev_from, prev_to))
        .label("count")
    )

    salary = (
        func.percentile_cont(0.5)
        .within_group(average_salary_case())
        .filter(category_vacancies.c.created_at.between(current_from, current_to))
        .label("average_salary")
    )

    prev_salary = (
        func.percentile_cont(0.5)
        .within_group(average_salary_case())
        .filter(category_vacancies.c.created_at.between(prev_from, prev_to))
        .label("prev_average_salary")
    )

    categories = (
        select(
            Category.name,
            count.label("count"),
            prev_count.label("prev_count"),
            salary,
            prev_salary,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            func.row_number()
            .over(order_by=desc(all_time_count))
            .label("all_time_place"),
        )
        .outerjoin(category_vacancies, category_vacancies.c.name == Category.name)
        .outerjoin(
            VacancySalary, category_vacancies.c.vacancy_id == VacancySalary.vacancy_id
        )
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Category.name == category if category is not None else True)
        .group_by(Category.name)
    )

    complexity_subquery = create_complexity_subquery(current_from, current_to)

    categories_result = select(
        *categories.c,
        complexity_subquery.c.experience_counts,
        complexity_subquery.c.complexity_score,
    ).outerjoin(
        complexity_subquery,
        complexity_subquery.c.name == categories.c.name,
    )

    return categories_result


async def categories_list(
    session: Session,
    pagination: Optional[Pagination] = None,
    filter: Optional[CategoryFilter] = None,
    order_by: Optional[OrderBy] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    category = filter.category if filter else None
    limit = pagination.limit if pagination else None
    offset = pagination.offset if pagination else 0
    descending = order_by.descending if order_by else None
    column = order_by.column if order_by else None

    categories = get_base_categories(
        days_period=days_period,
        experience=experience,
        order_by=column,
        descending=descending,
        category=category,
    )

    rows = (
        await session.exec(
            select(func.count(func.distinct(categories.c.name))).select_from(categories)
        )
    ).one()

    categories_result = (
        (select(*categories.c))
        .order_by(*get_order_by_clause(categories, column, descending))
        .limit(limit)
        .offset(offset)
    )

    return {
        "categories": (await session.exec(categories_result)).all(),
        "rows": rows,
    }


async def favorites(
    session: Session,
    names: list[str],
    pagination: Optional[Pagination] = None,
    filter: Optional[CategoryFilter] = None,
    order_by: Optional[OrderBy] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    limit = pagination.limit if pagination else None
    offset = pagination.offset if pagination else None
    descending = order_by.descending if order_by else False
    column = order_by.column if order_by else None

    categories = get_base_categories(
        days_period=days_period,
        experience=experience,
        order_by=column,
        descending=descending,
    )

    filtered = (
        select(*categories.c)
        .select_from(categories)
        .where(categories.c.name.in_(names))
    ).subquery()

    rows = (
        await session.exec(
            select(func.count(func.distinct(filtered.c.name))).select_from(filtered)
        )
    ).one()

    categories_result = (
        (select(*filtered.c))
        .order_by(*get_order_by_clause(filtered, column, descending))
        .limit(limit)
        .offset(offset)
    )

    return {
        "categories": (await session.exec(categories_result)).all(),
        "rows": rows,
    }
