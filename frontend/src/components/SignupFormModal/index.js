import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
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
			<i class="fa-solid fa-xmark" onClick={() => handleCloseModal()}id='x'/>
			<h1 className="SignUp-Title">Sign Up</h1>
			<form className='SignUp-Form' onSubmit={handleSubmit}>
				<div className="SignUp-Errors">
					{errors.map((error, idx) => (
						<p className='SignUp-Error' key={idx}>{error}</p>
					))}
				</div>
				<label className="SignUp-Form-Top-Text">
					Email:
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="SignUp-Form-Top-Text">
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="SignUp-Form-Top-Text">
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="SignUp-Form-Top-Text">
					Confirm Password:
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<div className='SignUp-Button' type="submit">Sign Up</div>
				<div className="SignUp-Demo-Btn">Demo User</div>
			</form>
		</div>
		)}
		</>
	);
}

export default SignupFormModal;