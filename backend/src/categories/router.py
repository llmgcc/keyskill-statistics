from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.dependencies import get_async_session
from src.categories.service import categories_list, favourites
from src.categories.schemas import (
    CategoriesResponse,
    CategoriesListResponse,
    FavouriteCategoriesRequest,
)
from src.schemas import Pagination, OrderBy
from src.categories.schemas import CategoryFilter

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get(
    path="/list",
    summary="Categories list",
    response_model=CategoriesListResponse,
)
async def get_categories_list(
    session: Session = Depends(get_async_session),
    pagination: Pagination = Depends(),
    filter: CategoryFilter = Depends(),
    order_by: OrderBy = Depends(),
):
    return await categories_list(
        session, pagination=pagination, filter=filter, order_by=order_by
    )


@router.get(
    path="/details/{category:path}",
    summary="Category Details",
    response_model=CategoriesResponse,
)
async def get_category(
    session: Session = Depends(get_async_session),
    filter: CategoryFilter = Depends(),
):
    return (await categories_list(session, filter=filter))["categories"][0]


@router.post(
    summary="Favourites", path="/favourites", response_model=CategoriesListResponse
)
async def get_favourites(
    request: FavouriteCategoriesRequest,
    session: Session = Depends(get_async_session),
    pagination: Pagination = Depends(),
    filter: CategoryFilter = Depends(),
    order_by: OrderBy = Depends(),
):
    return await favourites(
        session,
        names=request.names,
        pagination=pagination,
        filter=filter,
        order_by=order_by,
    )
