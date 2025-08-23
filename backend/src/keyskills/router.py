from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session
from src.dependencies import get_async_session
from src.keyskills.service import (
    skills_list,
    skill_details,
    favorites,
)
from src.keyskills.schemas import (
    KeySkillsResponse,
    SkillsResponse,
    FavoriteSkillsRequest,
    SkillsFilter,
)
from src.schemas import Pagination, OrderBy

router = APIRouter(prefix="/key-skills", tags=["Key Skills"])


class SkillsOrder(BaseModel):
    order_by: Optional[str] = None
    descending: Optional[bool] = None


@router.get(summary="Key Skills", path="/list", response_model=KeySkillsResponse)
async def get_skills(
    session: Session = Depends(get_async_session),
    pagination: Pagination = Depends(),
    filter: SkillsFilter = Depends(),
    order_by: OrderBy = Depends(),
):
    return await skills_list(
        session, pagination=pagination, filter=filter, order_by=order_by
    )


@router.get(
    summary="Skill Details",
    path="/details/{skill:path}",
    response_model=SkillsResponse,
)
async def get_skill_details(
    session: Session = Depends(get_async_session),
    filter: SkillsFilter = Depends(),
):
    return await skill_details(session, filter=filter)


@router.post(summary="favorites", path="/favorites", response_model=KeySkillsResponse)
async def get_favorites(
    request: FavoriteSkillsRequest,
    session: Session = Depends(get_async_session),
    pagination: Pagination = Depends(),
    filter: SkillsFilter = Depends(),
    order_by: OrderBy = Depends(),
):
    return await favorites(
        session,
        names=request.names,
        pagination=pagination,
        filter=filter,
        order_by=order_by,
    )
