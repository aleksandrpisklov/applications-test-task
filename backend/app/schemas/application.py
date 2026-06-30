from pydantic import BaseModel, Field
from datetime import datetime
from ..enums import ApplicationStatus, ApplicationPriority


class ApplicationBase(BaseModel):
    title: str = Field(
        ..., min_length=3, max_length=120, description="Application title"
    )
    description: str | None = Field(
        None, max_length=1000, description="Application description"
    )

    status: ApplicationStatus = ApplicationStatus.new
    priority: ApplicationPriority = ApplicationPriority.normal


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(BaseModel):
    status: ApplicationStatus


class ApplicationResponse(ApplicationBase):
    id: int = Field(..., description="Unique application identifier")
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
