from sqlalchemy import and_, case
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
from src.keyskills.service import create_salary_subquery, get_base_skills


def categories_list(session: Session, days_period=30, experience = None):
    current_to = func.now()
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)


    average_salary_case = case(
        (
            and_(
                VacancySalary.salary_from.is_not(None),
                VacancySalary.salary_to.is_not(None),
            ),
            (
                VacancySalary.salary_from / Currency.currency_rate
                + VacancySalary.salary_to / Currency.currency_rate
            )
            / 2,
        ),
        (
            and_(
                VacancySalary.salary_from.is_(None),
                VacancySalary.salary_to.is_not(None),
            ),
            VacancySalary.salary_to / Currency.currency_rate,
        ),
        (
            and_(
                VacancySalary.salary_from.is_not(None),
                VacancySalary.salary_to.is_(None),
            ),
            VacancySalary.salary_from / Currency.currency_rate,
        ),
    )

    skills = (
        select(KeySkill.name, func.count(KeySkill.name).label("count"), func.percentile_cont(0.5)
            .within_group(average_salary_case)
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("average_salary"),)
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .where(Vacancy.created_at.between(current_from, current_to))
        .where(Vacancy.experience == experience if experience else True)
        .group_by(KeySkill.name)
        .order_by(desc("count"))
    ).cte("skills")

    prev_skills = (
        select(KeySkill.name)
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at.between(prev_from, prev_to))
        .where(Vacancy.experience == experience if experience else True)
        .group_by(KeySkill.name)
    ).cte("prev_skills")

    count = func.count(skills.c.name).label("count")
    prev_count = func.count(prev_skills.c.name).label("prev_count")


    categories = (
        select(
            Category.name,
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            func.avg(skills.c.average_salary).label("average_salary"),
        )
        .select_from(KeySkillCategory)
        .outerjoin(Category, Category.id == KeySkillCategory.category_id)
        .outerjoin(skills, skills.c.name == KeySkillCategory.name)
        .outerjoin(prev_skills, prev_skills.c.name == KeySkillCategory.name)
        .where(KeySkillCategory.confidence >= 0.25)
        .group_by(Category.name)
        .order_by(desc("count"))
    )

    return session.exec(categories).all()
