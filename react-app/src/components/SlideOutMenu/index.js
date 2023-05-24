import React, { useEffect, useRef, useState } from 'react';
import './SlideOutMenu.css';
import { useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SongForm from '../Forms/SongForm'

const SlideOutMenu = () => {
    const user = useSelector(state => state.session.user);
    const ulRef = useRef(); 

    const [showMenu, setShowMenu] = useState(false);

    console.log(user)

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

    return (
        <div>
            <div className={`fa-solid fa-gear ${showMenu ? 'open' : ''}`} onClick={toggleMenu}>
                {/* <div className="slide-out-menu-bar"></div>
                <div className="slide-out-menu-bar"></div>
                <div className="slide-out-menu-bar"></div> */}
            </div>
            <div className={`slide-out-menu-container ${showMenu ? 'open' : ''}`} ref={ulRef}>
                {user ?
                    <ul>
                        <p>{`Welcome ${user?.username}`}</p>

                        <OpenModalMenuItem
                            itemText="Upload Song"
                            onItemClick={toggleMenu}
                            modalComponent={<SongForm />}
                        />

                        <li>Log Out</li>
                    </ul>
                    :
                    <ul>
                        <p>Welcome</p>
                        <li>Login</li>
                        <li>Sign Up</li>
                        <li>Demo Login</li>
                    </ul>
                }
            </div>
            <div className={`slide-out-menu-overlay ${showMenu ? 'open' : ''}`} onClick={toggleMenu}></div>
        </div>
    );
};

export default SlideOutMenu;

