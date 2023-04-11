import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email.length)
    let err = {};
    if (email.length > 1) err.email = 'Please provide a valid email';
    if (password.length < 5) err.password = 'Password must be atleast 5 characters';
    if (Object.values(err)) return setErrors(err);

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const loginDemoUser = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    setTimeout(() => {
      dispatch(login('demo@aa.io', 'password'))
      closeModal()
    }, 750)
  }

  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false); // Set the state to close the modal
  }
  console.log(errors)
  return (
    <>
      {showModal && (
        <div className="LogIn-Wrapper">
          <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x' />
          <h1 className="LogIn-Title">Login</h1>
          <form className='LogIn-Form' onSubmit={handleSubmit}>
            {<p>{errors.email}</p>}
            <label className="LogIn-Form-Top-Text">
              Email:
              <input
                id='form-input'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {<p>{errors.email}</p>}
            <label className="LogIn-Form-Top-Text">
              Password:
              <input
                id='form-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className='LogIn-Button' type="submit">Log In</button>
            <div className="SignUp-Demo-Btn" onClick={() => loginDemoUser()}>
              <p>Demo User</p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginFormModal;
