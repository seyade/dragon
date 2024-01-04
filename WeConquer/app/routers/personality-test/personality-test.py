from typing import List

from fastapi import FastAPI, HTTPException
from functions import get_first_question_batch, check_answers
from models import Question, StartTestRequest, QuestionBatch, SubmitAnswers

# Models for request and response

personality_test_router = FastAPI()

@personality_test_router.post("/start-test")
async def start_test(request: StartTestRequest):
    # get user data from db
    first_batch = get_first_question_batch(request)
    return QuestionBatch(questions=first_batch)

@personality_test_router.post("/submit-answers/")
async def submit_answers(answer: SubmitAnswers):
    # Score each answer and update the database
    response = check_answers(answer)
    # Check if more batches are required
    # If yes, fetch and shuffle the next batch and return it
    # If no, return a message indicating test completion
    return QuestionBatch(questions=next_batch) or {"message": "Test completed"}

@personality_test_router.post("/complete-test")
async def complete_test(request: StartTestRequest):
    # Mark the test as complete for the user
    # Perform any final calculations or cleanup
    return {"message": "Test successfully completed"}
