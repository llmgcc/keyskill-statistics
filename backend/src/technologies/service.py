from sqlmodel import Session, select, func, desc
from src.models import (
    KeySkill,
    Vacancy,
    Technology,
    KeySkillTechnology,
)
import datetime
from src.keyskills.service import create_salary_subquery


def technologies_list(session: Session, days_period=15):
    current_to = func.now()
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    skills = (
        select(KeySkill.name, func.count(KeySkill.name).label("count"))
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at.between(current_from, current_to))
        .group_by(KeySkill.name)
        .order_by(desc("count"))
    ).cte("skills")

    prev_skills = (
        select(KeySkill.name)
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at.between(prev_from, prev_to))
        .group_by(KeySkill.name)
    ).cte("prev_skills")

    count = func.count(skills.c.name).label("count")
    prev_count = func.count(prev_skills.c.name).label("prev_count")

    SALARY_BINS = 1
    salary_subquery, max_salary = create_salary_subquery(
        session, current_from, current_to, SALARY_BINS
    )

    categories = (
        select(
            Technology.name,
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            func.avg(salary_subquery.c.average_salary).label("average_salary"),
        )
        .select_from(KeySkillTechnology)
        .outerjoin(Technology, Technology.id == KeySkillTechnology.technology_id)
        .outerjoin(skills, skills.c.name == KeySkillTechnology.name)
        .outerjoin(prev_skills, prev_skills.c.name == KeySkillTechnology.name)
        .outerjoin(salary_subquery, salary_subquery.c.name == KeySkillTechnology.name)
        .where(KeySkillTechnology.confidence >= 0.5)
        .group_by(Technology.name)
        .order_by(desc("count"))
    )

    return session.exec(categories).all()
