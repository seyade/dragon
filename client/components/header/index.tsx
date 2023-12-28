"use client";

import React, {useEffect, useState} from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { LuUser2 } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

import Navigation from "@/components/navigation";
import {router} from "next/client";

const Header = () => {
	const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
	const { user, isLoading } = useUser();
	let [returnPage, setReturnPage] = useState("");
	console.log("USER---", user);

	const toggleUserPanel = () => {
		setIsUserPanelOpen(!isUserPanelOpen);
	};

	return (
		<header className="flex justify-between items-center w-full py-4 px-8 bg-zinc-50 border-b border-b-slate-200">
			<a href="/" className="flex items-center font-extrabold text-3xl">
				Dragon<span className="text-blue-600">.</span>
			</a>

			<div className={`flex items-center ${!user && !isLoading && "w-full"}`}>
				{!user && !isLoading && <Navigation />}

				{user ? (
					<>
						<div className="relative">
							<button
								onClick={toggleUserPanel}
								className="flex items-center hover:cursor-pointer"
							>
								<p className="font-semibold mr-2">{user?.name}</p>
								{user?.picture && (
									<Image
										className="rounded-full"
										width={48}
										height={48}
										src={user?.picture}
										alt="User name"
									/>
								)}
							</button>

							{isUserPanelOpen && (
								<div className="absolute bg-slate-100 p-4 rounded-xl shadow-lg w-full">
									<Link href="/profile" className="flex items-center">
										<LuUser2 />{" "}
										<span className="font-semibold ml-1">Profile</span>
									</Link>
								</div>
							)}
						</div>

						<a
							className="flex items-center justify-center ml-4 py-2 px-4 bg-slate-700 text-white rounded-full"
							href="/api/auth/logout"
						>
							Logout
						</a>
					</>
				) : (
					<a
						className="flex items-center justify-center py-2 px-4 bg-slate-700 text-white rounded-full"
						href="/api/auth/login?returnTo=/post-login"
					>
						Login
					</a>
				)}
			</div>
		</header>
	);
};

export default Header;
