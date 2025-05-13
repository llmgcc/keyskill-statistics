from sqlalchemy import and_, case
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

async def domains_list(session: Session, days_period=30, experience=None):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    skills = (
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
        .where(Vacancy.experience == experience if experience else True)
        .where(Vacancy.created_at.between(settings.min_date, settings.max_date))
        .group_by(KeySkill.name)
        .order_by(desc("count"))
    ).cte("skills")

    prev_skills = (
        select(KeySkill.name)
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at.between(prev_from, prev_to))
        .where(Vacancy.experience == experience if experience else True)
        .where(Vacancy.created_at.between(settings.min_date, settings.max_date))
        .group_by(KeySkill.name)
    ).cte("prev_skills")

    count = func.count(skills.c.name).label("count")
    prev_count = func.count(prev_skills.c.name).label("prev_count")

    domains = (
        select(
            Domain.name,
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            func.percentile_cont(0.5)
                .within_group(skills.c.median_salary)
                .label("median_salary"),
        )
        .select_from(KeySkillDomain)
        .outerjoin(Domain, Domain.id == KeySkillDomain.domain_id)
        .outerjoin(skills, skills.c.name == KeySkillDomain.name)
        .outerjoin(prev_skills, prev_skills.c.name == KeySkillDomain.name)
        .group_by(Domain.name)
        .order_by(desc("count"))
    )

    return (await session.exec(domains)).all()
