from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.highlights.service import (
    gainers,
    decliners,
    new_skills,
    top_salary,
    lowest_salary,
    undefined_salary,
)
from src.highlights.schemas import HighlightsDefaultResponse
from typing import List

router = APIRouter(prefix="/highlights", tags=["Highlights"])


@router.get(
    summary="Gainers", path="/gainers", response_model=List[HighlightsDefaultResponse]
)
async def get_gainers(
    session: Session = Depends(get_session),
    period: int = 30,
    experience: str | None = None,
):
    return gainers(session, days_period=period, experience=experience)


@router.get(
    summary="Decliners",
    path="/decliners",
    response_model=List[HighlightsDefaultResponse],
)
async def get_decliners(
    session: Session = Depends(get_session),
    period: int = 30,
    experience: str | None = None,
):
    return decliners(session, days_period=period, experience=experience)


@router.get(
    summary="New skills", path="/new", response_model=List[HighlightsDefaultResponse]
)
async def get_new_skills(
    session: Session = Depends(get_session),
    period: int = 30,
    experience: str | None = None,
):
    return new_skills(session, days_period=period, experience=experience)


@router.get(
    summary="Highest Salary",
    path="/highest-salary",
    response_model=List[HighlightsDefaultResponse],
)
async def get_top_salary(
    session: Session = Depends(get_session),
    period: int = 30,
    experience: str | None = None,
):
    return top_salary(session, days_period=period, experience=experience)


@router.get(
    summary="Lowest Salary",
    path="/lowest-salary",
    response_model=List[HighlightsDefaultResponse],
)
async def get_lowest_salary(
    session: Session = Depends(get_session),
    period: int = 30,
    experience: str | None = None,
):
    return lowest_salary(session, days_period=period, experience=experience)


@router.get(
    summary="Undefined Salary",
    path="/undefined-salary",
    response_model=List[HighlightsDefaultResponse],
)
async def get_undefined_salary(
    session: Session = Depends(get_session),
    period: int = 30,
    experience: str | None = None,
):
    return undefined_salary(session, days_period=period, experience=experience)
