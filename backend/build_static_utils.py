from sqlalchemy import select
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database import async_engine
from src.config import settings
import os
import json
from src.keyskills.service import get_all_skills_related
import shutil
from src.general.router import router as main_router
from src.domains.router import router as domains_router
from src.categories.router import router as categories_router
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from src.categories.service import get_base_categories
from src.domains.service import get_base_domains
from src.keyskills.service import get_base_skills
from src.keyskills.schemas import SkillsResponse
from src.categories.schemas import CategoriesResponse
from src.domains.schemas import DomainsResponse
from src.charts.service import (
    skills_chart,
    salary_chart,
    category_chart,
    category_salary_chart,
    technologies_chart,
    technologies_salary_chart,
)
from backend.src.charts.schemas import ChartFilter

EXPERIENCE = [
    "any",
    "noExperience",
    "between1And3",
    "between3And6",
    "moreThan6",
    "unknown",
]
PERIOD = [7, 14, 30]

FRONTEND_STATIC_API_PATH = (
    os.path.dirname(os.path.abspath(__file__ + "/../")) + "/frontend/public/static-api"
)
app = FastAPI()
app.include_router(main_router)
app.include_router(categories_router)
app.include_router(domains_router)


async def build_static_from_route(router):
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://localhost:8000"
    ) as client:
        for route in router.routes:
            print('From route', route.path)
            response = await client.get(route.path)
            path = route.path
            write(path, response.text)


async def copy_images_folder():
    print('Copy images')
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
            json.dump(data, f, default=str)


async def build_skills_related():
    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                e = None if experience == "any" else experience

                result = await get_all_skills_related(session, period, e)
                data = {}
                for row in result.all():
                    data[row[0]] = row[1]
                write(
                    f"/skills/related_skills_{period}_{experience}", data, is_json=True
                )


async def build_skills_similar():
    from src.keyskills.service import get_all_skills_similar

    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                e = None if experience == "any" else experience
                result = await get_all_skills_similar(session, period, e)
                data = {}
                for row in result.all():
                    data[row[0]] = row[1]
                write(
                    f"/skills/similar_skills_{period}_{experience}", data, is_json=True
                )

async def build_skills():
    async def build(period, experience):
        print(f'Skills {period} {experience}')
        skills = get_base_skills(days_period=period, experience=experience)
        data = [
            SkillsResponse.model_validate(item).model_dump_json()
            for item in (await session.exec(skills)).all()
        ]
        write(
            f"/skills/skills_{period or 'all_time'}_{experience or 'any'}",
            list(map(lambda x: json.loads(x), data)),
            is_json=True,
        )

    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                e = None if experience == "any" else experience
                await build(period, e)

                chart_filter = ChartFilter(period=period, experience=e)
                charts_subquery, date_from, date_to = await skills_chart(
                    session, for_all_skills=True, filter=chart_filter
                )
                charts = (await session.exec(select(*charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(
                    f"/charts/skills_{period}_{experience}",
                    {"date_from": date_from, "date_to": date_to, "charts": data},
                    is_json=True,
                )

                salary_charts_subquery = await salary_chart(
                    session, for_all_skills=True, filter=chart_filter
                )
                charts = (await session.exec(select(*salary_charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(
                    f"/charts/skills_salary_{period}_{experience}",
                    {
                        "salary_from": 0,
                        "salary_to": settings.max_salary,
                        "charts": data,
                    },
                    is_json=True,
                )
        await build(None, None)


async def build_domains():
    async def build(period, experience):
        print(f'Domains {period} {experience}')
        e = None if experience == "any" else experience
        skills = get_base_domains(days_period=period, experience=e)
        data = [
            DomainsResponse.model_validate(item).model_dump_json()
            for item in (await session.exec(skills)).all()
        ]
        write(
            f"/domains/domains_{period or 'all_time'}_{e or 'any'}",
            list(map(lambda x: json.loads(x), data)),
            is_json=True,
        )

    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                e = None if experience == "any" else experience
                await build(period, e)
                chart_filter = ChartFilter(period=period, experience=e)
                charts_subquery, date_from, date_to = await category_chart(
                    session, for_all=True, filter=chart_filter
                )
                charts = (await session.exec(select(*charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(
                    f"/charts/domains_{period}_{experience}",
                    {"date_from": date_from, "date_to": date_to, "charts": data},
                    is_json=True,
                )

                salary_charts_subquery, max_salary = await category_salary_chart(
                    session, for_all=True, filter=chart_filter
                )
                charts = (await session.exec(select(*salary_charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(
                    f"/charts/domains_salary_{period}_{experience}",
                    {
                        "salary_from": 0,
                        "salary_to": settings.max_salary,
                        "charts": data,
                    },
                    is_json=True,
                )
        await build(None, None)


async def build_categories():
    async def build(period, experience):
        print(f'Categories {period} {experience}')
        e = None if experience == "any" else experience
        skills = get_base_categories(days_period=period, experience=e)
        data = [
            CategoriesResponse.model_validate(item).model_dump_json()
            for item in (await session.exec(skills)).all()
        ]
        write(
            f"/categories/categories_{period or 'all_time'}_{e or 'any'}",
            list(map(lambda x: json.loads(x), data)),
            is_json=True,
        )

    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            for experience in EXPERIENCE:
                e = None if experience == "any" else experience
                await build(period, e)
                chart_filter = ChartFilter(period=period, experience=e)
                charts_subquery, date_from, date_to = await technologies_chart(
                    session, for_all=True, filter=chart_filter
                )
                charts = (await session.exec(select(*charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(
                    f"/charts/categories_{period}_{experience}",
                    {"date_from": date_from, "date_to": date_to, "charts": data},
                    is_json=True,
                )

                salary_charts_subquery, max_salary = await technologies_salary_chart(
                    session, for_all=True, filter=chart_filter
                )
                charts = (await session.exec(select(*salary_charts_subquery.c))).all()
                data = {}
                for item in charts:
                    data[item[0]] = item[1]
                write(
                    f"/charts/categories_salary_{period}_{experience}",
                    {
                        "salary_from": 0,
                        "salary_to": settings.max_salary,
                        "charts": data,
                    },
                    is_json=True,
                )
        await build(None, None)
