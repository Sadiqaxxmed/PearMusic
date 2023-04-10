import React,{useState} from "react";
import ProfileButton from "../Navigation/ProfileButton";
import { useSelector } from "react-redux";
import Menu from "./Menu/index";
import noSong from '../../images/Music.png'
import pear from '../../images/pear2.png'
import ReactPlayer from 'react-player'
import './NavBar.css'




function NavBar() {
  const sessionUser = useSelector(state => state.session.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [volume,setVolume] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="NB-body">
      <div className="music-player-container">
        <div> <i className="fa-solid fa-shuffle fa-sm" id='shuffle'></i> </div>
        <div> <i className="fa-solid fa-backward fa" id='backwards'></i> </div>
        <div> <i className="fa-solid fa-play fa-xl" id='play'></i> </div>
        <div> <i className="fa-solid fa-forward fa" id='forwards'></i> </div>
        <div> <i className="fa-solid fa-repeat fa-sm" id='repeat'></i> </div>
      </div>
      <div className="NB-Wrapper">
        <img src={noSong} alt='music'/>

        <div className='NB-MUSIC-BLOCK'>
          <img className="NB-Pear" src={pear} alt='pear'/>
        </div>
      </div>
      <div className="NB-Volume-Slider">
        <i className="fa-solid fa-volume-low" id='music'></i>
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} className="slider" id="myslider"/>
      </div>
        <div className="NB-Symbol">
      </div>
      <div className="NB-Menu-Wrap">
        {/* <i className="fa-solid fa-bars" id='burger' onClick={toggleMenu}/> */}
        <ProfileButton user ={sessionUser} onClick={toggleMenu} />
        {isMenuOpen && <Menu />} {/*opens menu when clicked on*/}
      </div>
    </div>
  )
}


export default NavBar
