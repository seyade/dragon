# import json
from fastapi import Request, HTTPException
import openai
import json


async def get_traits_json(request: Request) -> dict:
    """Get the traits from the JSON body of the request."""

    body = await request.json()
    business_idea = body["business_idea"]

    json_response_of_chatGPT = await get_json_of_gpt(business_idea)
    return json_response_of_chatGPT


async def get_json_of_gpt(business_idea: str):
    prompt = f""" There are 35 Entrepreneur traits that determines the success of a business according to our researches. The traits are: {traits} 
Based on the following business idea: {business_idea}, what top 10 entrepreneur traits are the most important in numerological order? And what is the percentage of importance of that trait out of hundred? Make sure you divide 100 percent of percentage heaviness across 10 traits. Respond in json format as follows :
[
{
    "number": 1,
"trait": "Analyst",
"reason_for_number_one": "20 words max"
"percentage_heaviness": 33
},
{
    "number": 2,
"trait": "Do-er",
"reason_for_number_two":"20 words max" ,
"percentage_heaviness": 14
},
{
    "number": 2,
"trait”: “Leadership",
"reason_for_number_two":"20 words max" ,
"percentage_heaviness": 5
} etc etc
]
 
Start directly responding in JSON format.

"""

    response = await openai.ChatCompletion.acreate(
        model='gpt-3.5-turbo',
        messages=[{"role": "user", "content": business_idea}],
        temperature=0
    )

    response_of_gpt = response["choices"][0]["message"]

    # try to json.loads(response_of_chatGPT)
    # if it fails, raise an exception
    try:
        response = json.loads(response_of_gpt)
    except:
        print("error")
        print(response_of_gpt)
        raise HTTPException(status_code=500, detail="The response of the chatbot is not a valid JSON.")

    return response
