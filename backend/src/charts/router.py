from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.charts.service import skills_chart, salary_chart
from src.charts.schemas import ChartsResponse, SalaryChartResponse
from typing import List

router = APIRouter(prefix="/charts", tags=["Charts"])


@router.get(summary="Skill chart", path="/skill", response_model=List[ChartsResponse])
async def get_skills_chart(
    skill_name,
    experience=None,
    session: Session = Depends(get_session),
    period: int = 30,
):
    print("EXP", experience)
    return skills_chart(
        skill_name=skill_name,
        session=session,
        days_period=period,
        experience=experience,
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
