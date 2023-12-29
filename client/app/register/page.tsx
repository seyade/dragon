'use client'
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';


const Register = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		fullName: '',
		sex: '',
		age: '',
		country: '',
		agreeToTerms: false,
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.agreeToTerms) {
			alert("You must agree to the terms.");
			return;
		}
		try {
			const response = await fetch('http://127.0.0.1:8000/registration/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			console.log(data);
			router.push('/pricing')
			// Handle success (redirect, show message, etc.)
		} catch (error) {
			console.error("Error during API call", error);
			// Handle error (show error message, etc.)
		}
	};

	return (
		<div className="w-full p-8">
			<main className="flex flex-col items-center justify-between p-24 bg-white shadow-lg rounded-lg border border-gray-200">
				<h1 className="font-bold text-4xl text-indigo-900 mb-8">Register</h1>
				<form onSubmit={handleSubmit} className="w-full max-w-xs">
					<input
						type="text"
						name="fullName"
						placeholder="Full Name"
						value={formData.fullName}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 transition duration-300"
					/>
					<select
						name="sex"
						value={formData.sex}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 transition duration-300">
						<option value="">Select Sex</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
					<input
						type="number"
						name="age"
						placeholder="Age"
						value={formData.age}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 transition duration-300"
					/>
					<select
						name="country"
						value={formData.country}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full border-b-2 border-gray-300 focus:border-indigo-500 transition duration-300">
						<option value="">Select Country</option>
						<option value="USA">United States</option>
						<option value="UK">United Kingdom</option>
						<option value="Canada">Canada</option>
						{/* Add other countries as needed */}
					</select>
					<label className="flex items-center mb-4">
						<input
							type="checkbox"
							name="agreeToTerms"
							checked={formData.agreeToTerms}
							onChange={handleInputChange}
							className="mr-2"
						/>
						Agree to terms and conditions
					</label>
					<button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 w-full mt-4 transition duration-300">Register</button>
				</form>
			</main>
		</div>
	);
};

export default Register;
