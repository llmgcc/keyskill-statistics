from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.charts.service import (
    skills_chart,
    salary_chart,
    category_chart,
    category_salary_chart,
    technologies_chart,
    technologies_salary_chart,
)
from src.charts.schemas import SalaryChartResponse, TrendChartResponse, ChartFilter
from src.config import settings


router = APIRouter(prefix="/charts", tags=["Charts"])


@router.get(summary="Skill chart", path="/skill", response_model=TrendChartResponse)
async def get_skills_chart(
    session: Session = Depends(get_async_session),
    filter: ChartFilter = Depends(),
):
    chart, date_from, date_to = await skills_chart(session=session, filter=filter)

    return {"chart": (chart) or [], "date_from": date_from, "date_to": date_to}


@router.get(
    summary="Salary Chart chart", path="/salary", response_model=SalaryChartResponse
)
async def get_salary_chart(
    session: Session = Depends(get_async_session),
    filter: ChartFilter = Depends(),
):
    chart = await salary_chart(session=session, filter=filter)

    return {"chart": chart or [], "salary_from": 0, "salary_to": settings.max_salary}


@router.get(
    summary="Category chart", path="/category", response_model=TrendChartResponse
)
async def get_category_chart(
    session: Session = Depends(get_async_session),
    filter: ChartFilter = Depends(),
):
    chart, date_from, date_to = await category_chart(session=session, filter=filter)
    return {"chart": (chart) or [], "date_from": date_from, "date_to": date_to}


@router.get(
    summary="Salary Category chart",
    path="/category-salary",
    response_model=SalaryChartResponse,
)
async def get_salary_domain_chart(
    session: Session = Depends(get_async_session),
    filter: ChartFilter = Depends(),
):
    chart, max_salary = await category_salary_chart(session=session, filter=filter)
    return {"chart": chart or [], "salary_from": 0, "salary_to": settings.max_salary}


@router.get(summary="Tech chart", path="/technology", response_model=TrendChartResponse)
async def get_tech_chart(
    session: Session = Depends(get_async_session),
    filter: ChartFilter = Depends(),
):
    chart, date_from, date_to = await technologies_chart(session=session, filter=filter)
    return {"chart": (chart) or [], "date_from": date_from, "date_to": date_to}


@router.get(
    summary="Salary Tech chart",
    path="/technology-salary",
    response_model=SalaryChartResponse,
)
async def get_salary_category_chart(
    session: Session = Depends(get_async_session),
    filter: ChartFilter = Depends(),
):
    chart, max_salary = await technologies_salary_chart(session=session, filter=filter)
    return {"chart": chart or [], "salary_from": 0, "salary_to": settings.max_salary}
