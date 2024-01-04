from fastapi import FastAPI, HTTPException
from functions import get_first_question_batch, check_answers
app = FastAPI()
from models import Question, StartTestRequest, QuestionBatch, Answer

# Models for request and response


@app.post("/start-test")
async def start_test(request: StartTestRequest):
    # get user data from db
    first_batch = get_first_question_batch(request)
    return QuestionBatch(questions=first_batch)

@app.post("/submit-answers/")
async def submit_answers(answer: Answer):
    # Score each answer and update the database

    response = check_answers(answer)
    # Check if more batches are required
    # If yes, fetch and shuffle the next batch and return it
    # If no, return a message indicating test completion
    return QuestionBatch(questions=next_batch) or {"message": "Test completed"}

@app.post("/complete-test")
async def complete_test(request: StartTestRequest):
    # Mark the test as complete for the user
    # Perform any final calculations or cleanup
    return {"message": "Test successfully completed"}
