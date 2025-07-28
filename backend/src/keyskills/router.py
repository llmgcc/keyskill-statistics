from typing import List
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from src.dependencies import get_async_session
from src.keyskills.service import skills_list, skill_details, related_skills, similar_skills
from src.keyskills.schemas import KeySkillsResponse, SkillsResponse, SkillsSimilarityResponse, SkillOrderByQueryParams
from urllib.parse import unquote

router = APIRouter(prefix="/key-skills", tags=["Key Skills"])


@router.get(summary="Key Skills", path="/list", response_model=KeySkillsResponse)
async def get_skills(
    session: Session = Depends(get_async_session),
    period: int = 5,
    limit: int = 20,
    offset=0,
    experience=None
):
    return await skills_list(
        session,
        limit=limit,
        offset=offset,
        days_period=period,
        experience=experience,
    )

@router.get(summary="Skill Details", path="/details/{skill_name:path}", response_model=SkillsResponse)
async def get_skill_details(
    skill_name: str,
    days_period : int = 5,
    experience: str = None,
    session: Session = Depends(get_async_session),
):
    return await skill_details(session, skill_name, days_period, experience)


@router.get(summary="Related", path="/related/{skill_name:path}", response_model=KeySkillsResponse)
async def get_related_skills(
    skill_name: str,
    days_period : int = 5,
    experience=None,
    session: Session = Depends(get_async_session),
    order_by: SkillOrderByQueryParams = Depends(),
    limit : int = 10,
    offset : int = 10
):
    return await related_skills(session, skill_name, days_period, experience=experience, order_by=order_by, limit=limit, offset=offset)




@router.get(summary="Similar", path="/similar/{skill_name:path}", response_model=KeySkillsResponse)
async def get_similar_skills(
    skill_name: str,
    limit: int = Query(10),
    days_period : int = 30,
    session: Session = Depends(get_async_session),
    order_by: SkillOrderByQueryParams = Depends(),
    offset : int = 10
):
    return await similar_skills(session, skill_name, limit=limit, days_period=days_period, order_by=order_by, offset=offset)