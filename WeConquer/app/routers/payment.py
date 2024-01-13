from fastapi import APIRouter, Request
from db import db

payment_router = APIRouter()
@payment_router.post("/verify_payment/")
async def verify_payment(request: Request):
    return None