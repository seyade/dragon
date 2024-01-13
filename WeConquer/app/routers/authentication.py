from fastapi import APIRouter

authentication_router = APIRouter()


@authentication_router.get("/authentication/")
async def read_users():
    return [{"succesfull": 200}]
