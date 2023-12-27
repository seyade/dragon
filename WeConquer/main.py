from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/authenication_exchange/")
async def authenication_exchange(request: Request):
    try:
        authenication_exchange = await authenication_exchanges(request)
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

    
    return authenication_exchange
    
async def authenication_exchanges(request):

    request = await request.json()
    print(request)
    return {"message": "Hello World"}

# @app.post("/calculation")
# async def chatbot(request: Request):

#     try:
#         traits_json = await get_traits_json(request)

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
#     if not traits_json:
#         raise HTTPException(status_code=500, detail="The response of the chatbot is not a valid JSON.")
#     #TODO if traits_json is a valid json, use matchTraitsWithEntrepeneurs to get the matches_entrepeneurs
#     if traits_json:
#         matches_entrepeneurs = await matchTraitsWithEntrepeneurs(traits_json)
#     return matches_entrepeneurs
