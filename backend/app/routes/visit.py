from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.qr_service import generate_qr
from app.models.visit import Visit
import json

router = APIRouter(prefix="/visit", tags=["Visit"])

@router.post("/create")
def create_visit(data: dict, db: Session = Depends(get_db)):
    visitor_id = data.get("visitor_id")
    branch = data.get("branch")

    visit = Visit(
        visitor_id=visitor_id,
        branch=branch
    )

    db.add(visit)
    db.commit()
    db.refresh(visit)

    # 🔥 IMPORTANT (JSON QR DATA)
    qr_data = json.dumps({
        "visit_id": visit.id
    })

    qr_base64 = generate_qr(qr_data)

    return {
        "visit_id": visit.id,
        "qr_base64": qr_base64
    }