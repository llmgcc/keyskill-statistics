import requests
import time
from src.models import (
    Vacancy,
    KeySkill,
    VacancySpecialization,
    Specialization,
    VacancySalary,
    Currency,
)
from sqlalchemy import and_, func
from sqlalchemy.dialects.postgresql import insert as upsert
from src.database import engine
from sqlalchemy import select
import numpy as np
import datetime

HH_API = "https://api.hh.ru"
REQ_STAT = {"requests": 0, "cached": 0, "new_vacancies": 0}


class colors:
    HEADER = "\033[92m"
    WARNING = "\033[4m"
    END = "\033[0m"


def header(text):
    return f"{colors.HEADER}{text}{colors.END}"


def warning(text):
    return f"{colors.WARNING}{text}{colors.END}"


def request(url):
    SLEEP_TIME = 1.0
    data = requests.get(url, timeout=10)
    time.sleep(SLEEP_TIME)
    REQ_STAT["requests"] += 1
    return data


def count_vacancies(days):
    connection = engine.connect()
    data = []
    for i in range(days):
        vacancies = select(func.count()).where(
            and_(
                Vacancy.created_at
                <= (datetime.datetime.today() - datetime.timedelta(days=i)),
                Vacancy.created_at
                > (datetime.datetime.today() - datetime.timedelta(days=i + 1)),
            )
        )
        count = connection.execute(vacancies).first()[0]
        data.append(
            (
                count,
                (datetime.datetime.today() - datetime.timedelta(days=i)),
                (datetime.datetime.today() - datetime.timedelta(days=i + 1)),
            )
        )
    return np.array(list(reversed(data)))


def get_dates(days=90):
    dates = count_vacancies(days)
    dates = sorted(dates, key=lambda x: x[0])
    dates_from_to = []
    for count, date_to, date_from in dates:
        date_to = date_to.date()
        date_from = date_to - datetime.timedelta(days=365)
        dates_from_to.append((date_to, date_from))
    dates_from_to = dates_from_to[0 : int(days / 2)]
    np.random.shuffle(dates_from_to)
    for t, f in dates_from_to:
        print("\t", t, f)
    return dates_from_to


def create_or_update(session, type, values, target):
    stmt = upsert(type).values(values)
    stmt = stmt.on_conflict_do_update(index_elements=target, set_=values)
    session.execute(stmt)


def update_dicts(session):
    dicts = request("https://api.hh.ru/dictionaries").json()

    for currency in dicts["currency"]:
        values = {
            "currency_abbr": currency["abbr"],
            "currency_code": currency["code"],
            "currency_name": currency["name"],
            "currency_rate": currency["rate"],
        }

        create_or_update(session, Currency, values, ["currency_code"])


def update():
    with engine.begin() as connection:
        update_dicts(connection)
        specializations = connection.execute(select(Specialization)).all()

    dates = []

    for spec_index, spec in enumerate(specializations):
        TEXT = spec.name
        SPECIALIZATION_ID = spec.id
        PER_PAGE = 100
        PAGE = 1
        ORDER_BY = "publication_time"

        if not len(dates):
            dates = get_dates()

        DATE_TO, DATE_FROM = dates.pop()

        print(
            header(
                f"{TEXT}: {spec_index + 1}/{len(specializations)} ({DATE_FROM}, {DATE_TO})"
            )
        )
        print(
            header(
                f"\t{HH_API}/vacancies?per_page={PER_PAGE}&text={TEXT}&order_by={ORDER_BY}&page={PAGE}&date_to={DATE_TO}&date_from={DATE_FROM}"
            )
        )
        vacancies = request(
            f"{HH_API}/vacancies?per_page={PER_PAGE}&text={TEXT}&order_by={ORDER_BY}&page={PAGE}&date_to={DATE_TO}&date_from={DATE_FROM}"
        ).json()

        for vacancy_index, vacancy_short in enumerate(vacancies["items"]):
            with engine.begin() as connection:
                VACANCY_ID = vacancy_short["id"]
                VACANCY_NAME = vacancy_short["name"]
                VACANCY_CREATED_AT = vacancy_short["created_at"]
                stat_text = warning(
                    f"Requests/Cached/New: {REQ_STAT['requests']}/{REQ_STAT['cached']}/{REQ_STAT['new_vacancies']}"
                )
                print(
                    f"\t{stat_text} {VACANCY_NAME}: {vacancy_index + 1}/{len(vacancies['items'])}"
                )

                vacancy_exists = connection.execute(
                    select(Vacancy).where(Vacancy.id == VACANCY_ID)
                ).first()
                create_or_update(
                    connection,
                    Vacancy,
                    {
                        "id": VACANCY_ID,
                        "name": VACANCY_NAME,
                        "created_at": VACANCY_CREATED_AT,
                    },
                    ["id"],
                )
                create_or_update(
                    connection,
                    VacancySpecialization,
                    {"specialization_id": SPECIALIZATION_ID, "vacancy_id": VACANCY_ID},
                    ["specialization_id", "vacancy_id"],
                )

                if vacancy_short["salary"] is not None:
                    create_or_update(
                        connection,
                        VacancySalary,
                        {
                            "vacancy_id": VACANCY_ID,
                            "salary_from": vacancy_short["salary"]["from"],
                            "salary_to": vacancy_short["salary"]["to"],
                            "currency": vacancy_short["salary"]["currency"],
                        },
                        ["vacancy_id"],
                    )

                if not vacancy_exists:
                    vacancy = request(f"{HH_API}/vacancies/{VACANCY_ID}").json()
                    EXPERIENCE = vacancy["experience"]["id"]
                    create_or_update(
                        connection,
                        Vacancy,
                        {
                            "id": VACANCY_ID,
                            "name": VACANCY_NAME,
                            "created_at": VACANCY_CREATED_AT,
                            "experience": EXPERIENCE,
                        },
                        ["id"],
                    )

                    REQ_STAT["new_vacancies"] += 1
                    if "key_skills" in vacancy:
                        for skill in vacancy["key_skills"]:
                            SKILL_NAME = skill["name"]
                            if SKILL_NAME:
                                print(f"\t\t{SKILL_NAME}")
                                create_or_update(
                                    connection,
                                    KeySkill,
                                    {"vacancy_id": VACANCY_ID, "name": SKILL_NAME},
                                    ["vacancy_id", "name"],
                                )
                else:
                    REQ_STAT["cached"] += 1


for i in range(5):
    update()
