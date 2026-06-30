from typing import Optional
from fastapi import APIRouter, Depends, Query, status
from ..database import get_db
from ..enums import ApplicationPriority, ApplicationStatus, ApplicationSortBy, SortOrder
from ..schemas import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    PaginatedResponse,
)
from sqlalchemy.orm import Session
from ..services.application_service import ApplicationService

router = APIRouter(prefix="/api/applications", tags=["applications"])


@router.get(
    "",
    response_model=PaginatedResponse[ApplicationResponse],
    status_code=status.HTTP_200_OK,
)
def get_applications(
    status: Optional[ApplicationStatus] = Query(None),
    priority: Optional[ApplicationPriority] = Query(None),
    search: Optional[str] = Query(None),
    sort_by: ApplicationSortBy = Query(ApplicationSortBy.CREATED_AT),
    sort_order: SortOrder = Query(SortOrder.DESC),
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db),
):
    service = ApplicationService(db)
    return service.get_all_applications(
        status=status,
        priority=priority,
        search=search,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        size=size,
    )


@router.get(
    "/{application_id}",
    response_model=ApplicationResponse,
    status_code=status.HTTP_200_OK,
)
def get_application(application_id: int, db: Session = Depends(get_db)):
    service = ApplicationService(db)
    return service.get_application_by_id(application_id)


@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_200_OK)
def create_application(
    application_data: ApplicationCreate, db: Session = Depends(get_db)
):
    service = ApplicationService(db)
    return service.create_application(application_data)


@router.patch(
    "/{application_id}",
    response_model=ApplicationResponse,
    status_code=status.HTTP_200_OK,
)
def update_application_status(
    application_id: int,
    status_data: ApplicationUpdate,
    db: Session = Depends(get_db),
):
    service = ApplicationService(db)

    return service.update_application_status(
        application_id=application_id,
        status=status_data.status,
    )
