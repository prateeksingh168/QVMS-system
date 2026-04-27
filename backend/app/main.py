from fastapi import FastAPI
from app.core.database import Base, engine
from app.routes.visitor import router as visitor_router
from app.routes.visit import router as visit_router
from app.routes.dashboard import router as dashboard_router
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.models import user, visitor, visit, qr

Base.metadata.create_all(bind=engine)

app = FastAPI(title="QVMS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QR_PATH = os.path.join(BASE_DIR, "qr_codes")

os.makedirs(QR_PATH, exist_ok=True)

app.mount("/qr_codes", StaticFiles(directory=QR_PATH), name="qr")

app.include_router(auth_router)
app.include_router(visitor_router)
app.include_router(visit_router)
app.include_router(dashboard_router)
app.mount("/qr_codes", StaticFiles(directory="qr_codes"), name="qr")

@app.get("/")
def root():
    return {"message": "QVMS Running"}