from fastapi import APIRouter, Request
from db import db

login_router = APIRouter()
@login_router.post("/post_login/")
async def post_login(request: Request):

    request = await request.json()
    auth_provider_id = request.get("auth_provider_id")

    query = f"users?auth_provider_id=eq.{auth_provider_id}"
    db_response = await db(path = query, method = "get")
    # if respose_ code says it doesn't exist, do a post request.
    print("Does the user exist?")
    print(db_response)
    db_response = db_response.json()
    print(db_response)

    # TODO POST IF NON EXISTING USER
    if db_response  != []:
        userStatus = db_response[0]["user_status"]
        return {"user_status": userStatus}

    data = {
        "email": request.get("email"),
        "full_name": request.get("full_name"),
        "auth_provider_id": request.get("auth_provider_id"),
        "user_status": "register"
    }
    post_user = await db(path = "users", data = data, method = "post")
    return {"user_status": "register", "first_time": True}

