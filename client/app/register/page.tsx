'use client'
import React, {ChangeEvent, FormEvent, useState} from "react";

const Register = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		sex: '',
		age: '',
		country: '',
		agreeToTerms: false,
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
	};

	const handleSubmit = async ( e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.agreeToTerms) {
			alert("You must agree to the terms.");
			return;
		}
		try {
			const response = await fetch('YOUR_API_ENDPOINT', {
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
			// Handle success (redirect, show message, etc.)
		} catch (error) {
			console.error("Error during API call", error);
			// Handle error (show error message, etc.)
		}
	};

	return (
		<div className="w-full p-8">
			<main className="flex flex-col items-center justify-between p-24">
				<h1 className="font-bold text-4xl text-indigo-900 mb-8">Register</h1>
				<form onSubmit={handleSubmit} className="w-full max-w-xs">
					<input
						type="text"
						name="fullName"
						placeholder="Full Name"
						value={formData.fullName}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full"
					/>
					<select
						name="sex"
						value={formData.sex}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full">
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
						className="mb-4 p-2 w-full"
					/>
					<select
						name="country"
						value={formData.country}
						onChange={handleInputChange}
						className="mb-4 p-2 w-full">
						<option value="">Select Country</option>
						{/* Replace with your country list */}
						<option value="USA">United States</option>
						<option value="UK">United Kingdom</option>
						<option value="Canada">Canada</option>
						{/* Add other countries as needed */}
					</select>
					<label className="flex items-center">
						<input
							type="checkbox"
							name="agreeToTerms"
							checked={formData.agreeToTerms}
							onChange={handleInputChange}
							className="mr-2"
						/>
						Agree to terms and conditions
					</label>
					<button type="submit" className="bg-indigo-500 text-white p-2 w-full mt-4">Register</button>
				</form>
			</main>
		</div>
	);
};

export default Register;
