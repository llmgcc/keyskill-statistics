from typing import Optional
from sqlalchemy import case, or_
from sqlmodel import Session, select, func, desc
from src.models import (
    Currency,
    KeySkill,
    Vacancy,
    Domain,
    KeySkillDomain,
    VacancySalary,
)
import datetime
from src.common import average_salary_case
from src.config import settings
from src.common import get_order_by_clause
from src.schemas import Pagination, OrderBy
from src.domains.schemas import DomainFilter


def create_complexity_subquery(current_from, current_to):
    domain_vacancies = (
        select(
            Domain.name,
            Vacancy.id.label("vacancy_id"),
            Vacancy.experience.label("experience"),
        )
        .select_from(Domain)
        .join(KeySkillDomain, KeySkillDomain.domain_id == Domain.id)
        .join(KeySkill, KeySkill.name == KeySkillDomain.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(current_from, current_to))
        .where(KeySkillDomain.confidence >= settings.min_confidence)
        .where(
            or_(
                average_salary_case() <= settings.max_salary,
                average_salary_case() is None,
            )
        )
        .distinct(Domain.name, Vacancy.id)
    ).subquery()

    experience_counts_subquery = (
        select(
            domain_vacancies.c.name,
            domain_vacancies.c.experience,
            func.count().label("exp_count"),
        )
        .select_from(domain_vacancies)
        .group_by(domain_vacancies.c.name, domain_vacancies.c.experience)
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


def create_all_time_place_subquery():
    all_time_count = func.count().label("count")

    all_time_base = (
        select(
            Domain.name,
            Vacancy.id.label("vacancy_id"),
            Vacancy.created_at,
            all_time_count,
            func.row_number()
            .over(order_by=desc(all_time_count))
            .label("all_time_place"),
        )
        .select_from(Domain)
        .join(KeySkillDomain, KeySkillDomain.domain_id == Domain.id)
        .join(KeySkill, KeySkill.name == KeySkillDomain.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(settings.min_date, settings.max_date))
        .where(KeySkillDomain.confidence >= settings.min_confidence)
        .where(
            or_(
                average_salary_case() <= settings.max_salary,
                average_salary_case() is None,
            )
        )
        .distinct(Domain.name, Vacancy.id)
        .group_by(Domain.name)
    )

    return all_time_base.subquery()


def get_base_domains(
    days_period=None,
    experience=None,
    domain=None,
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

    domain_vacancies = (
        select(Domain.name, Vacancy.id.label("vacancy_id"), Vacancy.created_at)
        .select_from(Domain)
        .join(KeySkillDomain, KeySkillDomain.domain_id == Domain.id)
        .join(KeySkill, KeySkill.name == KeySkillDomain.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(settings.min_date, settings.max_date))
        .where(KeySkillDomain.confidence >= settings.min_confidence)
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
        .distinct(Domain.name, Vacancy.id)
    ).subquery()

    count = (
        func.count()
        .filter(domain_vacancies.c.created_at.between(current_from, current_to))
        .label("count")
    )

    all_time_count = func.count().label("count")

    prev_count = (
        func.count()
        .filter(domain_vacancies.c.created_at.between(prev_from, prev_to))
        .label("count")
    )

    salary = (
        func.percentile_cont(0.5)
        .within_group(average_salary_case())
        .filter(domain_vacancies.c.created_at.between(current_from, current_to))
        .label("average_salary")
    )

    prev_salary = (
        func.percentile_cont(0.5)
        .within_group(average_salary_case())
        .filter(domain_vacancies.c.created_at.between(prev_from, prev_to))
        .label("prev_average_salary")
    )

    domains = (
        select(
            Domain.name,
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
        .outerjoin(domain_vacancies, domain_vacancies.c.name == Domain.name)
        .outerjoin(
            VacancySalary, domain_vacancies.c.vacancy_id == VacancySalary.vacancy_id
        )
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Domain.name == domain if domain is not None else True)
        .group_by(Domain.name)
    )

    complexity_subquery = create_complexity_subquery(current_from, current_to)

    domains_result = select(
        *domains.c,
        complexity_subquery.c.experience_counts,
        complexity_subquery.c.complexity_score,
    ).outerjoin(
        complexity_subquery,
        complexity_subquery.c.name == domains.c.name,
    )

    return domains_result


async def domains_list(
    session: Session,
    pagination: Optional[Pagination] = None,
    filter: Optional[DomainFilter] = None,
    order_by: Optional[OrderBy] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    domain = filter.domain if filter else None
    limit = pagination.limit if pagination else None
    offset = pagination.offset if pagination else 0
    descending = order_by.descending if order_by else None
    column = order_by.column if order_by else None

    domains = get_base_domains(
        days_period=days_period,
        experience=experience,
        order_by=column,
        descending=descending,
        domain=domain,
    )

    rows = (
        await session.exec(
            select(func.count(func.distinct(domains.c.name))).select_from(domains)
        )
    ).one()

    domains_result = (
        (select(*domains.c))
        .order_by(*get_order_by_clause(domains, column, descending))
        .limit(limit)
        .offset(offset)
    )

    return {
        "domains": (await session.exec(domains_result)).all(),
        "rows": rows,
    }


async def favorites(
    session: Session,
    names: list[str],
    pagination: Optional[Pagination] = None,
    filter: Optional[DomainFilter] = None,
    order_by: Optional[OrderBy] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    limit = pagination.limit if pagination else None
    offset = pagination.offset if pagination else 0
    descending = order_by.descending if order_by else None
    column = order_by.column if order_by else None

    domains = get_base_domains(
        days_period=days_period,
        experience=experience,
        order_by=column,
        descending=descending,
    )

    filtered = (
        select(*domains.c).select_from(domains).where(domains.c.name.in_(names))
    ).subquery()

    rows = (
        await session.exec(
            select(func.count(func.distinct(filtered.c.name))).select_from(filtered)
        )
    ).one()

    domains_result = (
        (select(*filtered.c))
        .order_by(*get_order_by_clause(filtered, column, descending))
        .limit(limit)
        .offset(offset)
    )

    return {
        "domains": (await session.exec(domains_result)).all(),
        "rows": rows,
    }
