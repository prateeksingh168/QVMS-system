from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from app.core.database import Base, engine
from app.routes.visitor import router as visitor_router
from app.routes.visit import router as visit_router
from app.routes.dashboard import router as dashboard_router
from app.routes.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="QVMS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(visitor_router)
app.include_router(visit_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {"message": "QVMS Running"}