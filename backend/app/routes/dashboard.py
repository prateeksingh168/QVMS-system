from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.visit import Visit
from datetime import datetime, timedelta

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):
    total = db.query(Visit).count()

    active = db.query(Visit).filter(Visit.check_out == None).count()

    today = db.query(Visit).filter(
        Visit.check_in >= datetime.utcnow().date()
    ).count()

    last_7_days = []
    for i in range(6, -1, -1):
        day = datetime.utcnow() - timedelta(days=i)

        count = db.query(Visit).filter(
            Visit.check_in >= day.replace(hour=0, minute=0, second=0),
            Visit.check_in <= day.replace(hour=23, minute=59, second=59)
        ).count()

        last_7_days.append({
            "day": day.strftime("%a"),
            "visits": count
        })

    recent_visits = db.query(Visit).order_by(Visit.id.desc()).limit(5).all()

    recent_data = [
        {
            "id": v.id,
            "branch": v.branch,
            "status": "Active" if v.check_out is None else "Exited"
        }
        for v in recent_visits
    ]

    return {
        "total_visits": total,
        "active_visits": active,
        "today_visits": today,
        "chart": last_7_days,
        "recent": recent_data
    }
