from ..repositories.application_repository import ApplicationRepository
from ..schemas.application import ApplicationResponse, ApplicationCreate
from sqlalchemy.orm import Session
from typing import List
from fastapi import HTTPException, status

class ApplicationService:
  def __init__(self, db: Session):
    self.repository = ApplicationRepository(db)
     
  def get_all_applications(self) -> List[ApplicationResponse]:
    applications = self.repository.get_all()
    return [ApplicationResponse.model_validate(application) for application in applications]
  
  def get_application_by_id(self, application_id: int) -> ApplicationResponse:
    application = self.repository.get_by_id(application_id) 
    if not application:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f'Application with id {application_id} not found'
      )
    
    return ApplicationResponse.model_validate(application)
  
  def create_application(self, application_data: ApplicationCreate) -> ApplicationResponse:
    application = self.repository.create(application_data)
    return ApplicationResponse.model_validate(application)