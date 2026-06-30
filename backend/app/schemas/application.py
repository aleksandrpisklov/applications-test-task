from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

class ApplicationStatus(str, Enum):
    new = "new"
    in_progress = "in_progress"
    done = "done"


class ApplicationPriority(str, Enum):
    low = "low"
    normal = "normal"
    high = "high"


class ApplicationBase(BaseModel):
    title: str = Field(
        ..., 
        min_length=3, 
        max_length=120, 
        description="Application title"
      )
    description: str | None = Field(
        None, 
        max_length=1000, 
        description="Application description"
      )

    status: ApplicationStatus = ApplicationStatus.new
    priority: ApplicationPriority = ApplicationPriority.normal

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    title: str | None = Field(None, min_length=3, max_length=120)
    description: str | None = Field(None, max_length=1000)
    status: ApplicationStatus | None = None
    priority: ApplicationPriority | None = None

class ApplicationResponse(ApplicationBase):
    id: int = Field(..., description="Unique application identifier")
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True