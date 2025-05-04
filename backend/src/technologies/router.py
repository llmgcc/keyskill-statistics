from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.technologies.service import technologies_list
from src.technologies.schemas import TechnologiesResponse

router = APIRouter(prefix="/technologies", tags=["Technologies"])


@router.get(
    summary="Technologies", path="/list", response_model=List[TechnologiesResponse]
)
async def get_technologies_list(session: Session = Depends(get_session), experience=None, period : int = 30):
    return technologies_list(session, experience=experience, days_period=period)
