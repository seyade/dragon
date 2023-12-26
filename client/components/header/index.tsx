"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const Header = () => {
	const { user } = useUser();

	return (
		<header className="flex justify-between items-center w-full py-4 px-8 border bg-zinc-200">
			<a href="/" className="flex items-center font-extrabold text-3xl">
				Dragon<span className="text-blue-600">.</span>
			</a>

			<div className={`flex items-center ${!user && "w-full"}`}>
				{!user && (
					<ul className="flex mx-auto font-semibold text-indigo-900">
						<li className="mx-5">
							<a href="/pricing">Pricing</a>
						</li>
						<li className="mx-5">
							<a href="/about">About us</a>
						</li>
						<li className="mx-5">
							<a href="/contact">Contact us</a>
						</li>
					</ul>
				)}

				{user ? (
					<>
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

						{console.log("USER---", user)}

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
						href="/api/auth/login?returnTo=/dashboard"
					>
						Login
					</a>
				)}
			</div>
		</header>
	);
};

export default Header;
