import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

import icon from '../../images/SplashPagePhones/pmi.png'
import icon2 from '../../images/SplashPagePhones/blackPear.png'
import silverLock from '../../images/SplashPagePhones/silver-lock.png'
import blue from '../../images/SplashPagePhones/blue.png'
import blueLock from '../../images/SplashPagePhones/blue-lock.png'
import arrow from '../../images/arrows.gif'

import YasineCard from "./devs/YasineCard";
import SadiqCard from "./devs/SadiqCard";
import MikeCard from "./devs/MikeCard";
import './SplashPage.css'

function SplashPage({ isLoaded }) {
  const [devList, setDevList] = useState([])
  const devs = [YasineCard, SadiqCard, MikeCard]

  const divRef = useRef(null);
  const devRand = (devs) => {
    let randDevs = []

    //make a copy (it is not good practice to mutate data passed into the function)
    let tempList = devs.slice()

    //pick devs at random
    while (tempList.length > 0) {
      let randomIdx = Math.floor(Math.random() * tempList.length);
      let randomEle = tempList.splice(randomIdx, 1)[0]
      randDevs.push(randomEle)
    }
    return randDevs
  }

  useEffect(() => {
    setTimeout(function () {
      let oldContent = document?.querySelector('.HP-Apple-Subscription-Red');
      let newContent = document?.querySelector('.HP-Apple-Subscription-White');
      if (oldContent && newContent) {
        oldContent.style.transform = 'translateY(-100%)';
        oldContent.style.opacity = '0';
        newContent.style.transform = 'translateY(0)';
        newContent.style.opacity = '1';
      }
    }, 4000); // 5 seconds in milliseconds
  }, [isLoaded])
  useEffect(() => {
    setDevList(devRand(devs))
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
            Listen and discover. In perfect harmony.
          </div>
          <div className='HP-Apple-Subscription-White'>
            <img src={arrow} alt='arrow' className="HP-MeetTheDevs-Arrow" />
            Meet The Pear Music Devs
            <img src={arrow} alt='arrow' className="HP-MeetTheDevs-Arrow" />
          </div>
        </div>
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
          {devList.map((Card, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}


export default SplashPage
