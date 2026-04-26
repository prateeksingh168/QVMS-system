from pydantic import BaseModel

class VisitorCreate(BaseModel):
    name: str
    contact: str
    purpose: str
    organization: str