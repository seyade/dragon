from fastapi import APIRouter, Request
from db import db
registration_router = APIRouter()
@registration_router.post("/registration/")
async def read_users(request: Request):
    request = await request.json()
    auth_provider_id = request.get("auth_provider_id")
    data = {
        "email": request.get("email"),
        "full_name": request.get("full_name"),
        "user_status": "personality-test"
    }
    query = f"users?auth_provider_id=eq.{auth_provider_id}"
    db_response = await db(query, data, "post")
    print(db_response)
    #TODO Call db and save the data
    #TODO User Status = Subscription
    print(request)
    return {"user_status": "pricing", "response_status": 200}
