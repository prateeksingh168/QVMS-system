from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.qr_service import generate_qr
from app.models.visit import Visit
import json

router = APIRouter(prefix="/visit", tags=["Visit"])


# 🔥 CREATE VISIT + QR
@router.post("/create")
def create_visit(data: dict, db: Session = Depends(get_db)):
    visitor_id = data.get("visitor_id")
    branch = data.get("branch")

    visit = Visit(
        visitor_id=visitor_id,
        branch=branch,
        status="active"
    )

    db.add(visit)
    db.commit()
    db.refresh(visit)

    # JSON QR
    qr_data = json.dumps({
        "visit_id": visit.id
    })

    qr_base64 = generate_qr(qr_data)

    return {
        "visit_id": visit.id,
        "qr_base64": qr_base64,
        "status": visit.status
    }


# 🔥 SCAN → TOGGLE STATUS
@router.post("/scan")
def scan_visit(data: dict, db: Session = Depends(get_db)):
    visit_id = data.get("visit_id")

    visit = db.query(Visit).filter(Visit.id == visit_id).first()

    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    # 🔁 toggle
    if visit.status == "active":
        visit.status = "completed"
    else:
        visit.status = "active"

    db.commit()

    return {
        "message": "Status updated",
        "status": visit.status
    }