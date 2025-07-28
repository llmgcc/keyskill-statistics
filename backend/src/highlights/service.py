from sqlmodel import Session, select
from src.keyskills.service import get_base_skills
from src.models import *
from sqlalchemy.sql.expression import nulls_last
from src.config import settings

HIGHLIGHTS_LIMIT = 5


def highlights_subquery(
    days_period,
    experience,
    filter,
    order_by,
    offset,
    limit
):
    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
    ).subquery()

    skills = (
        select(*skills_subquery.c)
        .select_from(skills_subquery)
        .where(filter(skills_subquery))
        .order_by(order_by(skills_subquery))
        .limit(limit)
        .offset(offset)
    )  
    return skills

async def gainers(
    session: Session,
    days_period=15,
    experience=None,
):
    change = (
        lambda skills: ((skills.c.count - skills.c.prev_count) / skills.c.prev_count)
        .label("change")
        .desc()
    )
    skills = highlights_subquery(
        days_period,
        experience,
        filter=lambda skills: skills.c.prev_count >= settings.skills_min_count,
        order_by=change,
        offset=0,
        limit=HIGHLIGHTS_LIMIT
    )
    return (await session.exec(skills)).all()


async def decliners(
    session: Session,
    days_period=15,
    experience=None,
):
    change = (
        lambda skills: ((skills.c.count - skills.c.prev_count) / skills.c.prev_count)
        .label("change")
        .asc()
    )

    skills = highlights_subquery(
        days_period,
        experience,
        filter=lambda skills: skills.c.prev_count >= settings.skills_min_count,
        order_by=change,
        offset=0,
        limit=HIGHLIGHTS_LIMIT
    )
    return (await session.exec(skills)).all()

async def new_skills(
    session: Session,
    days_period=15,
    experience=None,
):
    skills = highlights_subquery(
        days_period,
        experience,
        filter=lambda skills: skills.c.prev_count == 0,
        order_by=lambda skills: (skills.c.count).desc(),
        offset=0,
        limit=HIGHLIGHTS_LIMIT
    )
    return (await session.exec(skills)).all()

async def top_salary(
    session: Session,
    days_period=15,
    experience=None,
):
    skills = highlights_subquery(
        days_period,
        experience,
        filter=lambda skills: skills.c.average_salary <= settings.max_salary,
        order_by=lambda skills: nulls_last(skills.c.average_salary.desc()),
        offset=0,
        limit=HIGHLIGHTS_LIMIT
    )
    return (await session.exec(skills)).all()


async def lowest_salary(
    session: Session,
    days_period=15,
    experience=None,
):
    skills = highlights_subquery(
        days_period,
        experience,
        filter=lambda skills: True,
        order_by=lambda skills: nulls_last(skills.c.average_salary.asc()),
        offset=0,
        limit=HIGHLIGHTS_LIMIT
    )
    return (await session.exec(skills)).all()

async def undefined_salary(
    session: Session,
    days_period=15,
    experience=None,
):
    skills = highlights_subquery(
        days_period,
        experience,
        filter=lambda skills: skills.c.average_salary == None,
        order_by=lambda skills: skills.c.place.asc(),
        offset=0,
        limit=HIGHLIGHTS_LIMIT
    )
    return (await session.exec(skills)).all()