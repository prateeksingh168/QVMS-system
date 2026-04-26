from pydantic import BaseModel

class VisitCreate(BaseModel):
    visitor_id: int
    branch: str