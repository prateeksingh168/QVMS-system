from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.visit import Visit
from datetime import datetime

router = APIRouter(prefix="/visit", tags=["Visit"])


# ✅ CREATE VISIT (QR generation already working in your code)
@router.post("/create")
def create_visit(data: dict, db: Session = Depends(get_db)):
    visit = Visit(
        visitor_id=data["visitor_id"],
        branch=data["branch"],
        check_in=datetime.utcnow()
    )
    db.add(visit)
    db.commit()
    db.refresh(visit)

    return {
        "visit_id": visit.id,
        "qr_path": f"qr_codes/visit_{visit.id}.png"
    }


# 🔥 TOGGLE SCAN (MAIN FEATURE)
@router.post("/scan/{visit_id}")
def scan_qr(visit_id: int, db: Session = Depends(get_db)):
    visit = db.query(Visit).filter(Visit.id == visit_id).first()

    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    # 🔥 EVEN/ODD LOGIC
    if visit.check_out is None:
        visit.check_out = datetime.utcnow()
        status = "Checked Out"
    else:
        visit.check_in = datetime.utcnow()
        visit.check_out = None
        status = "Checked In"

    db.commit()

    return {"message": status}
