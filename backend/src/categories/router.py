from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.categories.service import categories_list
from src.categories.schemas import CategoriesResponse

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get(
    summary="Categories", path="/list", response_model=List[CategoriesResponse]
)
async def get_categories_list(
    session: Session = Depends(get_async_session), experience=None, period: int = 30
):
    return await categories_list(session, experience=experience, days_period=period)
