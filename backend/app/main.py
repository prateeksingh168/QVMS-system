from fastapi import FastAPI
from app.core.database import Base, engine
from app.routes import visitor, visit, dashboard, auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles



Base.metadata.create_all(bind=engine)

app = FastAPI(title="QVMS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(visitor.router)
app.include_router(visit.router)
app.include_router(dashboard.router)
app.mount("/qr_codes", StaticFiles(directory="qr_codes"), name="qr")

@app.get("/")
def root():
    return {"message": "QVMS Running"}