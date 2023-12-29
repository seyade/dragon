from fastapi import APIRouter

registration_router = APIRouter()
@registration_router.get("/registration/")
async def read_users():
    return [{"succesfull": 200}]
