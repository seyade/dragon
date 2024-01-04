from typing import List

from db import db
from models import Question, StartTestRequest, QuestionBatch, User, Answer, SubmitAnswersRequest
from judge import judge


async def get_user_data(user_id: int):
    query = f"users?user_id=eq.{user_id}"
    db_response = await db(path = query, method = "get")
    user = User(**db_response.json()[0])
    return user

async def get_question_batch(user_tier: str, batch_number: int):
    #TODO
    # Questions table consists of the following fields; question_id, question_text, question_prompt, trait_type
    query = f"questions?tier=eq.{user_tier}&batch_number=eq.{batch_number}"
    db_response = await db(path = query, method = "get")
    question_batch = QuestionBatch(**db_response.json())
    #TODO Save that the user is in it's first batch.

    # Call the user sessions table to indicate the first batch is sent, and isCompleted to False/
    # user_session consists of the following fields; user_id, batch_number, isCompleted

    return question_batch
async def get_first_question_batch(request : StartTestRequest):
    # Fetch and shuffle the first batch of questions
    user = await get_user_data(request.user_id)
    question_batch: QuestionBatch = await get_question_batch(user.tier_type, 1)
    return question_batch

async def check_answers(answer: SubmitAnswersRequest):
    #TODO

    scores = await judge(answer)
    trait =
    # Save the answers to the answers table
    # answers table consists of the following fields; user_id, answer_id, question_id, answer_text, answer_score, is_copy_paste, answer_time
    #TODO
    # Calculate the score for the current batch
    #TODO
    # Update the user sessions table to indicate that the current batch is completed and the next batch is sent.
    # user_session consists of the following fields; user_id, batch_number, isCompleted
    #TODO
    # Check if the test is completed
    #TODO
    # If yes, return a message indicating test completion
    #TODO
    # If no, fetch and shuffle the next batch and return it
    #TODO
    # Return the next batch of questions
    return {"message": "Test completed"}