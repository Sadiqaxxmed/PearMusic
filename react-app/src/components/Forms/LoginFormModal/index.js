import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBtn, setLoginBtn] = useState("LogIn-Button-disabled")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (email.length >= 4 && password.length >= 6) {
      setLoginBtn('LogIn-Button-enabled');
    } else {
      setLoginBtn('LogIn-Button-disabled');
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // * Data is null if the user doesn't exist
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors({ message: "Username or password is invalid" });
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

  const isDisabled = () => {
    if (email.length < 4 || password.length < 6) {
      console.log('im here')
      return true;
    };
    return false;
  }

  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  }
  return (
    <>
      {showModal && (
        <div className="LogIn-Wrapper">
          <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x' />
          <h1 className="LogIn-Title">Login</h1>
          <form className='LogIn-Form' onSubmit={handleSubmit}>
            {<p style={{color:'red'}}>- {errors.message}</p>}
            <label className="LogIn-Form-Top-Text">
              Email:
              <input
                id='form-input'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="LogIn-Form-Top-Text">
              Password:
              <input
                id='form-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className={loginBtn} type="submit" disabled={isDisabled()}>Log In</button>
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
