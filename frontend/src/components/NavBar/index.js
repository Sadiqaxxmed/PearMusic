import React from "react";
import ReactPlayer from "react-player";
import ReactAudioPlayer from 'react-audio-player'
// import music from '../../test-music'
import './NavBar.css'

function NavBar() {

  return (
    <div className="NB-body">
      <div className="music-player-container">
        <i class="fa-solid fa-shuffle fa-sm" id='symbols shuffle'></i>
        <i class="fa-solid fa-backward fa" id='symbols backward'></i>
        <i class="fa-solid fa-play fa-xl" id='symbols play'></i>
        <i class="fa-solid fa-forward fa" id='symbols forward'></i>
        <i class="fa-solid fa-repeat fa-sm" id='symbols repeat'></i>
      </div>
      <div className='NB-MUSIC-BLOCK'>
        ah
      </div>
      <div className="NB-Volume-Slider">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
      </div>
      <div className="NB-Symbol">
      </div>
    </div>
  )
}


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