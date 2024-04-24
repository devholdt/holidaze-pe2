"use client";

import { useState } from "react";
import Button from "./button";

export default function RegistrationForm() {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<form>
			<div className="mb-4">
				<label className="text-dark" htmlFor="name">
					Name
				</label>
				<div className="relative">
					<input
						className="bg-background py-3 px-4 w-full rounded outline-green placeholder:text-grey"
						id="name"
						type="name"
						name="name"
						placeholder="Enter name"
						required
					/>
				</div>
			</div>
			<div className="mb-4">
				<label className="text-dark" htmlFor="email">
					Email
				</label>
				<div className="relative">
					<input
						className="bg-background py-3 px-4 w-full rounded outline-green placeholder:text-grey"
						id="email"
						type="email"
						name="email"
						placeholder="Enter email"
						required
					/>
				</div>
			</div>
			<div className="mb-4">
				<label className="text-dark" htmlFor="password">
					Password
				</label>
				<div className="relative">
					<input
						className="bg-background py-3 px-4 w-full rounded outline-green placeholder:text-grey"
						id="password"
						type="password"
						name="password"
						placeholder="Enter password"
						required
						minLength={6}
					/>
				</div>
			</div>
			<div className="checkbox-wrapper mb-4">
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={handleChange}
						className={isChecked ? "checked" : ""}
					/>
					<span className="ms-1">Register as Venue Manager</span>
				</label>
			</div>
			<Button text="Create account" styles="bg-green text-white w-full" />
		</form>
	);
}