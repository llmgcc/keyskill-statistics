from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session
from src.dependencies import get_async_session
from src.categories.service import categories_list
from src.categories.schemas import CategoriesResponse
from src.constants import Experience

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get(
    path="/list",
    summary="Categories list",
    response_model=List[CategoriesResponse],
)
async def get_categories_list(
    session: Session = Depends(get_async_session),
    experience: str | None = Query(
        None, description="Experience", example=Experience.noExperience
    ),
    period: int = Query(30, ge=1, description="Period", example=30),
):
    try:
        return await categories_list(session, experience=experience, days_period=period)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error: {str(e)}",
        )
