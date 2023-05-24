import React, { useState } from 'react';
import './SlideOutMenu.css';

const SlideOutMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`fa-solid fa-gear ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                {/* <div className="slide-out-menu-bar"></div>
                <div className="slide-out-menu-bar"></div>
                <div className="slide-out-menu-bar"></div> */}
            </div>
            <div className={`slide-out-menu-container ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li>Menu Item 1</li>
                    <li>Menu Item 2</li>
                    <li>Menu Item 3</li>
                    <li>Menu Item 4</li>
                </ul>
            </div>
            <div className={`slide-out-menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
        </div>
    );
};

export default SlideOutMenu;

