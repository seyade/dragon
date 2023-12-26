import Image from "next/image";

export default function Home() {
	return (
		<div className="w-full p-8">
			<header className="app-header flex justify-between items-center w-full">
				<a href="/" className="flex items-center font-extrabold text-3xl">
					Dragon<span className="text-blue-600">.</span>
				</a>
				<nav className="flex w-full items-center">
					<ul className="flex mx-auto font-semibold text-indigo-900">
						<li className="mx-5">
							<a href="/">Pricing</a>
						</li>
						<li className="mx-5">
							<a href="/">About us</a>
						</li>
						<li className="mx-5">
							<a href="/">Contact us</a>
						</li>
					</ul>
					<div>
						<a
							className="flex items-center justify-center py-2 px-4 bg-slate-700 text-white rounded-full"
							href="/api/auth/login"
						>
							Login
						</a>
					</div>
				</nav>
			</header>

			<main className="flex flex-col items-center justify-between p-24">
				<h1 className="font-bold text-4xl text-indigo-900 mb-8">
					Choose your Co-founders wisely
				</h1>
				<a
					className="flex items-center justify-center py-3 px-5 bg-slate-700 text-white rounded-full text-xl"
					href="/api/auth/login"
				>
					Get started
				</a>
			</main>
		</div>
	);
}
