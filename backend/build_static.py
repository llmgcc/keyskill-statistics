from fastapi.testclient import TestClient
from fastapi import FastAPI
from src.general.router import router as main_router
from src.domains.router import router as domains_router
from src.categories.router import router as categories_router
from src.highlights.router import router as highlights_router
from src.categories.service import categories_list
from src.domains.service import domains_list
import os
from src.keyskills.service import get_base_skills
from src.charts.service import (
    skills_chart,
    salary_chart,
    category_chart,
    category_salary_chart,
    technologies_chart,
    technologies_salary_chart,
)
from src.database import async_engine
from sqlmodel import select
from src.keyskills.schemas import SkillsResponse
from src.categories.schemas import CategoriesResponse
from src.domains.schemas import DomainsResponse
import json
import asyncio
from httpx import ASGITransport, AsyncClient
from sqlmodel.ext.asyncio.session import AsyncSession
import shutil

FRONTEND_STATIC_API_PATH = (
    os.path.dirname(os.path.abspath(__file__ + "/../")) + "/frontend/public/static-api"
)
app = FastAPI()
app.include_router(main_router)
app.include_router(categories_router)
app.include_router(domains_router)
app.include_router(highlights_router)

client = TestClient(app)

EXPERIENCE = ["any", "noExperience", "between1And3", "between3And6", "moreThan6"]
PERIOD = [7, 14, 30]


def copy_images_folder():
    source_dir = os.path.dirname(os.path.abspath(__file__)) + "/src/static"
    dest_dir = FRONTEND_STATIC_API_PATH + "/static"
    os.makedirs(dest_dir, exist_ok=True)
    if os.path.exists(source_dir):
        shutil.copytree(source_dir, dest_dir, dirs_exist_ok=True)


def write(path, data, is_json=False):
    file_name = f"{FRONTEND_STATIC_API_PATH + path}.json"
    os.makedirs(os.path.dirname(file_name), exist_ok=True)
    with open(file_name, "w", encoding="utf-8") as f:
        if not is_json:
            f.write(data)
        else:
            json.dump(data, f)


async def build_static_from_route(router):
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://localhost:8000"
    ) as client:
        for route in router.routes:
            response = await client.get(route.path)
            path = route.path
            write(path, response.text)


async def build_skills():
    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                print(period, experience)
                e = None if experience == "any" else experience
                # # SKILLS
                skills = get_base_skills(
                    period, limit=None, offset=0, experience=e, min_count=5
                )
                data = [
                    SkillsResponse.model_validate(item).model_dump_json()
                    for item in (await session.exec(skills)).all()
                ]
                write(
                    f"/skills/skills_{period}_{experience}",
                    list(map(lambda x: json.loads(x), data)),
                    is_json=True,
                )

                # # CHARTS
                charts_subquery = await skills_chart(
                    None, session, period, for_all_skills=True, experience=e
                )
                charts = (await session.exec(select(*charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(f"/charts/skills_{period}_{experience}", data, is_json=True)

                # SALARY
                salary_charts_subquery, max_salary = await salary_chart(
                    None, session, period, for_all_skills=True, experience=e
                )
                charts = (await session.exec(select(*salary_charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(f"/charts/salary_{period}_{experience}", data, is_json=True)


async def build_domains():
    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                print(period, experience)
                e = None if experience == "any" else experience
                #  DOMAINS
                domains = await domains_list(session, period, experience=e)
                data = [
                    DomainsResponse.model_validate(item).model_dump_json()
                    for item in domains
                ]
                data = list(map(lambda x: json.loads(x), data))
                write(f"/domains/domains_{period}_{experience}", data, is_json=True)

                # DOMAINS CHART
                domains = {}
                requests = []
                for category in data:
                    requests.append(
                        category_chart(category["name"], session, period, experience=e)
                    )
                charts = await asyncio.gather(*requests)
                for i, category in enumerate(data):
                    domains[category["name"]] = charts[i]
                write(f"/charts/domains_{period}_{experience}", domains, is_json=True)

                # DOMAINS SALARY
                domains = {}
                requests = []
                for category in data:
                    requests.append(
                        category_salary_chart(
                            category["name"], session, period, experience=e
                        )
                    )
                charts = await asyncio.gather(*requests)
                for i, category in enumerate(data):
                    domains[category["name"]] = charts[i]
                write(
                    f"/charts/domains_salary_{period}_{experience}",
                    domains,
                    is_json=True,
                )


async def build_categories():
    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                print(period, experience)
                e = None if experience == "any" else experience
                #  CATEGORIES
                categories = await categories_list(session, period, experience=e)
                data = [
                    CategoriesResponse.model_validate(item).model_dump_json()
                    for item in categories
                ]
                data = list(map(lambda x: json.loads(x), data))
                write(
                    f"/categories/categories_{period}_{experience}", data, is_json=True
                )

                # CATEGORIES CHART
                categories = {}
                requests = []
                for category in data:
                    requests.append(
                        technologies_chart(
                            category["name"], session, period, experience=e
                        )
                    )
                charts = await asyncio.gather(*requests)
                for i, category in enumerate(data):
                    categories[category["name"]] = charts[i]
                write(
                    f"/charts/categories_{period}_{experience}",
                    categories,
                    is_json=True,
                )

                # CATEGORIES SALARY
                categories = {}
                requests = []
                for category in data:
                    requests.append(
                        technologies_salary_chart(
                            category["name"], session, period, experience=e
                        )
                    )
                charts = await asyncio.gather(*requests)
                for i, category in enumerate(data):
                    categories[category["name"]] = charts[i]
                write(
                    f"/charts/categories_salary_{period}_{experience}",
                    categories,
                    is_json=True,
                )


async def build():
    copy_images_folder()
    await build_static_from_route(main_router)
    await build_static_from_route(categories_router)
    await build_static_from_route(domains_router)
    await build_skills()
    await build_domains()
    await build_categories()


asyncio.run(build())
