import React, { useEffect, useRef } from "react";
import icon from '../../images/SplashPagePhones/pmi.png'
import icon2 from '../../images/SplashPagePhones/blackPear.png'
import silver from '../../images/SplashPagePhones/silver.png'
import silverLock from '../../images/SplashPagePhones/silver-lock.png'
import blue from '../../images/SplashPagePhones/blue.png'
import blueLock from '../../images/SplashPagePhones/blue-lock.png'
import './SplashPage.css'

function SplashPage() {
  const divRef = useRef(null);
  // document.addEventListener('DOMContentLoaded', function() {
  //   setTimeout(function() {
  //     var newContent = document.querySelector('HP-Apple-Subscription-White');
  //     newContent.style.animation = 'contentMoveUp 1s ease-in-out forwards';
  //   }, 5000); // 5 seconds in milliseconds
  // });
  // useEffect(() => {
  //   setTimeout(() => {
  //     const newContent = document.querySelector('.HP-Apple-Subscription-White');
  //     if (newContent) {
  //       newContent.style.animation = 'contentMoveUp 2s ease-in-out forwards';
  //     }
  //   }, 1000);
  // }, []);
  useEffect(() => {
    setTimeout(function () {
      var oldContent = document.querySelector('.HP-Apple-Subscription-Red');
      var newContent = document.querySelector('.HP-Apple-Subscription-White');
      oldContent.style.transform = 'translateY(-100%)';
      oldContent.style.opacity = '0';
      newContent.style.transform = 'translateY(0)';
      newContent.style.opacity = '1';
    }, 3500); // 5 seconds in milliseconds
  }, [])


  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="HP-Main-Wrapper">
        <div className="HP-Wrapper-Wrapper">
          <div className="HP-Wrapper">
            <div className="HP-Nav">
              <div className="HP-TitleAndLogo">
                <img className='HP-Pear-Logo-Black' src={icon2} alt='pear-2' />
                <div className="HP-Title">Pear Music</div>
              </div>
              <div className="HP-GoTo-Button">Go to Pear Music</div>
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

        <div ref={divRef} className="HP-PhoneImgs-Wrapper">
          <img className='HP-Image' src={blue} alt='' />
          <img className='HP-Image' src={silverLock} alt='' />
          <img className='HP-Image' src={blueLock} alt='' />
        </div>


      </div>
    </div>
  )
}


export default SplashPage

