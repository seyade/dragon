import React from "react";

const Navigation = () => {
	return (
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
	);
};

export default Navigation;
