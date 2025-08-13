from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.general.service import (
    get_general_stats,
    get_currency_list,
)
from src.general.schemas import StatsResponse, CurrencyResponse

router = APIRouter(prefix="/general", tags=["General"])


@router.get(summary="Main", path="/stats", response_model=StatsResponse)
async def get_stats(session: Session = Depends(get_async_session)):
    return await get_general_stats(session)


@router.get(summary="Currency", path="/currency", response_model=List[CurrencyResponse])
async def currency_list(session: Session = Depends(get_async_session)):
    return (await get_currency_list(session)).all()
