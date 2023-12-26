"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useUser } from "@auth0/nextjs-auth0/client";

import "./dashboard.css";

const Dashboard = () => {
	const container = useRef<HTMLElement>(null);
	const { user, error, isLoading } = useUser();

	useGSAP(
		() => {
			console.log("LOADED 2");

			if (!isLoading) {
				const text = new SplitType(".page-title", { types: "chars" });

				gsap.to(".char", {
					stagger: 0.05,
					opacity: 1,
					delay: 0.2,
					duration: 0.1,
					y: 0,
				});
			}
		},
		{ scope: container, dependencies: [isLoading] }
	);

	if (isLoading)
		return (
			<div className="h-screen grid place-content-center">
				<h1 className="font-extrabold text-4xl">Loading...</h1>
			</div>
		);

	if (error)
		return (
			<div className="h-screen flex justify-center items-center text-center">
				<h1 className="font-bold text-red-600 text-xl">
					Oops! We&rsquo;ll fix this one, bear with us.
					<span className="block font-semibold">{error?.message}</span>
				</h1>
			</div>
		);

	return (
		<div className="container w-full mx-auto p-10">
			<header>
				<h1 className="font-bold text-2xl">Dashboard</h1>
			</header>
			<main ref={container} className="flex w-full justify-center items-center">
				<h2
					className="page-title font-extrabold text-7xl"
					style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
				>
					Welcome to the Dashboard
				</h2>
			</main>
		</div>
	);
};

export default Dashboard;
