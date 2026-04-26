from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime, timedelta
from app.core.database import Base

class QRCode(Base):
    __tablename__ = "qrcodes"

    id = Column(Integer, primary_key=True, index=True)
    visit_id = Column(Integer, ForeignKey("visits.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    expiry = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(hours=2))