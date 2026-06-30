from math import ceil
from ..repositories import ApplicationRepository
from ..schemas import (
    ApplicationResponse,
    ApplicationCreate,
    PaginatedResponse,
)
from ..enums.application import (
    ApplicationStatus,
    ApplicationPriority,
    ApplicationSortBy,
    SortOrder,
)
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import HTTPException, status as http_status


class ApplicationService:
    def __init__(self, db: Session):
        self.repository = ApplicationRepository(db)

    def get_all_applications(
        self,
        status: Optional[ApplicationStatus] = None,
        priority: Optional[ApplicationPriority] = None,
        search: Optional[str] = None,
        sort_by: ApplicationSortBy = ApplicationSortBy.CREATED_AT,
        sort_order: SortOrder = SortOrder.DESC,
        page: int = 1,
        size: int = 10,
    ) -> PaginatedResponse[ApplicationResponse]:
        applications, total = self.repository.get_all(
            status=status,
            priority=priority,
            search=search,
            sort_by=sort_by,
            sort_order=sort_order,
            page=page,
            size=size,
        )

        pages = ceil(total / size) if total > 0 else 0

        return PaginatedResponse(
            items=[ApplicationResponse.model_validate(app) for app in applications],
            total=total,
            page=page,
            size=size,
            pages=pages,
        )

    def get_application_by_id(self, application_id: int) -> ApplicationResponse:
        application = self.repository.get_by_id(application_id)
        if not application:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND,
                detail=f"Application with id {application_id} not found",
            )

        return ApplicationResponse.model_validate(application)

    def create_application(
        self, application_data: ApplicationCreate
    ) -> ApplicationResponse:
        application = self.repository.create(application_data)
        return ApplicationResponse.model_validate(application)

    def update_application_status(
        self,
        application_id: int,
        status: ApplicationStatus,
    ) -> ApplicationResponse:
        application = self.repository.get_by_id(application_id)

        if not application:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND,
                detail=f"Application with id {application_id} not found",
            )

        updated_application = self.repository.update_status(
            application=application,
            status=status,
        )

        return ApplicationResponse.model_validate(updated_application)

    def delete_application(self, application_id: int) -> None:
        application = self.repository.get_by_id(application_id)

        if not application:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND,
                detail=f"Application with id {application_id} not found",
            )

        self.repository.delete(application)
