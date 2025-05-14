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
from src.database import engine, async_engine
from sqlmodel import Session, select
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
    dest_dir = FRONTEND_STATIC_API_PATH + '/static'
    os.makedirs(dest_dir, exist_ok=True)
    if os.path.exists(source_dir):
        shutil.copytree(source_dir, dest_dir, dirs_exist_ok=True)

copy_images_folder()


# exit()

async def build_static(router):
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://localhost:8000"
    ) as client:
        for route in router.routes:
            response = await client.get(route.path)
            print(response)
            print("\n\n\n\n")
            path = route.path
            file_name = f"{FRONTEND_STATIC_API_PATH + path}.json"
            os.makedirs(os.path.dirname(file_name), exist_ok=True)
            with open(file_name, "w", encoding="utf-8") as f:
                f.write(response.text)


async def build_from_routes():
    await build_static(main_router)
    await build_static(categories_router)
    await build_static(domains_router)


# async def build():
#     await build_from_routes()
    
# asyncio.run(build())

async def test():
    async with AsyncSession(async_engine) as session:
        for period in PERIOD:
            print(period, len(PERIOD))
            for experience in EXPERIENCE:
                e = None if experience == "any" else experience
                # SKILLS
                skills = get_base_skills(
                    period, limit=None, offset=0, experience=e, min_count=5
                )

                data = [
                    SkillsResponse.model_validate(item).model_dump_json()
                    for item in (await session.exec(skills)).all()
                ]
                file_name = f"{FRONTEND_STATIC_API_PATH + f'/skills/skills_{period}_{experience}'}.json"
                os.makedirs(os.path.dirname(file_name), exist_ok=True)
                data = list(map(lambda x: json.loads(x), data))
                with open(file_name, "w", encoding="utf-8") as f:
                    json.dump(data, f)

                # #  CATEGORIES
                # categories = await categories_list(session, period, experience=e)
                # data = [
                #     CategoriesResponse.model_validate(item).model_dump_json()
                #     for item in categories
                # ]
                # file_name = f"{FRONTEND_STATIC_API_PATH + f'/categories/categories_{period}_{experience}'}.json"
                # os.makedirs(os.path.dirname(file_name), exist_ok=True)
                # data = list(map(lambda x: json.loads(x), data))
                # with open(file_name, "w", encoding="utf-8") as f:
                #     json.dump(data, f)

                # #  DOMAINS
                # domains = await domains_list(session, period, experience=e)
                # data = [
                #     DomainsResponse.model_validate(item).model_dump_json()
                #     for item in domains
                # ]
                # file_name = f"{FRONTEND_STATIC_API_PATH + f'/domains/domains_{period}_{experience}'}.json"
                # os.makedirs(os.path.dirname(file_name), exist_ok=True)
                # data = list(map(lambda x: json.loads(x), data))
                # with open(file_name, "w", encoding="utf-8") as f:
                #     json.dump(data, f)

asyncio.run(test())

# asyncio.run(build_static(categories_router))
# asyncio.run(build_static(technologies_router))
# build_static(categories_router)
# build_static(technologies_router)

# exit()

# build_static(categories_router)
# build_static(technologies_router)
# exit()
# with Session(engine) as session:
#     for period in PERIOD:
#         print(period, len(PERIOD))
#         for experience in EXPERIENCE:
#             print("\t", experience, len(EXPERIENCE))
#             e = None if experience == "any" else experience

#             print("categories")
#             #  CATEGORIES
#             categories = categories_list(session, period, experience=e)
#             data = [
#                 CategoriesResponse.model_validate(item).model_dump_json()
#                 for item in categories
#             ]
#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/categories/categories_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             data = list(map(lambda x: json.loads(x), data))
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(data, f)

#             # CATEGORIES CHART
#             categories = {}
#             for category in data:
#                 print("categories chart")
#                 chart = category_chart(category["name"], session, period, experience=e)
#                 categories[category["name"]] = chart

#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/categories_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(categories, f)

#             # CATEGORIES SALARY
#             categories = {}
#             for category in data:
#                 print("categories salary")
#                 chart = category_salary_chart(
#                     category["name"], session, period, experience=e
#                 )
#                 categories[category["name"]] = chart

#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/categories_salary_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(categories, f)

#             #  TECHNOLOGIES
#             categories = technologies_list(session, period, experience=e)
#             data = [
#                 TechnologiesResponse.model_validate(item).model_dump_json()
#                 for item in categories
#             ]
#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/technologies/technologies_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             data = list(map(lambda x: json.loads(x), data))
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(data, f)

#             # TECHNOLOGIES CHART
#             categories = {}
#             for category in data:
#                 chart = technologies_chart(
#                     category["name"], session, period, experience=e
#                 )
#                 categories[category["name"]] = chart

#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/technologies_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(categories, f)

#             # TECHNOLOGIES SALARY
#             categories = {}
#             for category in data:
#                 chart = technologies_salary_chart(
#                     category["name"], session, period, experience=e
#                 )
#                 categories[category["name"]] = chart

#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/technologies_salary_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(categories, f)

#             # SKILLS
#             skills = get_base_skills(
#                 period, limit=None, offset=0, experience=e, min_count=5
#             )

#             data = [
#                 SkillsResponse.model_validate(item).model_dump_json()
#                 for item in session.exec(skills).all()
#             ]
#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/skills/skills_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             data = list(map(lambda x: json.loads(x), data))
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(data, f)

#             # SKILLS CHARTS
#             charts_subquery = skills_chart(
#                 None, session, period, for_all_skills=True, experience=e
#             )
#             result = (
#                 select(skills.c.name, charts_subquery.c.chart)
#                 .select_from(skills)
#                 .outerjoin(charts_subquery, skills.c.name == charts_subquery.c.name)
#             )
#             charts = session.exec(result).all()
#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/skills_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             data = {}
#             for item in charts:
#                 data[item[0]] = item[1]
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(data, f)

#             # SKILLS SALARY CHARTS
#             salary_charts_subquery, max_salary = salary_chart(
#                 None, session, period, for_all_skills=True, experience=e
#             )
#             result = (
#                 select(skills.c.name, salary_charts_subquery.c.salary_chart)
#                 .select_from(skills)
#                 .outerjoin(
#                     salary_charts_subquery,
#                     skills.c.name == salary_charts_subquery.c.name,
#                 )
#             )
#             charts = session.exec(result).all()
#             file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/salary_{period}_{experience}'}.json"
#             os.makedirs(os.path.dirname(file_name), exist_ok=True)
#             data = {}
#             for item in charts:
#                 data[item[0]] = item[1]
#             with open(file_name, "w", encoding="utf-8") as f:
#                 json.dump(data, f)
