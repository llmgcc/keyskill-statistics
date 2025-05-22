from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.domains.service import domains_list
from src.domains.schemas import DomainsResponse

router = APIRouter(prefix="/domains", tags=["Domains"])


@router.get(summary="Domains", path="/list", response_model=List[DomainsResponse])
async def get_domains_list(
    session: Session = Depends(get_async_session), experience=None, period: int = 30
):
    return await domains_list(session, experience=experience, days_period=period)
