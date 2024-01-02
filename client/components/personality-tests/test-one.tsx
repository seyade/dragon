"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuClock5 } from "react-icons/lu";

const TestOne = () => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(true);
	const [timestamp, setTimeStamp] = useState([]);
	const timer: any = useRef();

	function getTimestamp() {
		// TODO: get the time between the user onFocus and when he leave Focus
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

	function format(time: number) {
		let hours: string | number = Math.floor((time / 60 / 60) % 24);
		let minutes: string | number = Math.floor((time / 60) % 60);
		let seconds: string | number = Math.floor(time % 60);

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		return `${hours} : ${minutes} : ${seconds}`;
	}

	return (
		<section className="w-[756px] bg-white rounded-lg p-10 border">
			<header className="flex justify-between items-center w-full mb-10">
				<h1 className="font-bold text-3xl">Personality Test</h1>
				<span className="flex items-center">
					<span className="text-2xl">
						<LuClock5 />
					</span>
					<div className="flex flex-col ml-2 text-left leading-none">
						<p className="text-xs text-slate-400 font-semibold">Time spent</p>
						<p className="font-bold">{format(time)}</p>
					</div>
				</span>
			</header>

			<article>
				<h2>Question 1 of 40</h2>
				<h3 className="font-bold text-xl mb-10">
					Can you describe a situation where you realized your initial judgment
					was biased or incorrect? How did you adjust your thinking?
				</h3>

				<textarea
					className="border rounded-lg w-full mb-4 resize-none"
					name="q01"
					id=""
					cols={30}
					rows={10}
					onFocus={getTimestamp}
				/>
				<div>
					<button className="bg-black text-white rounded-lg px-4 py-2">
						Next
					</button>
				</div>
			</article>
		</section>
	);
};

export default TestOne;
