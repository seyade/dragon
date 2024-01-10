from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
class User(BaseModel):
    user_id: int
    email: EmailStr
    tier_type: str | None
    user_status: str | None
    swipe_count: int | None
    swipe_limit: int | None
    sex: str | None
    country: str | None
    auth_provider_id: str
    family_name: str | None
    given_name: str | None
    locale: str | None
class Question(BaseModel):
    question_id: int
    question_text: str
    trait_type: str | None
    sub_trait: str
    question_prompt: str
    cheated: bool | None

class Answer(BaseModel):
    answer_id: int | None
    question_id: int
    answer_text: str
    answer_score: int | None
    is_copy_paste: bool | None
    answered_in_seconds: str
    question_prompt: str
    justification: str | None


class StartTestRequest(BaseModel):
    user_id: int

class QuestionBatch(BaseModel):
    batch_id: int
    question_ids: List[int]
    tier: str | None
    questions: List[Question] | None = []   # Define the Question model based on your needs

class SubmitAnswers(BaseModel):
    user_id: int
    trait: str
    answers: List[Answer]
class UserSession(BaseModel):
    session_id: int
    user_id: int

    # start_time: datetime | None
    # end_time: datetime | None
    # batch_ids: List[int] = []
    finished_batches: List[int]
    amount_of_batches_left: int
    remaining_batches: List[int]

class BatchPackage(BaseModel):
    package_id: int
    batch_ids: List[int]
    tier_type: str # Define the Question model based on your needs