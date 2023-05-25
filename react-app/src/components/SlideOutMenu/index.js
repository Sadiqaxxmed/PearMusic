import React, { useEffect, useRef, useState } from 'react';
import './SlideOutMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SongForm from '../Forms/SongForm'
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const SlideOutMenu = () => {
    const ulRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
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

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const closeMenu = () => setShowMenu(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        return history.push('/browse');
    };


    return (
        <div>
            <div className={`fa-solid fa-gear ${showMenu ? 'open' : ''}`} onClick={toggleMenu}>
                {/* <div className="slide-out-menu-bar"></div>
                <div className="slide-out-menu-bar"></div>
                <div className="slide-out-menu-bar"></div> */}
            </div>
            <div className={`slide-out-menu-container ${showMenu ? 'open' : ''}`} ref={ulRef}>
                {user ?
                    <ul className='SOM-Loggedin'>
                        <p className='SOM-Welcome'>{`Welcome ${user?.username}`}</p>

                        <OpenModalMenuItem
                            itemText="Upload Song"
                            onItemClick={toggleMenu}
                            modalComponent={<SongForm />}
                            className='SOM-UploadSong'
                        />

                        <p className='SOM-Logout' onClick={((e) => {handleLogout(e)})}>Log Out</p>
                    </ul>
                    :
                    <ul>
                        <p>Welcome</p>
                        <p>Login</p>
                        <p>Sign Up</p>
                        <p>Demo Login</p>
                    </ul>
                }
            </div>
            <div className={`slide-out-menu-overlay ${showMenu ? 'open' : ''}`} onClick={toggleMenu}></div>
        </div>
    );
};

export default SlideOutMenu;

