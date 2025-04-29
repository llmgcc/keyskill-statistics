from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.keyskills.service import skills_list, get_base_skills
from src.keyskills.schemas import KeySkillsResponse, SkillsResponse

router = APIRouter(prefix="/key-skills", tags=["Key Skills"])


@router.get(summary="Key Skills", path="/list", response_model=KeySkillsResponse)
async def get_skills(
    session: Session = Depends(get_session),
    period: int = 5,
    limit: int = 20,
    offset=0,
    experience=None,
):
    return skills_list(
        session, limit=limit, offset=offset, days_period=period, experience=experience
    )


@router.get(
    summary="Key Skills debug", path="/debug", response_model=List[SkillsResponse]
)
async def get_skills(
    session: Session = Depends(get_session),
    period: int = 90,
    limit: int = 5,
    offset=0,
    experience=None,
):
    data = get_base_skills(
        limit=limit, offset=offset, days_period=period, experience=experience
    )
    return session.exec(data).all()
