"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useUser } from "@auth0/nextjs-auth0/client";

// icons
import { GoHome, GoPeople, GoProject } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsChatSquare } from "react-icons/bs";

import "./dashboard.css";
import Link from "next/link";

const Dashboard = () => {
	const container = useRef<HTMLDivElement>(null);
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
		<div ref={container} className="grid grid-cols-12 gap-4 h-full w-full p-4">
			<aside className="col-span-1 w-1/2 flex flex-col items-center bg-slate-900 text-white p-2 rounded-3xl text-3xl">
				<ul className="py-5">
					<li className="mb-8">
						<Link href={"/"}>
							<GoHome />
						</Link>
					</li>
					<li className="mb-8">
						<LuLayoutDashboard />
					</li>
					<li className="mb-8">
						<Link href={"/"}>
							<GoPeople />
						</Link>
					</li>
					<li className="mb-8">
						<Link href={"/"}>
							<GoProject />
						</Link>
					</li>
					<li className="mb-8">
						<Link href={"/"}>
							<BsChatSquare />
						</Link>
					</li>
				</ul>
			</aside>
			<main className="col-span-11">
				<header>
					<h1 className="page-title font-bold text-2xl">{user?.name}</h1>
					<h2
						className="page-title font-extrabold text-5xl"
						style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
					>
						Welcome to the Dashboard
					</h2>
				</header>

				<section>
					<h3>Dashboard content</h3>
				</section>
			</main>
		</div>
	);
};

export default Dashboard;
