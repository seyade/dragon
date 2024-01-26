import Image from "next/image";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
	return (
		<div className="w-full p-8">
			<main className="flex flex-col items-center justify-between p-24">
				<h1 className="font-bold text-4xl text-indigo-900 mb-8">
					Choose your Co-founders wisely
				</h1>
				<a
					className="flex items-center justify-center py-3 px-5 bg-slate-700 text-white rounded-full text-xl"
					href="/api/auth/login?returnTo=/dashboard"
				>
					Get started
				</a>
			</main>
		</div>
	);
}
