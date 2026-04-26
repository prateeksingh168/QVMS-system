from fastapi import Depends, HTTPException
from jose import jwt
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User


def get_current_user(token: str = Depends()):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    return email


def get_current_admin(token: str = Depends(), db: Session = Depends(get_db)):
    email = get_current_user(token)

    user = db.query(User).filter(User.email == email).first()

    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    return user