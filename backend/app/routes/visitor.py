from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.visitor import Visitor
from app.schemas.visitor import VisitorCreate

router = APIRouter(prefix="/visitor")

@router.post("/register")
def register_visitor(data: VisitorCreate, db: Session = Depends(get_db)):
    visitor = Visitor(**data.dict())
    db.add(visitor)
    db.commit()
    db.refresh(visitor)
    return visitor

