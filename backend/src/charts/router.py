from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.charts.service import skills_chart, salary_chart, category_chart,category_salary_chart, technologies_chart, technologies_salary_chart
from src.charts.schemas import ChartsResponse, SalaryChartResponse
from typing import List

router = APIRouter(prefix="/charts", tags=["Charts"])


@router.get(summary="Skill chart", path="/skill", response_model=List[ChartsResponse])
async def get_skills_chart(
    skill_name,
    experience=None,
    session: Session = Depends(get_session),
    period: int = 30
):
    return skills_chart(
        skill_name=skill_name,
        session=session,
        days_period=period,
        experience=experience
    )


@router.get(
    summary="Salary Chart chart", path="/salary", response_model=SalaryChartResponse
)
async def get_salary_chart(
    skill_name,
    session: Session = Depends(get_session),
    period: int = 30,
    experience=None,
):
    chart, max_salary = salary_chart(
        skill_name, session, days_period=period, experience=experience
    )

    return {"chart": chart, "max_salary": max_salary}




@router.get(summary="Category chart", path="/category", response_model=List[ChartsResponse])
async def get_category_chart(
    experience=None,
    session: Session = Depends(get_session),
    period: int = 30,
    category: str = None
):
    return category_chart(
        session=session,
        days_period=period,
        experience=experience,
        category=category
    )


@router.get(summary="Salary Category chart", path="/category-salary", response_model=SalaryChartResponse)
async def get_salary_category_chart(
    experience=None,
    session: Session = Depends(get_session),
    period: int = 30,
    category: str = None
):
    chart, max_salary = category_salary_chart(
        session=session,
        days_period=period,
        experience=experience,
        category=category
    )
    return {"chart": chart, "max_salary": max_salary}






@router.get(summary="Tech chart", path="/technology", response_model=List[ChartsResponse])
async def get_tech_chart(
    experience=None,
    session: Session = Depends(get_session),
    period: int = 30,
    technology: str = None
):
    return technologies_chart(
        session=session,
        days_period=period,
        experience=experience,
        technology=technology
    )


@router.get(summary="Salary Tech chart", path="/technology-salary", response_model=SalaryChartResponse)
async def get_salary_category_chart(
    experience=None,
    session: Session = Depends(get_session),
    period: int = 30,
    technology: str = None
):
    chart, max_salary = technologies_salary_chart(
        session=session,
        days_period=period,
        experience=experience,
        technology=technology
    )
    return {"chart": chart, "max_salary": max_salary}


