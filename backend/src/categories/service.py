from typing import Optional
from sqlalchemy import case
from sqlmodel import Session, select, func, desc
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
        .where(Vacancy.created_at.between(current_from, current_to))
        .where(KeySkillCategory.confidence >= 0.25)
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
                        (experience_counts_subquery.c.experience == "unknown", 0.00),
                        (
                            experience_counts_subquery.c.experience == "noExperience",
                            0.1,
                        ),
                        (
                            experience_counts_subquery.c.experience == "between1And3",
                            0.3,
                        ),
                        (
                            experience_counts_subquery.c.experience == "between3And6",
                            0.6,
                        ),
                        (experience_counts_subquery.c.experience == "moreThan6", 1),
                        else_=0.00,
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
            experience_json_subquery.c.raw_complexity_score,
            func.cume_dist()
            .over(order_by=experience_json_subquery.c.raw_complexity_score)
            .label("complexity_score"),
        ).select_from(experience_json_subquery)
    ).subquery()

    return normalized_complexity_subquery


def create_all_time_place_subquery():
    all_time_count = func.count().label("count")

    all_time_base = (
        select(
            Category.name,
            all_time_count,
            func.row_number()
            .over(order_by=desc(all_time_count))
            .label("all_time_place"),
        )
        .select_from(KeySkillCategory)
        .outerjoin(Category, Category.id == KeySkillCategory.category_id)
        .join(KeySkill, KeySkill.name == KeySkillCategory.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            Vacancy.created_at.between(settings.min_date, settings.max_date),
        )
        .group_by(Category.name)
    )

    return all_time_base.subquery()


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

    current_skills = (
        select(
            KeySkill.name,
            func.count(KeySkill.name).label("count"),
            func.percentile_cont(0.5)
            .within_group(average_salary_case())
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("median_salary"),
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(current_from, current_to))
        .where(
            Vacancy.experience == (None if experience == "unknown" else experience)
            if experience is not None
            else True
        )
        .group_by(KeySkill.name)
        .having(func.count(KeySkill.name) >= 5)
        .order_by(desc("count"))
    ).cte("current_skills")

    prev_skills = (
        select(
            KeySkill.name,
            func.percentile_cont(0.5)
            .within_group(average_salary_case())
            .filter(Vacancy.created_at.between(prev_from, prev_to))
            .label("median_salary"),
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(prev_from, prev_to))
        .where(
            Vacancy.experience == (None if experience == "unknown" else experience)
            if experience is not None
            else True
        )
        .group_by(KeySkill.name)
        .having(func.count(KeySkill.name) >= 5)
    ).cte("prev_skills")

    count = func.count(func.distinct(current_skills.c.name)).label("count")
    prev_count = func.count(func.distinct(prev_skills.c.name)).label("prev_count")

    categories = (
        select(
            Category.name,
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            func.percentile_cont(0.5)
            .within_group(current_skills.c.median_salary)
            .label("average_salary"),
            func.percentile_cont(0.5)
            .within_group(prev_skills.c.median_salary)
            .label("prev_average_salary"),
        )
        .select_from(KeySkillCategory)
        .outerjoin(Category, Category.id == KeySkillCategory.category_id)
        .outerjoin(current_skills, current_skills.c.name == KeySkillCategory.name)
        .outerjoin(prev_skills, prev_skills.c.name == KeySkillCategory.name)
        .where(Category.name == category if category is not None else True)
        .group_by(Category.name)
        .order_by(desc("count"))
    )

    all_time_place_subquery = create_all_time_place_subquery()
    complexity_subquery = create_complexity_subquery(current_from, current_to)

    categories_result = (
        select(
            *categories.c,
            all_time_place_subquery.c.all_time_place,
            complexity_subquery.c.experience_counts,
            complexity_subquery.c.complexity_score,
        )
        .join(
            all_time_place_subquery,
            all_time_place_subquery.c.name == categories.c.name,
            isouter=True,
        )
        .join(
            complexity_subquery,
            complexity_subquery.c.name == categories.c.name,
            isouter=True,
        )
    ).order_by(*get_order_by_clause(categories, order_by, descending))

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


async def favourites(
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
