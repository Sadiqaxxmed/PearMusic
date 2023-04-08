import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "Menu" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="Menu-Btn-Wrap">
          <i class="fa-solid fa-bars" id='burger' onClick={openMenu}/>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className='Menu-Buttons'>
            <div className='Menu-Welcome'>&nbsp;&nbsp;Welcome {user.username}!</div>
              {/* <div>{user.email}</div> */}
              
                <div className="Menu-Manage-Disc-Btn"> Manage Discography 
                  <i class="fa-solid fa-record-vinyl" id='vinyl'/> 
                </div>

                <div className="Menu-Upload-Btn">Upload Album
                  <i class="fa-solid fa-cloud-arrow-up" id='upload'/>
                </div>

                <div className='Menu-LogOut-Btn' onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            
          </>
        ) : (
          <>
            <div className='Menu-Welcome'>&nbsp;&nbsp;Welcome!</div>
            <div className="Menu-LogIn-Wrapper">
              {/* NEED TO PROBABLY IMPLEMENT ISLOADED */}
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <i class="fa-solid fa-right-to-bracket" id='Login-Icon'></i>
            </div>
            <div className="Menu-SignUp-Wrapper">
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <i class="fa-solid fa-user-plus" id='SignUp-Icon'></i>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
