import React, { useEffect, useRef } from "react";
import { NavLink, Link } from 'react-router-dom';

import icon from '../../images/SplashPagePhones/pmi.png'
import icon2 from '../../images/SplashPagePhones/blackPear.png'

import silver from '../../images/SplashPagePhones/silver.png'
import silverLock from '../../images/SplashPagePhones/silver-lock.png'
import blue from '../../images/SplashPagePhones/blue.png'
import blueLock from '../../images/SplashPagePhones/blue-lock.png'

import sadiq from '../../images/Devs/sadiqie.png'
import mikey from '../../images/Devs/mikey.png'
import yasiney from '../../images/Devs/yasiney.png'

import './SplashPage.css'

function SplashPage({ isLoaded }) {

  const divRef = useRef(null);
  useEffect(() => {

    if (isLoaded) {
      setTimeout(function () {
      let oldContent = document?.querySelector('.HP-Apple-Subscription-Red');
      let newContent = document?.querySelector('.HP-Apple-Subscription-White');
      if (oldContent && newContent) {
        oldContent.style.transform = 'translateY(-100%)';
        oldContent.style.opacity = '0';
        newContent.style.transform = 'translateY(0)';
        newContent.style.opacity = '1';
      }
    }, 3500)}; // 5 seconds in milliseconds
  }, [])

  return (
    <div className='HP-Body' style={{ backgroundColor: 'white' }}>
      <div className="HP-Main-Wrapper">
        <div className="HP-Wrapper-Wrapper">
          <div className="HP-Wrapper">
            <div className="HP-Nav">
              <div className="HP-TitleAndLogo">
                <img className='HP-Pear-Logo-Black' src={icon2} alt='pear-2' />
                <div className="HP-Title">Pear Music</div>
              </div>
              <Link exact="true" to="/browse" className="HP-GoTo-Button">Go to Pear Music</Link>
            </div>
          </div>
        </div>
        <div className="HP-Apple-Subscription-Wrapper">
          <div className="HP-Apple-Subscription-Red">
            Introducing the Pear Music Classical app.
            Included with an Pear Music subscription.
          </div>
          <div className='HP-Apple-Subscription-White'>
            Introducing the Pear Music Classical app.
            Included with an Pear Music subscription.
          </div>
        </div>
        {/* <div className="HP-Icon-Wrapper">
        <img className='HP-Icon' src={icon} alt='icon' /> */}
        {/* <h1 className="HP-Title">Apple Music</h1> */}
        {/* </div> */}

        <div className="HP-Icon-Wrapper-Wrapper">
          <div className="HP-Icon-Wrapper">
            <div className="HP-Icon">
              <img src={icon} alt='pear' />
            </div>
          </div>
        </div>
        <div className="HP-Bottom-Text-Wrapper">
          <p className="HP-Icon-Bottom-Text">Pear&nbsp;Music</p>
        </div>
        <div className="HP-Headline-Wrapper">
          <p className="HP-Headline">Hear sound all around.</p>
        </div>
        <div className="HP-Other-Wrapper">
          <Link exact="true" to="/browse" className="HP-Other-NavBtn">Go to Pear Music</Link>
        </div>
        <div ref={divRef} className="HP-PhoneImgs-Wrapper">
          <img className='HP-Image' src={blue} alt='' />
          <img className='HP-Image' src={silverLock} alt='' />
          <img className='HP-Image' src={blueLock} alt='' />
        </div>

        <div className="HP-Devs-Wrapper">

          <div className="HP-ImgAndIcons-Wrapper">
            <div className="HP-Yasiney-Wrapper">
              <img className='HP-Yasiney' src={yasiney} alt='Site Dev Yasine' />
            </div>
            <div className="HP-Dev-Name-Wrapper">
              <p className="HP-Dev-Name">Yasine Benzekri</p>
            </div>
            <a href='https://github.com/Yasine-ben' className="HP-Github">
              <p className="HP-Github-Title">Github&nbsp;</p>
              <i id='HP-Github-Icon' className="fa-brands fa-github" />
            </a>
            <a href='https://www.linkedin.com/in/yasine-benzekri-389457271/' className="HP-LinkedIn">
              <p className="HP-LinkedIn-Title">LinkedIn&nbsp;</p>
              <i id='HP-LinkedIn-Icon' className="fa-brands fa-linkedin" />
            </a>
          </div>

          <div className="HP-ImgAndIcons-Wrapper">
            <div className="HP-Sadiqey-Wrapper">
              <img className="HP-Sadiqey" src={sadiq} alt='Site Dev Sadiq' />
            </div>
            <div className="HP-Dev-Name-Wrapper">
              <p className="HP-Dev-Name">Sadiq Ahmed</p>
            </div>
            <a href='https://github.com/Sadiqaxxmed' className="HP-Github">
              <p className="HP-Github-Title">Github&nbsp;</p>
              <i id='HP-Github-Icon' className="fa-brands fa-github" />
            </a>
            <a href='https://www.linkedin.com/in/sadiqaxxmed/' className="HP-LinkedIn">
              <p className="HP-LinkedIn-Title">LinkedIn&nbsp;</p>
              <i id='HP-LinkedIn-Icon' className="fa-brands fa-linkedin" />
            </a>
          </div>

          <div className="HP-ImgAndIcons-Wrapper">
            <div className="HP-Mikey-Wrapper">
              <img className="HP-Mikey" src={mikey} alt='Site Dev Mike' />
            </div>
            <div className="HP-Dev-Name-Wrapper">
              <p className="HP-Dev-Name">Michael Salariosa</p>
            </div>
            <a href='https://github.com/mike-650' className="HP-Github">
              <p className="HP-Github-Title">Github&nbsp;</p>
              <i id='HP-Github-Icon' className="fa-brands fa-github" />
            </a>
            <a href='https://www.linkedin.com/in/michael-s-688653118/' className="HP-LinkedIn">
              <p className="HP-LinkedIn-Title">LinkedIn&nbsp;</p>
              <i id='HP-LinkedIn-Icon' className="fa-brands fa-linkedin" />
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}


export default SplashPage
