import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Forms/LoginFormModal";
import SignupFormModal from "../Forms/SignupFormModal";
import SongForm from '../Forms/SongForm'
import AlbumForm from '../Forms/AlbumForm'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    return history.push('/browse');
  };

  const ulClassName = "Menu" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="Menu-Btn-Wrap">
        <i className="fa-solid fa-bars" id='burger' onClick={openMenu} />
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='Menu-Buttons'>
              <div className='Menu-Welcome'>&nbsp;&nbsp;Welcome {user.username}!</div>
              {/* <div>{user.email}</div> */}
              <NavLink to='/manage-discography' style={{ textDecoration: 'none' }} className="Menu-Manage-Disc-Btn">&nbsp;Manage Discography
                <i className="fa-solid fa-record-vinyl" id='vinyl' />
              </NavLink>
              <div className="Menu-Upload-Btn">
                <OpenModalButton
                  buttonText="Upload Album"
                  onItemClick={closeMenu}
                  modalComponent={<AlbumForm />}
                />
                <span className="material-symbols-outlined" id='upload-album'>
                  library_music
                </span>
              </div>

              <div className="Menu-Upload-Btn">
                <OpenModalButton
                  buttonText="Upload Song"
                  onItemClick={closeMenu}
                  modalComponent={<SongForm />}
                />
                <i className="fa-solid fa-music" id='upload-song'></i>
              </div>

              <div className='Menu-LogOut-Btn' onClick={handleLogout}>
                &nbsp;Log Out
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
              <i className="fa-solid fa-right-to-bracket" id='Login-Icon'></i>
            </div>
            <div className="Menu-SignUp-Wrapper">
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <i className="fa-solid fa-user-plus" id='SignUp-Icon'></i>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
