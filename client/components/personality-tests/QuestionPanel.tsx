"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import moment from "moment";
import { LuClock5 } from "react-icons/lu";
import { formatToTime } from "@/utils/formatToTime";

type Question = {
	question_id: number;
	question_text: string;
	trait_type: string;
	sub_trait: string;
	question_prompt: string;
};

type QuestionPros = {
	questions: {
		batch_id: number;
		batch_number: number;
		tier: "free" | "premium" | "top-tier" | string;
		questions: Question[];
	};
};

type Answer = {
	answer_id: number;
	user_id: number;
	question_id: number;
	answer_text: string;
	answer_score: number;
	is_copy_paste: boolean;
	answered_in_seconds: string;
	question_prompt: string;
	justification: string;
};

const QuestionPanel = ({ questions: quiz }: QuestionPros) => {
	const [time, setTime] = useState(0);
	const [timestamp, setTimestamp] = useState<string[]>([]);
	const timer: any = useRef();
	const [running, setRunning] = useState(true);
	const [startTime, setStartTime] = useState("00:00:00");
	const [endTime, setEndTime] = useState("");

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answer, setAnswer] = useState({
		answer_id: 0,
		user_id: 1,
		question_id: 0,
		answer_text: "",
		answer_score: 0,
		is_copy_paste: false,
		answered_in_seconds: "",
		question_prompt: "",
		justification: "",
	});
	const [answers, setAnswers] = useState<Answer[]>([]);

	const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setAnswer({
			answer_id: quiz.questions[currentQuestion].question_id,
			user_id: 1,
			question_id: quiz.questions[currentQuestion].question_id,
			answer_text: event?.target.value,
			answer_score: 0,
			is_copy_paste: false,
			answered_in_seconds: `${formatToTime(time)}`,
			question_prompt: "",
			justification: "",
		});
	};

	const onHandleNext = () => {
		if (currentQuestion <= quiz.questions.length - 1) {
			getTimestamp();
			setAnswers(prev => [...prev, answer]);
			setAnswer({ ...answer, answer_text: "" });
		}

		setCurrentQuestion(currentQuestion + 1);
	};

	const onHandleSubmit = () => {
		// TODO:  send this to backend API via REST or GraphQL
		console.log({ user_id: 1, trait: "str", answers });
	};

	function getTimestamp() {
		const stamp: string = moment(formatToTime(time), "HH:mm:ss").format(
			"HH:mm:ss"
		);
		const format = "HH:mm:ss";
		const stampTime: any = moment(stamp, format).valueOf();

		setTimestamp([stampTime, ...timestamp]);
	}

	useEffect(() => {
		if (running) {
			timer.current = setInterval(() => {
				setTime(prev => prev + 1);
			}, 1000);
		}

		return () => clearInterval(timer.current);
	}, [running]);

	return (
		<section className="w-[756px] bg-white rounded-lg p-10 border">
			<header className="flex justify-between items-center w-full mb-10">
				<h1 className="font-extralight text-3xl">Personality Test</h1>
				<span className="flex items-center">
					<span className="text-2xl">
						<LuClock5 />
					</span>
					<div className="flex flex-col ml-2 text-left leading-none">
						<p className="text-xs text-slate-400 font-semibold">Time spent</p>
						<p className="font-bold">{formatToTime(time)}</p>
					</div>
				</span>
			</header>

			{currentQuestion < quiz.questions.length && (
				<article>
					<h2 className="mb-3 font-semibold text-slate-400">
						<span className="text-3xl text-slate-800 font-bold">
							{currentQuestion + 1}
						</span>{" "}
						/ {quiz.questions.length}
					</h2>
					<h3 className="font-bold text-xl mb-10">
						{quiz.questions[currentQuestion].question_text}
					</h3>

					<textarea
						className="py-1 px-3 border rounded-lg w-full mb-4 resize-none"
						name="q01"
						id=""
						cols={30}
						rows={7}
						onChange={onHandleChange}
						value={answer.answer_text}
					/>
					<div>
						<button
							disabled={answer.answer_text === ""}
							onClick={onHandleNext}
							className="bg-black text-white rounded-lg px-4 py-2 disabled:bg-slate-400"
						>
							Next
						</button>
					</div>
				</article>
			)}
			{currentQuestion === quiz.questions.length && (
				<article>
					<h3 className="font-bold text-xl mb-3">Summary</h3>

					{answers.length && (
						<div className="m mb-7">
							{answers.map((ans, index) => {
								return <p key={ans?.answer_text}>{ans.answer_text}</p>;
							})}
						</div>
					)}

					<div>
						<button
							onClick={onHandleSubmit}
							className="bg-black text-white rounded-lg px-4 py-2"
						>
							Submit
						</button>
					</div>
				</article>
			)}
		</section>
	);
};

export default QuestionPanel;
