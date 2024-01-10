from typing import List

from fastapi import APIRouter, Request
import openai
from dotenv import load_dotenv
import os
import json
from app.routers.personality_test.models import SubmitAnswers, Answer
from db import db

load_dotenv()
openai.api_key = os.environ["OPENAI_API_KEY"]


async def testIt():
    db_response = await db(path = "questions?question_id=eq.1", method = "get")
    db_response = db_response.json()
    answer = "I'm a very happy person"
    final_prompt = db_response[0]["question_prompt"].format(answer=answer)
async def judge(answers: SubmitAnswers):


    scores = []
    userID = answers.user_id
    for answer in answers.answers:

        retries = 2
        while retries > 0:

            final_prompt = answer.question_prompt.format(answer=answer.answer_text)

            messages = [{'role': 'system', 'content': final_prompt}]

            response = await openai.ChatCompletion.acreate(
                        model='gpt-3.5-turbo-1106',
                        messages=messages,
                        # TODO JSON mode on, never tested it
                        response_format={"type": "json_object"},
                        temperature=0
            )

            response_message = response["choices"][0]["message"]["content"]
            #TODO json load
            try:
                response_message = json.loads(response_message)
                scores.append(response_message["score"])
                answer.answer_score = response_message["score"]
                answer.justification = response_message["justification"]
                await save_score(answer)


            except ValueError as e:
                retries -= 1  # Decrement the retry counter
                #TODO Finish this function error_table_add_problem
                await error_table_add_problem(answer, response_message)
                if retries == 0:
                    print(f"Failed to process after retries: {e}")
                    # Handle the failure case, e.g., log the error, append a default score, etc.
                    # For example, append None or a default score value:
                    scores.append(None)


    valid_scores_sum = sum(score for score in scores if score is not None)

    # Count the number of valid scores
    valid_scores_count = sum(1 for score in scores if score is not None)

    # Calculate the average, ensuring to avoid division by zero
    average_score = round(valid_scores_sum / valid_scores_count) if valid_scores_count > 0 else None

    return average_score
async def error_table_add_problem(answer: Answer, response_message: str):

    pass

async def save_score(answer: Answer):
    #save score to db
    response = await db(path = "user_answers", method = "post", data = answer.dict())
    pass