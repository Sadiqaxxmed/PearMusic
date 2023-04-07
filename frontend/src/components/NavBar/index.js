import React,{useState} from "react";


import Menu from "./Menu/index";
import noSong from '../../images/Music.png'
import pear from '../../images/pear2.png'
import './NavBar.css'


  

function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="NB-body">
      <div className="music-player-container">
        <i class="fa-solid fa-shuffle fa-sm" id='shuffle'></i>
        <i class="fa-solid fa-backward fa" id='backwards'></i>
        <i class="fa-solid fa-play fa-xl" id='play'></i>
        <i class="fa-solid fa-forward fa" id='forwards'></i>
        <i class="fa-solid fa-repeat fa-sm" id='repeat'></i>
      </div>
      <div className="NB-Wrapper">
        <img src={noSong} alt='music'/>
        
        <div className='NB-MUSIC-BLOCK'>
          <img className="NB-Pear" src={pear} alt='pear'/>
        </div>
      </div>
      <div className="NB-Volume-Slider">
        <i class="fa-solid fa-volume-low" id='music'></i>
        <input type="range" min="0" max="100" value="20" className="slider" id="myslider"/>
      </div>
        <div className="NB-Symbol">
      </div>
      <div className="NB-Menu-Wrap">
        <i class="fa-solid fa-bars" id='burger' onClick={toggleMenu}/>
        {isMenuOpen && <Menu />} {/* opens menu when clicked on */}
      </div>
    </div>
  )
}


export default NavBar
