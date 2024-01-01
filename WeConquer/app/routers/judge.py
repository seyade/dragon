from fastapi import APIRouter, Request
import openai
from dotenv import load_dotenv
import os
judge_router = APIRouter()

load_dotenv()
openai.api_key = os.environ["OPENAI_API_KEY"]

@judge_router.post("/judge/")
async def judge(request: Request):

    request = await request.json()
    answer = request["answer"]

    prompt = f"""
    Based on the following asssessment question:

1. Meta-Cognitive Awareness
•	Trait Description: The ability to reflect on one's own thought processes and being aware of one’s cognitive biases.
•	Assessment Question: "Can you describe a situation where you realized your initial judgment was biased or incorrect? How did you adjust your thinking?"

an imaginary person gives the following answer:
    {answer}

    Score the answer based on the scoreboard with a 1 sentence justification, respond in json format like {{ "justification": "a sentence", "score": "f.e. 10"}} (just one score, not something between)
    Scoring:

	0-20: Unaware of personal biases, no adjustment in thinking.
	21-40: Somewhat aware of biases, limited adjustment.
	41-60: Moderately self-aware, makes some adjustments based on biases.
	61-80: Highly aware of own biases, regularly adjusts thinking and actions.
	81-100: Exceptionally self-aware and insightful; consistently uses self-reflection to

    """


    print(prompt)
    messages = [{'role': 'system', 'content': prompt}]
    response = await openai.ChatCompletion.acreate(
                model='gpt-3.5-turbo-1106',
                messages=messages,
                temperature=0
            )

    response_message = response["choices"][0]["message"]["content"]

    response = {"response": response_message}
    return response
