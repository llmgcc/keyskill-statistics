from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.keyskills.service import skills_list, get_base_skills
from src.keyskills.schemas import KeySkillsResponse, SkillsResponse

router = APIRouter(prefix="/key-skills", tags=["Key Skills"])


@router.get(summary="Key Skills", path="/list", response_model=KeySkillsResponse)
async def get_skills(
    session: Session = Depends(get_async_session),
    period: int = 5,
    limit: int = 20,
    offset=0,
    experience=None,
    category : str = None,
    domain : str = None,
    domainStrict : bool = True,
    categoryStrict : bool = True,
    skill_name : str = None

):
    return await skills_list(
        session, limit=limit, offset=offset, days_period=period, experience=experience,
        category=category, domain=domain, domainStrict=domainStrict, categoryStrict=categoryStrict, skill_name=skill_name
    )
