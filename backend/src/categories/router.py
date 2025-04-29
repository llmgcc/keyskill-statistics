from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.categories.service import categories_list
from src.categories.schemas import CategoriesResponse

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get(summary="Categories", path="/list", response_model=List[CategoriesResponse])
async def get_skills(session: Session = Depends(get_session)):
    return categories_list(session)
