from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_session
from src.general.service import (
    get_general_stats,
    get_currency_list,
    get_experience_list,
)
from src.general.schemas import StatsResponse, CurrencyResponse

router = APIRouter(prefix="/general", tags=["Main"])

@router.get(summary="Main", path="/stats", response_model=StatsResponse)
async def get_stats(session: Session = Depends(get_session)):
    return get_general_stats(session)

@router.get(summary="Currency", path="/currency", response_model=List[CurrencyResponse])
async def currency_list(session: Session = Depends(get_session)):
    return get_currency_list(session)

@router.get(summary="Experience", path="/experience", response_model=List[str | None])
async def experience_list(session: Session = Depends(get_session)):
    return get_experience_list(session)
