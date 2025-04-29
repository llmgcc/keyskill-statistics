from fastapi.testclient import TestClient
from fastapi import FastAPI
from src.main_page.router import router as main_router
from src.categories.router import router as categories_router
from src.technologies.router import router as technologies_router
from src.highlights.router import router as highlights_router
import os
from src.keyskills.service import get_base_skills
from src.charts.service import skills_chart, salary_chart
from src.database import engine
from sqlmodel import Session, select
from src.keyskills.schemas import SkillsResponse
import json

FRONTEND_STATIC_API_PATH = (
    os.path.dirname(os.path.abspath(__file__ + "/../"))
    + "/vacancies-statistics/public/static-api"
)
app = FastAPI()
app.include_router(main_router)
app.include_router(categories_router)
app.include_router(technologies_router)
app.include_router(highlights_router)

client = TestClient(app)


EXPERIENCE = ["any", "noExperience", "between1And3", "between3And6", "moreThan6"]

PERIOD = [7, 14, 30]


def build_static(router):
    for route in router.routes:
        response = client.get(route.path)
        path = route.path
        file_name = f"{FRONTEND_STATIC_API_PATH + path}.json"
        os.makedirs(os.path.dirname(file_name), exist_ok=True)
        with open(file_name, "w", encoding="utf-8") as f:
            f.write(response.text)


# build_static(main_router)
# build_static(categories_router)
# build_static(technologies_router)


with Session(engine) as session:
    for period in PERIOD:
        for experience in EXPERIENCE:
            print(period, experience)
            e = None if experience == "any" else experience
            skills = get_base_skills(
                period, limit=None, offset=0, experience=e, min_count=5
            )

            data = [
                SkillsResponse.model_validate(item).model_dump_json()
                for item in session.exec(skills).all()
            ]
            file_name = f"{FRONTEND_STATIC_API_PATH + f'/skills/skills_{period}_{experience}'}.json"
            os.makedirs(os.path.dirname(file_name), exist_ok=True)
            data = list(map(lambda x: json.loads(x), data))
            with open(file_name, "w", encoding="utf-8") as f:
                json.dump(data, f)

            charts_subquery = skills_chart(
                None, session, period, for_all_skills=True, experience=e
            )
            result = (
                select(skills.c.name, charts_subquery.c.chart)
                .select_from(skills)
                .outerjoin(charts_subquery, skills.c.name == charts_subquery.c.name)
            )
            charts = session.exec(result).all()
            file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/skills_{period}_{experience}'}.json"
            os.makedirs(os.path.dirname(file_name), exist_ok=True)
            data = {}
            for item in charts:
                data[item[0]] = item[1]
            with open(file_name, "w", encoding="utf-8") as f:
                json.dump(data, f)

            salary_charts_subquery, max_salary = salary_chart(
                None, session, period, for_all_skills=True, experience=e
            )
            result = (
                select(skills.c.name, salary_charts_subquery.c.salary_chart)
                .select_from(skills)
                .outerjoin(
                    salary_charts_subquery,
                    skills.c.name == salary_charts_subquery.c.name,
                )
            )
            charts = session.exec(result).all()
            file_name = f"{FRONTEND_STATIC_API_PATH + f'/charts/salary_{period}_{experience}'}.json"
            os.makedirs(os.path.dirname(file_name), exist_ok=True)
            data = {}
            for item in charts:
                data[item[0]] = item[1]
            with open(file_name, "w", encoding="utf-8") as f:
                json.dump(data, f)
