from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.application import Application
from ..schemas.application import ApplicationCreate

class ApplicationRepository:
  def __init__(self, db: Session):
    self.db = db

  def get_all(self) -> List[Application]:
    return self.db.query(Application).all()
  
  def get_by_id(self, application_id: int) -> Optional[Application]:
    return self.db.query(Application).filter(Application.id == application_id).first()
  
  def create(self, application_data: ApplicationCreate) -> Application:
    db_application = Application(**application_data.model_dump())
    self.db.add(db_application)
    self.db.commit()
    self.db.refresh(db_application)
    return db_application