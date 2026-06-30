from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, case, or_
from typing import List, Optional
from ..models import Application
from ..schemas import ApplicationCreate
from ..enums.application import (
    ApplicationStatus,
    ApplicationPriority,
    ApplicationSortBy,
    SortOrder,
)


class ApplicationRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        status: Optional[ApplicationStatus] = None,
        priority: Optional[ApplicationPriority] = None,
        search: Optional[str] = None,
        sort_by: ApplicationSortBy = ApplicationSortBy.CREATED_AT,
        sort_order: SortOrder = SortOrder.DESC,
        page: int = 1,
        size: int = 10,
    ) -> tuple[List[Application], int]:
        query = self.db.query(Application)

        if status is not None:
            query = query.filter(Application.status == status)

        if priority is not None:
            query = query.filter(Application.priority == priority)

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    Application.title.ilike(search_pattern),
                    Application.description.ilike(search_pattern),
                )
            )

        total = query.count()

        if sort_by == ApplicationSortBy.PRIORITY:
            sort_column = case(
                {
                    ApplicationPriority.low: 1,
                    ApplicationPriority.normal: 2,
                    ApplicationPriority.high: 3,
                },
                value=Application.priority,
            )
        else:
            sort_column = Application.created_at

        order_func = asc if sort_order == SortOrder.ASC else desc
        query = query.order_by(order_func(sort_column))

        offset = (page - 1) * size
        query = query.offset(offset).limit(size)

        return query.all(), total

    def get_by_id(self, application_id: int) -> Optional[Application]:
        return (
            self.db.query(Application).filter(Application.id == application_id).first()
        )

    def create(self, application_data: ApplicationCreate) -> Application:
        db_application = Application(**application_data.model_dump())
        self.db.add(db_application)
        self.db.commit()
        self.db.refresh(db_application)
        return db_application

    def update_status(
        self,
        application: Application,
        status: ApplicationStatus,
    ) -> Application:
        application.status = status

        self.db.commit()
        self.db.refresh(application)

        return application
