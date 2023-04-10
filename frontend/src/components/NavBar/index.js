import React,{useState, useRef, useEffect} from "react";
import ProfileButton from "../Navigation/ProfileButton";
import { useSelector } from "react-redux";
import Menu from "./Menu/index";
import noSong from '../../images/Music.png'
import pear from '../../images/pear2.png'
import ReactPlayer from 'react-player'
import './NavBar.css'




function NavBar() {
  const sessionUser = useSelector(state => state.session.user);
  const currentSong = useSelector(state => state.songs.singleSong)
  const playerRef = useRef(null); // Create a ref to the ReactPlayer component

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [volume,setVolume] = useState(30)
  const [playPause, setPlayPause] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0)
  const [songUrl, setSongUrl] = useState('')
  //console logs start
  console.log('ass',currentSong)
  //console logs end

  useEffect(() => {
    setSongUrl(currentSong.mp3file)
    console.log('currentSong ==', currentSong.mp3file)
  },[currentSong])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function playPauseFunc(){
    if(!playPause){
      setPlayPause(true)
    }else{
      setPlayPause(false)
    }
  }

  const handleSeekUp = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current time
      playerRef.current.seekTo(currentTime + 5); // Seek to current time + 5 seconds
    }
  };

  const handleSeekDown = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current time
      playerRef.current.seekTo(currentTime - 5); // Seek to current time - 5 seconds
    }
  };

  const handleProgressChange = (e) => {
    console.log(e)
    playerRef.current.seekTo(e)
    setCurrentTime(e)
  }

  function convertDecimalToTime(decimalValue) {
    const minutes = Math.floor(decimalValue / 60); // Get minutes by dividing decimalValue by 60 and rounding down
    const seconds = Math.round(decimalValue % 60); // Get seconds by getting the remainder of decimalValue divided by 60 and rounding to nearest integer
    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format the time string with colon and leading zero for single-digit seconds
    return timeString;
  }

  return (
    <div className="NB-body">
      <div className="music-player-container">
        <div> <i className="fa-solid fa-shuffle fa-sm" id='shuffle'></i> </div>
        <div> <i onClick={handleSeekDown} className="fa-solid fa-backward fa" id='backwards'></i> </div>
        <div> <i onClick={playPauseFunc} className="fa-solid fa-play fa-xl" id='play'></i> </div>
        <div> <i onClick={handleSeekUp}className="fa-solid fa-forward fa" id='forwards'></i> </div>
        <div> <i className="fa-solid fa-repeat fa-sm" id='repeat'></i> </div>
      </div>
      <div className="NB-Wrapper">
        {!playPause
        ? (<img src={noSong} alt='music'/>) 
        : (<img src={noSong} />)}
        <div className='NB-MUSIC-BLOCK'> 
          {/* Render ReactPlayer component and pass ref */}
          <ReactPlayer 
            ref={playerRef}
            url={songUrl}
            controls={false}
            volume = {volume/100}
            playing = {playPause}
            onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
            played={currentTime}
            onDuration={(duration) => setDuration(duration)}
            style={{display: 'none'}}
          />
          {playPause 
          ? <>
              <div className="NB-Player-CurrentSong-Wrapper">
                <div className="NB-Player-CurrentSong">Kill You</div>
                <div className="NB-Player-ArtistAlbum">
                  <div className="NB-Player-Artist">Eminem </div> --
                  <div className="NB-Player-Album"> The Marshall Mathers LP</div>
                </div>
              </div>
              <div className="NB-Player-Times">
                <div className="NB-Player-CurrentTime">{convertDecimalToTime(currentTime)}</div>
                <div className="NB-Player-TimeLeft">-{convertDecimalToTime(duration-currentTime)}</div>
              </div>
              {/* onChange={(e)=> setCurrentTime(e.target.value)} */}
              <input className='NB-Progress' type="range" value={currentTime} min='0' max={duration} onChange={(e)=> handleProgressChange(e.target.value)}/>
            </>
          : <img className="NB-Pear" src={pear} alt='pear'/>
          }
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
