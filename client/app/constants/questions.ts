// Get from backend
// class QuestionBatch(BaseModel):
//     batch_id: int
//     batch_number: int
//     tier: str | None
//     questions: List[Question]

// class Question(BaseModel):
//     question_id: int
//     question_text: str
//     trait_type: str
//     sub_trait: str
//     question_prompt: str

export const data = {
	batch_id: 1,
	batch_number: 5,
	tier: "free",
	questions: [
		{
			question_id: 1,
			question_text: "What do you really think of the matrix?",
			trait_type: "str",
			sub_trait: "str",
			question_prompt: "str",
		},
		{
			question_id: 2,
			question_text:
				"Can you describe a situation where you realized your initial judgment was biased or incorrect? How did you adjust your thinking?",
			trait_type: "str",
			sub_trait: "str",
			question_prompt: "str",
		},
		{
			question_id: 3,
			question_text:
				"How would you solve a problem in this period of chaos in society?",
			trait_type: "str",
			sub_trait: "str",
			question_prompt: "str",
		},
	],
};

// Send to backend
// class SubmitAnswers(BaseModel):
//     user_id: int
//     trait: str
//     answers: List[Answer]

// class Answer(BaseModel):
//     answer_id: int | None
//     user_id: int
//     question_id: int
//     answer_text: str
//     answer_score: int
//     is_copy_paste: bool | None
//     answered_in_seconds: str
//     question_prompt: str
//     justification: str | None

export const submittedData = {
	user_id: 1,
	trait: "str",
	answers: [
		{
			answer_id: 1,
			user_id: 1,
			question_id: 1,
			answer_text: "str",
			answer_score: 30,
			is_copy_paste: false,
			answered_in_seconds: "00:01:25",
			question_prompt: "str",
			justification: "str",
		},
		{
			answer_id: 2,
			user_id: 1,
			question_id: 2,
			answer_text: "str",
			answer_score: 40,
			is_copy_paste: false,
			answered_in_seconds: "00:01:25",
			question_prompt: "str",
			justification: "str",
		},
		{
			answer_id: 3,
			user_id: 1,
			question_id: 3,
			answer_text: "str",
			answer_score: 39,
			is_copy_paste: false,
			answered_in_seconds: "00:01:25",
			question_prompt: "str",
			justification: "str",
		},
	],
};

export const questions = [
	{
		id: 1,
		question:
			"Which of the following is used in React.js to increase performance?",
		choices: [
			"Virtual DOM",
			"Original DOM",
			"Both A and B",
			"None of the above",
			"Answer one with the correct phrase",
		],
		type: "MCQs",
		correctAnswer: "Virtual DOM",
	},
	{
		id: 2,
		question: "What is ReactJS?",
		choices: [
			"Server-side framework",
			"User Interface framework",
			"both a and b",
			"None of the above",
			"Answer two with the correct phrase",
		],
		type: "MCQs",
		correctAnswer: "User Interface framework",
	},
	{
		id: 3,
		question:
			"Identify the one which is used to pass data to components from outside",
		choices: [
			"Render with arguments",
			"setState",
			"PropTypes",
			"props",
			"Answer three with the correct phrase",
		],
		type: "MCQs",
		correctAnswer: "props",
	},
	{
		id: 4,
		question: "In which language is React.js written?",
		choices: [
			"Python",
			"Java",
			"C#",
			"JavaScript",
			"Answer four with the correct phrase",
		],
		type: "MCQs",
		correctAnswer: "JavaScript",
	},
	{
		id: 5,
		question: "What is Babel?",
		choices: [
			"JavaScript interpreter",
			"JavaScript transpiler",
			"JavaScript compiler",
			"None of the above",
			"Answer five with the correct phrase",
		],
		type: "MCQs",
		correctAnswer: "JavaScript compiler",
	},
];
