
from typing import List
from fastapi import APIRouter, Depends, status
from ..database import get_db
from ..schemas.application import ApplicationCreate, ApplicationResponse
from sqlalchemy.orm import Session
from ..services.application_service import ApplicationService

router = APIRouter(
  prefix="/api/applications",
  tags=['applications']
)

@router.get(
  "", 
  response_model=List[ApplicationResponse], 
  status_code=status.HTTP_200_OK
)
def get_applications(db: Session = Depends(get_db)):
  service = ApplicationService(db)
  return service.get_all_applications()

@router.get(
  "/{application_id}", 
  response_model=ApplicationResponse, 
  status_code=status.HTTP_200_OK
)
def get_application(application_id: int, db: Session = Depends(get_db)):
    service = ApplicationService(db)
    return service.get_application_by_id(application_id)

@router.post(
   "",
   response_model=ApplicationResponse,
   status_code=status.HTTP_200_OK
)
def create_application(application_data: ApplicationCreate, db: Session = Depends(get_db)):
    service = ApplicationService(db)
    return service.create_application(application_data)

