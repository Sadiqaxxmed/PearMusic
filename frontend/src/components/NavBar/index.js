import React from "react";
// import ReactPlayer from "react-player";
// import ReactAudioPlayer from 'react-audio-player'
import noSong from '../../images/Music.png'
import pear from '../../images/pear2.png'
// import music from '../../test-music'
import './NavBar.css'

function NavBar() {

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

        <i class="fa-solid fa-bars" id='burger'/>
      </div>
    </div>
  )
}
//328x54

export default NavBar
{/* <div className="player-controls">
        <div className="player-buttons">
          <button className="previous-button">
          <span class="material-symbols-outlined"> fast_rewind </span>
          </button>
          <button className="play-button">
          <span class="material-symbols-outlined"> play_arrow </span>
          </button>
          <button className="pause-button">
          <span class="material-symbols-outlined"> stop </span>
          </button>
          <button className="next-button">
          <span class="material-symbols-outlined"> fast_forward </span>
          </button>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div> */}
      {/* <ReactPlayer
        className="react-player"
        url={[{src : '../../test-music/Good-Morning.mp3',type:'mp3'}]}
        controls
        playing
      /> */}
      {/* <ReactAudioPlayer
          src="../../test-music/Good-Morning.mp3"
          autoPlay
          controls
        /> */}
