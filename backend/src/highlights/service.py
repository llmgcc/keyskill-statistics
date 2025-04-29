from sqlmodel import Session
from src.keyskills.service import get_base_skills
from src.models import *
from sqlalchemy.sql.expression import nulls_last


HIGHLIGHTS_LIMIT = 5


def gainers(
    session: Session,
    days_period=15,
    min_count=5,
    limit=HIGHLIGHTS_LIMIT,
    experience=None,
):
    change = (
        lambda skills: ((skills.c.count - skills.c.prev_count) / skills.c.prev_count)
        .label("change")
        .desc()
    )
    skills = get_base_skills(
        days_period=days_period,
        limit=HIGHLIGHTS_LIMIT,
        offset=0,
        experience=experience,
        min_count=min_count,
        order_by=change,
        where=lambda skills: skills.c.prev_count != 0,
    )
    return session.exec(skills).all()


def decliners(
    session: Session,
    days_period=15,
    min_count=5,
    limit=HIGHLIGHTS_LIMIT,
    experience=None,
):
    change = (
        lambda skills: ((skills.c.count - skills.c.prev_count) / skills.c.prev_count)
        .label("change")
        .asc()
    )
    skills = get_base_skills(
        days_period=days_period,
        limit=HIGHLIGHTS_LIMIT,
        offset=0,
        experience=experience,
        min_count=min_count,
        order_by=change,
        where=lambda skills: skills.c.prev_count != 0,
    )
    return session.exec(skills).all()


def new_skills(
    session: Session,
    days_period=15,
    min_count=5,
    limit=HIGHLIGHTS_LIMIT,
    experience=None,
):
    skills = get_base_skills(
        days_period=days_period,
        limit=HIGHLIGHTS_LIMIT,
        offset=0,
        experience=experience,
        min_count=min_count,
        order_by=lambda skills: skills.c.place.desc(),
        where=lambda skills: skills.c.prev_count == 0,
    )
    return session.exec(skills).all()


def top_salary(
    session: Session,
    days_period=15,
    min_count=5,
    limit=HIGHLIGHTS_LIMIT,
    experience=None,
):
    skills = get_base_skills(
        days_period=days_period,
        limit=HIGHLIGHTS_LIMIT,
        offset=0,
        experience=experience,
        min_count=min_count,
        order_by=lambda skills: nulls_last(skills.c.average_salary.desc()),
    )
    return session.exec(skills).all()


def lowest_salary(
    session: Session,
    days_period=15,
    min_count=5,
    limit=HIGHLIGHTS_LIMIT,
    experience=None,
):
    skills = get_base_skills(
        days_period=days_period,
        limit=HIGHLIGHTS_LIMIT,
        offset=0,
        experience=experience,
        min_count=min_count,
        order_by=lambda skills: nulls_last(skills.c.average_salary.asc()),
    )
    return session.exec(skills).all()


def undefined_salary(
    session: Session,
    days_period=15,
    min_count=5,
    limit=HIGHLIGHTS_LIMIT,
    experience=None,
):
    skills = get_base_skills(
        days_period=days_period,
        limit=HIGHLIGHTS_LIMIT,
        offset=0,
        experience=experience,
        min_count=min_count,
        order_by=lambda skills: skills.c.place.asc(),
        where=lambda skills: skills.c.average_salary == None,
    )
    return session.exec(skills).all()
