from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.domains.service import domains_list, favorites
from src.domains.schemas import (
    DomainsResponse,
    DomainsListResponse,
    FavoriteDomainsRequest,
    DomainFilter,
)
from src.schemas import Pagination, OrderBy

router = APIRouter(prefix="/domains", tags=["Domains"])


@router.get(summary="Domains", path="/list", response_model=DomainsListResponse)
async def get_domains_list(
    session: Session = Depends(get_async_session),
    pagination: Pagination = Depends(),
    filter: DomainFilter = Depends(),
    order_by: OrderBy = Depends(),
):
    return await domains_list(
        session, pagination=pagination, filter=filter, order_by=order_by
    )


@router.get(
    summary="Domain details",
    path="/details/{domain:path}",
    response_model=DomainsResponse,
)
async def get_domain(
    session: Session = Depends(get_async_session),
    filter: DomainFilter = Depends(),
):
    return (await domains_list(session, filter=filter))["domains"][0]


@router.post(summary="favorites", path="/favorites", response_model=DomainsListResponse)
async def get_favorites(
    request: FavoriteDomainsRequest,
    session: Session = Depends(get_async_session),
    pagination: Pagination = Depends(),
    filter: DomainFilter = Depends(),
    order_by: OrderBy = Depends(),
):
    return await favorites(
        session,
        names=request.names,
        pagination=pagination,
        filter=filter,
        order_by=order_by,
    )
