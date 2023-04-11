import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const [showModal, setShowModal] = useState(true);

	const handleCloseModal = () => {
		setShowModal(false); // Set the state to close the modal
	}

  return (
    <>
      {showModal && (
      <div className="LogIn-Wrapper">
        <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x'/>
        <h1 className="LogIn-Title">Login</h1>
        <form className='LogIn-Form' onSubmit={handleSubmit}>
          <div>
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
          <label className="LogIn-Form-Top-Text">
            Email:
            <input
              id='form-input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="LogIn-Form-Top-Text">
            Password:
            <input
              id='form-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='LogIn-Button' type="submit">Log In</button>
          <div className="SignUp-Demo-Btn">Demo User</div>
        </form>
      </div>
		)}
    </>
  );
}

export default LoginFormModal;
