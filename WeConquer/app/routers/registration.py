from fastapi import APIRouter, Request

registration_router = APIRouter()
@registration_router.post("/registration/")
async def read_users(request: Request):
    incoming_json = {'fullName': 'Hilmi Terzi', 'sex': 'male', 'age': '25', 'country': 'USA', 'agreeToTerms': True}
    #TODO Call db and save the data
    #TODO User Status = Subscription
    request = await request.json()
    print(request)
    return [{"succesfull": 200}]
