import React from 'react';
// import ProfileButton from '../../Navigation/ProfileButton';
// import { useSelector } from 'react-redux';
import './Menu.css'; // import the CSS file for the menu styles

const Menu = ({ isLoaded }) => {
    // const sessionUser = useSelector(state => state.session.user);

    return (
    <div id="Menu" >
        <div className='Menu-Buttons'>
            {/* <ProfileButton user ={sessionUser} /> */}

            <div className='Menu-Welcome'>&nbsp;&nbsp;Welcome!</div>

            <div className='Menu-LogIn-Wrapper'>
                <div className='Menu-LogIn-Btn'>&nbsp;&nbsp;Log In</div>
                <i className="fa-solid fa-right-to-bracket" id='Login-Icon'></i>
            </div>

            <div className='Menu-SignUp-Wrapper'>
                <div className='Menu-SignUp-Btn'>&nbsp;&nbsp;Sign Up</div>
                <i className="fa-solid fa-user-plus" id='SignUp-Icon'></i>
            </div>
        </div>
    </div>
    );
};

export default Menu;
