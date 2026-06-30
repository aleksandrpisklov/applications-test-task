from ..repositories.application_repository import ApplicationRepository
from ..schemas.application import (
    ApplicationPriority,
    ApplicationResponse,
    ApplicationCreate,
    ApplicationSortBy,
    ApplicationStatus,
    SortOrder,
)
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi import HTTPException, status


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
    ) -> List[ApplicationResponse]:
        applications = self.repository.get_all(
            status=status,
            priority=priority,
            search=search,
            sort_by=sort_by,
            sort_order=sort_order,
        )

        return [
            ApplicationResponse.model_validate(application)
            for application in applications
        ]

    def get_application_by_id(self, application_id: int) -> ApplicationResponse:
        application = self.repository.get_by_id(application_id)
        if not application:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Application with id {application_id} not found",
            )

        return ApplicationResponse.model_validate(application)

    def create_application(
        self, application_data: ApplicationCreate
    ) -> ApplicationResponse:
        application = self.repository.create(application_data)
        return ApplicationResponse.model_validate(application)
