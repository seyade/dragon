"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { LuClock5 } from "react-icons/lu";

import { questions } from "@/app/constants/questions";

const TestTwo = () => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(true);
	const [timestamp, setTimestamp] = useState<string[]>([]);
	const timer: any = useRef();

	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();

	function getTimestamp() {
		const stamp: string = moment(formatToTime(time), "HH:mm:ss").format(
			"HH:mm:ss"
		);
		const format = "HH:mm:ss";
		const stampTime: any = moment(stamp, format).valueOf();

		setTimestamp([stampTime, ...timestamp]);
	}

	function stopWatch() {
		if (running) clearInterval(timer.current);
		setRunning(!running);
	}

	function restartWatch() {
		setTime(0);
	}

	useEffect(() => {
		if (running) {
			timer.current = setInterval(() => {
				setTime(prev => prev + 1);
			}, 1000);
		}

		return () => clearInterval(timer.current);
	}, [running]);

	function formatToTime(time: number) {
		let hours: string | number = Math.floor((time / 60 / 60) % 24);
		let minutes: string | number = Math.floor((time / 60) % 60);
		let seconds: string | number = Math.floor(time % 60);

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		return `${hours} : ${minutes} : ${seconds}`;
	}

	const [answerSelected, setAnswerSelected] = useState(false);
	const [answerIndex, setAnswerIndex] = useState<number | null>(null);

	function onAnswerSelected(index: number) {
		console.log("ANSW:", questions[0].choices[index]);

		setAnswerIndex(index);
	}

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

			<article>
				<h2 className="font-semibold text-slate-400">Question 1 / 5</h2>
				<h3 className="font-normal text-xl mb-10">
					Can you describe a situation where you realized your initial judgment
					was biased or incorrect? How did you adjust your thinking?
				</h3>

				<div className="mb-8">
					<p className="mb-6 font-bold text-slate-500">
						You can select more than 1 option.
					</p>
					<ul className="grid grid-cols-2 gap-2">
						{questions[0].choices.map((choice, index) => {
							return (
								<li
									key={choice}
									onClick={() => onAnswerSelected(index)}
									className={`flex p-2 rounded items-center cursor-pointer transition duration-300 relative font-semibold ${
										answerIndex === index
											? "bg-slate-700 text-white"
											: "bg-slate-100 hover:bg-slate-200"
									}`}
								>
									<label htmlFor={`q1_answer_${index}`} className="relative">
										<input
											type="radio"
											id="answer_one"
											className="mr-3 hidden"
											name={`q1_answer_${index}`}
											checked={answerIndex === index}
											onChange={() => onAnswerSelected(index)}
										/>
										<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 scale-0 transition-transform duration-300">
											{answerIndex === index && (
												<div className="w-full h-full bg-gray-800 rounded-full opacity-100 transform scale-100 transition-transform duration-300"></div>
											)}
										</div>
										{choice}
									</label>
								</li>
							);
						})}
					</ul>
				</div>

				<div>
					<button className="bg-black text-white rounded-lg px-4 py-2">
						Next
					</button>
				</div>
			</article>
		</section>
	);
};

export default TestTwo;
