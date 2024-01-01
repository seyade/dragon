from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routers.post_login import login_router
from app.routers.registration import registration_router

from app.routers.judge import judge_router

app = FastAPI()
app.include_router(login_router)
app.include_router(judge_router)
app.include_router(registration_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)