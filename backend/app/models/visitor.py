from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Visitor(Base):
    __tablename__ = "visitors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    contact = Column(String)
    purpose = Column(String)
    organization = Column(String)