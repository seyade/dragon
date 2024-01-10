from typing import List

from db import db
from app.routers.personality_test.models import  QuestionBatch, User, SubmitAnswers, UserSession, BatchPackage
from app.routers.personality_test.judge import judge
import random
from datetime import datetime

async def get_user_data(user_id: int):
    query = f"users?user_id=eq.{user_id}"

    db_response = await db(path = query, method = "get")
    return User(**db_response.json()[0])

async def get_first_question_batch(user_id):
    # Fetch and shuffle the first batch of questions
    print("2 we're in it")

    user: User = await get_user_data(user_id)
    # question_batch: QuestionBatch = await get_question_batch(user.tier_type, 1, user_id)
    question_batch = await get_question_batch(user.tier_type, user_id)

    return question_batch



async def get_question_batch(user_tier: str, user_id):

    query_to_get_session = f"user_test_sessions?user_id=eq.{user_id}&order=session_id.desc&limit=1"
    session_response = await db(path=query_to_get_session, method="get")
    #IF session_response = 404, then it's a new user, so we need to create a new session.
    print(session_response)

    session_response = session_response.json()

    print(session_response)
    if session_response == []:
        print(query_to_get_session)
        questions_first_time = await get_question_batch_for_first_time(user_tier, user_id)
        return questions_first_time

    user_session = UserSession(**session_response[0])

    if user_session.amount_of_batches_left == 0:
        return {"test_status": "completed"}
    remaining_batches = user_session.remaining_batches
    finished_batches = user_session.finished_batches
    print(remaining_batches)
    print(finished_batches)
    random_batch_id = remaining_batches[0]
    query_to_get_random_batch = f"question_batches?batch_id=eq.{random_batch_id}"

    get_random_batch_response = await db(path=query_to_get_random_batch, method="get")
    random_question_batch = QuestionBatch(**get_random_batch_response.json()[0])
    question_ids = random_question_batch.question_ids

    get_questions_from_cached_batches = await db(path=f"cached_batches_with_questions?batch_id=eq.{random_question_batch.batch_id}", method="get")
    print(get_questions_from_cached_batches)
    get_questions_from_cached_batches = get_questions_from_cached_batches.json()
    if get_questions_from_cached_batches == []:
        for question_id in question_ids:
            query_to_get_question = f"questions?question_id=eq.{question_id}"
            get_question_response = await db(path=query_to_get_question, method="get")
            question = get_question_response.json()[0]
            get_questions_from_cached_batches.questions.append(question)

        cached_batch = await db(path="cached_batches_with_questions", data=random_question_batch.dict(), method="post")
    remaining_batches.remove(random_batch_id)

    # Append the random_batch_id to the finished_batches list
    finished_batches.append(random_batch_id)
    data = {
        "remaining_batches": remaining_batches,
        "amount_of_batches_left": user_session.amount_of_batches_left - 1,
        "finished_batches": finished_batches,
    }

    patch_user_session = await db(path = f"user_test_sessions?session_id=eq.{user_session.session_id}", data = data, method = "patch")
    return get_questions_from_cached_batches
async def check_answers(answers: SubmitAnswers):
    #TODO

    scores = await judge(answers)


    return {"message": "Test completed"}


async def get_question_batch_for_first_time(user_tier, user_id):
    query_to_get_package = f"batch_package?tier_type=eq.{user_tier}&limit=1"
    batch_package_db_response = await db(path=query_to_get_package, method="get")
    package = BatchPackage(**batch_package_db_response.json()[0])

    random_batch_id = random.choice(package.batch_ids)

    query_to_get_random_batch = f"question_batches?batch_id=eq.{random_batch_id}"
    get_random_batch_response = await db(path=query_to_get_random_batch, method="get")
    random_question_batch = QuestionBatch(**get_random_batch_response.json()[0])
    question_ids = random_question_batch.question_ids

    get_questions_from_cached_batches = await db(path=f"cached_batches_with_questions?batch_id=eq.{random_question_batch.batch_id}", method="get")

    get_questions_from_cached_batches = get_questions_from_cached_batches.json()
    if get_questions_from_cached_batches == []:
        for question_id in question_ids:
            query_to_get_question = f"questions?question_id=eq.{question_id}"
            get_question_response = await db(path=query_to_get_question, method="get")
            question = get_question_response.json()[0]
            get_questions_from_cached_batches.questions.append(question)

        cached_batch = await db(path="cached_batches_with_questions", data=random_question_batch.dict(), method="post")
    amount_of_batches_left = len(package.batch_ids) - 1
    batch_ids = package.batch_ids
    # TODO Save that the user is in it's first batch.
    batch_ids.remove(random_batch_id)

    data = {
        "user_id": user_id,
        "finished_batches": [random_batch_id],
        "remaining_batches": batch_ids,
        "amount_of_batches_left": amount_of_batches_left
    }

    post_user_session = await db(path="user_test_sessions", data=data, method="post")

    return get_questions_from_cached_batches[0]
