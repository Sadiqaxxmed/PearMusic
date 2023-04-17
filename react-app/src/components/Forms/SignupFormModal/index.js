import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let err = {}

		if (email.length >= 45) err.email = "Email must be less than 45 characters";

		if (username.length < 4) err.username = "Username must be at least 4 characters";
		if (username.length >= 12) err.maxUsername = "Username must be less than 12 characters";

		if (password.length >= 20) err.maxPassword = "Password must be less than 20 characters";
		if (password.length < 6) err.password = "Password must be at least 6 characters";
		if (password !== confirmPassword) err.match = "Passwords must match";

		if (Object.values(err).length) return setErrors(err);

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				let dataErr = {};
				if (data.some(err => err.includes('username'))) dataErr.username = "Username is already in use"
				if (data.some(err => err.includes('email'))) dataErr.email = "Email address is already in use"
				setErrors(dataErr);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const [showModal, setShowModal] = useState(true);

	const handleCloseModal = () => {
		setShowModal(false); // Set the state to close the modal
	}

	return (
		<>
		{showModal && (
		<div className="SignUp-Wrapper">
			<i className="fa-solid fa-xmark" onClick={() => handleCloseModal()}id='x'/>
			<h1 className="SignUp-Title">Sign Up</h1>
			<form className='SignUp-Form' onSubmit={handleSubmit}>
				<div className="SignUp-Errors">
					{Object.values(errors).map((error, idx) => (
						<p className='SignUp-Error' key={idx}>{`* ${error}`}</p>
					))}
				</div>
				<label className="SignUp-Form-Top-Text">
					Email:
					<input
						id='form-input'
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="SignUp-Form-Top-Text">
					Username:
					<input
						id='form-input'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="SignUp-Form-Top-Text">
					Password:
					<input
						id='form-input'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="SignUp-Form-Top-Text">
					Confirm Password:
					<input
						id='form-input'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<div className="SignUp-Buttons-Div">
					<button className='SignUp-Button' type="submit">Sign Up</button>
				</div>
			</form>
		</div>
		)}
		</>
	);
}

export default SignupFormModal;
