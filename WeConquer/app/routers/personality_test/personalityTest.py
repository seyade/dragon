from fastapi import  HTTPException, APIRouter, Request
from app.routers.personality_test.models import Question, StartTestRequest, QuestionBatch, SubmitAnswers
from app.routers.personality_test.functions import get_first_question_batch, check_answers
from app.routers.personality_test.judge import judge, testIt

personality_test_router = APIRouter()

@personality_test_router.post("/test")
async def test(request: Request):
    It = await testIt()
    return {"message": "Test successfully completed"}
@personality_test_router.post("/start-test")
async def start_test(request: Request):
    first_batch = await get_first_question_batch((await request.json())['user_id'])
    return first_batch

    # return QuestionBatch(questions=first_batch)
@personality_test_router.post("/submit-answers/")
async def submit_answers(answer: SubmitAnswers):
    # Score each answer and update the database
    response = check_answers(answer)

    return {"message": "Test completed"}

@personality_test_router.post("/complete-test")
async def complete_test(request: StartTestRequest):
    # Mark the test as complete for the user
    # Perform any final calculations or cleanup
    return {"message": "Test successfully completed"}
