import React,{useState, useRef, useEffect} from "react";
import ProfileButton from "../Navigation/ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu/index";
import noSong from '../../images/Music.png'
import pear from '../../images/pear2.png'
import ReactPlayer from 'react-player'
import './NavBar.css'
import { thunkRemoveSong } from "../../store/queue";




function NavBar() {
  const sessionUser = useSelector(state => state.session.user);
  const queue = Object.values(useSelector(state => state.queue.queue))
  const playerRef = useRef(null); // Create a ref to the ReactPlayer component

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [volume,setVolume] = useState(30)
  const [playPause, setPlayPause] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0)
  const [songUrl, setSongUrl] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [toggleIcon, setToggleIcon] = useState('fa-solid fa-play fa-xl')
  // const [albumTitle, setAlbumTitle] = useState(null)
  

  const dispatch = useDispatch()


// Logic to advance the song queue
  const advanceSongQueue = async () => {
    
    dispatch(thunkRemoveSong())
    return (console.log('song removed'))
  }
// Updates useStates to reflect queue change whenever the queue is altered
  useEffect(() => {
    if(queue[0]){
      if(queue[0].mp3file !== undefined) {
        setHasPlayed(true)
        setPlayPause(true)
      }
      setSongUrl(queue[0].mp3file)
      setSongTitle(queue[0].title)
      setSongArtist(queue[0].artistName)
      setCoverImage(queue[0].coverImage)
       // setAlbumTitle(queue[0].albumTitle) 
    }
  },[queue[0]])

// LOGIC FOR TOP RIGHT MENU OPEN
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

//FIX THIS... THE LOGIC IS WONKY
  function playPauseFunc(){
    setHasPlayed(true)
    if(!playPause) {
      setToggleIcon('fa-solid fa-pause fa-xl icon-hover-pointer')
      setPlayPause(true)
    } else {
      setToggleIcon('fa-solid fa-play fa-xl icon-hover-pointer')
      setPlayPause(false)
    }
  }

// LOGIC TO HANDLE SKIP BUTTON CLICK
  const handleSeekUp = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current time
      playerRef.current.seekTo(currentTime + 5); // Seek to current time + 5 seconds
    }
  };
// LOGIC TO HANDLE REVERSE BUTTON CLICK
  const handleSeekDown = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current time
      playerRef.current.seekTo(currentTime - 5); // Seek to current time - 5 seconds
    }
  };

// UPDATES CURRENT TIME BASED ON PLAYER PROGRESS OUTPUT
  const handleProgressChange = (e) => {
    // console.log(e)
    playerRef.current.seekTo(e)
    setCurrentTime(e)
  }
// FUNC TO CHANGE SECONDS TO MINUTES FOR PLAYER VIEW (NOT FOR ANY LOGIC IN THE CODE BESIDES AESTETIC AND USER EXPERIENCE)
  function convertDecimalToTime(decimalValue) {
    const minutes = Math.floor(decimalValue / 60); // Get minutes by dividing decimalValue by 60 and rounding down
    const seconds = Math.round(decimalValue % 60); // Get seconds by getting the remainder of decimalValue divided by 60 and rounding to nearest integer
    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format the time string with colon and leading zero for single-digit seconds
    return timeString;
  }

  return (
    <div className="NB-body">
      <div className="music-player-container">
        <div> <i className="fa-solid fa-shuffle fa-sm icon-hover-pointer" id='shuffle'></i> </div>
        <div> <i onClick={handleSeekDown} className="fa-solid fa-backward fa icon-hover-pointer" id='backwards'></i> </div>
        <div> <i onClick={playPauseFunc} className={toggleIcon} id='play'></i> </div>
        {/* <div> <i onClick={playPauseFunc} className="fa-solid fa-pause fa-xl" id='play'></i> </div> */}
        <div> <i onClick={handleSeekUp}className="fa-solid fa-forward fa icon-hover-pointer" id='forwards'></i> </div>
        <div> <i className="fa-solid fa-repeat fa-sm icon-hover-pointer" id='repeat'></i> </div>
      </div>
      <div className="NB-Wrapper">
        {!hasPlayed
        ? (<img className="NB-Img" src={noSong} alt='music'/>)
        : (<img className="NB-Img" src={coverImage} alt='cover' />)}
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
            onEnded={((e)=> advanceSongQueue())}
          />
          {hasPlayed
          ? <>
              <div className="NB-Player-CurrentSong-Wrapper">
                <div className="NB-Player-CurrentSong">{songTitle}</div>
                <div className="NB-Player-ArtistAlbum">
                  <div className="NB-Player-Artist">{songArtist}</div>&nbsp;&nbsp; {/* change to -- equvalent emoji or symbol idk just no middle space in it like this (-  -)  */}
                  <div className="NB-Player-Album">(album name)</div>
                </div>
              </div>
              <div className="NB-Player-Times">
                <div className="NB-Player-CurrentTime">{convertDecimalToTime(currentTime)}</div>
                <div className="NB-Player-TimeLeft">-{convertDecimalToTime(duration-currentTime)}</div>
              </div>
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
