from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.post_login import login_router
from app.routers.registration import registration_router
from app.routers.payment import payment_router
from app.routers.personality_test.personalityTest import personality_test_router

app = FastAPI()
app.include_router(login_router)
app.include_router(registration_router)
app.include_router(payment_router)
app.include_router(personality_test_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)