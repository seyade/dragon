from typing import List

from fastapi import APIRouter, Request

from openai import AsyncOpenAI, OpenAI
from dotenv import load_dotenv
import os
from app.routers.personality_test.models import SubmitAnswers, Answer
from db import db

load_dotenv()
client = AsyncOpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
    max_retries=2,
)
async def judge(answers: SubmitAnswers):
    scores = []
    userID = answers.user_id

    for answer in answers.answers:

            final_prompt = answer.question_prompt.format(answer=answer.answer_text)

            messages = [{'role': 'system', 'content': final_prompt}]

            response = await client.chat.completions.create(
                        model='gpt-4-1106-preview',
                        messages=messages,
                        # TODO JSON mode on, never tested it
                        response_format={"type": "json_object"},
                        temperature=0
            )
            response_message = response.choices[0].message.content
            print(response_message)

            # response_message = json.loads(response_message)
            response_message ={
                "justification": "The individual demonstrated skilled synthesis of conflicting viewpoints by facilitating open dialogue and crafting a hybrid solution, showing a high level of integrative thinking.",
                "score": "81"
            }
            theScore = None
            try:
                theScore = int(response_message["score"])
            except:
                response_message["score"] = None
            scores.append(theScore)
            answer.answer_score = theScore
            answer.justification = response_message["justification"]
            response_of_saved_score = await save_score(answer, userID)
            print(response_of_saved_score)

    valid_scores_sum = sum(score for score in scores if score is not None)

    # Count the number of valid scores
    valid_scores_count = sum(1 for score in scores if score is not None)

    # Calculate the average, ensuring to avoid division by zero
    average_score = round(valid_scores_sum / valid_scores_count) if valid_scores_count > 0 else None

    return average_score

async def save_score(answer: Answer, userID: int):
    answer.user_id = userID
    print(answer.dict())
    response = await db(path = "user_answers", method = "post", data = answer.dict())
    response = response.json()
    print(response)
    return response