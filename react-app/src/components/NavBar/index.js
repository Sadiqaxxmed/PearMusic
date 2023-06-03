import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { thunkRemoveSong } from "../../store/queue";

import ReactPlayer from 'react-player'
import NewMenu from "../SlideOutMenu";
import ColorThief from 'colorthief'
import CustomSlider from "./CustomSlider";
import noSong from '../../images/Music.png'
import pear from '../../images/pear2.png'

import './NavBarDesktop.css'
import './NavBarMobile.css'


function NavBar() {
  const sessionUser = useSelector(state => state.session.user);
  const queue = Object.values(useSelector(state => state.queue.queue))
  const playerRef = useRef(null); // Create a ref to the ReactPlayer component
  const location = useLocation();

  let browseIcon = 'material-symbols-outlined'
  let songIcon = 'material-symbols-outlined'
  let playlistIcon = 'material-symbols-outlined'
  let albumIcon = 'material-symbols-outlined'

  if (location.pathname.includes('/browse')) {
    browseIcon = 'material-symbols-outlined active'
  } else if (location.pathname.includes('/songs')) {
    songIcon = 'material-symbols-outlined active'
  } else if (location.pathname.includes('/allPlaylist')) {
    playlistIcon = 'material-symbols-outlined active'
  } else if (location.pathname.includes('/manage-discography')) {
    albumIcon = 'material-symbols-outlined active'
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [volume, setVolume] = useState(50)
  const [playPause, setPlayPause] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0)
  const [songUrl, setSongUrl] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [toggleIcon, setToggleIcon] = useState('fa-solid fa-play fa-xl')
  const [isMobile, setIsMobile] = useState(false);
  const [isPhone, setIsPhone] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const getDominantColor = (url) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = url;

      image.addEventListener('load', () => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(image);
        const averageColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        const playerWrapper = document.querySelector('.M-NB-Player-Wrapper');
        if (playerWrapper) {
          playerWrapper.style.backgroundColor = averageColor;
        }
      });
    };
    if (coverImage !== undefined) {
      getDominantColor(coverImage);
    }
  }, [songTitle])
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1050); // Adjust the value according to your mobile range
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  // Updates useStates to reflect queue change whenever the queue is altered
  useEffect(() => {
    if (queue[0]) {
      if (queue[0].mp3file !== undefined) {
        setHasPlayed(true)
        setPlayPause(true)
      }
      setSongUrl(queue[0].mp3file)
      setSongTitle(queue[0].title)
      setSongArtist(queue[0].artistName)
      setCoverImage(queue[0].coverImage)
      // setAlbumTitle(queue[0].albumTitle)
    }
    if (songUrl) {
      setToggleIcon('fa-solid fa-pause fa-xl icon-hover-pointer')
    }
    else {
      setHasPlayed(false)
      setPlayPause(false)
    }
    // setAlbumTitle(currentSong.albumTitle) need to pass in album title to single song
  }, [songUrl, queue[0]])
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsPhone(isMobileDevice)

    // Cleanup function
    return () => {
      // Perform any necessary cleanup
    };
  }, []);

  // Logic to advance the song queue
  const advanceSongQueue = async () => {
    dispatch(thunkRemoveSong())
    return
  }
  // LOGIC FOR TOP RIGHT MENU OPEN
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  //FIX THIS... THE LOGIC IS WONKY
  function playPauseFunc() {
    console.log(queue)
    setHasPlayed(true)
    if (!playPause) {
      setToggleIcon('fa-solid fa-pause fa-xl icon-hover-pointer')
      setPlayPause(true)
      return;
    } else {
      setToggleIcon('fa-solid fa-play fa-xl icon-hover-pointer')
      setPlayPause(false)
      return;
    }
  }
  // LOGIC TO HANDLE SKIP BUTTON CLICK
  const handleSeekUp = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current time
      playerRef.current.seekTo(currentTime + 10); // Seek to current time + 10 seconds
    }
  };
  // LOGIC TO HANDLE REVERSE BUTTON CLICK
  const handleSeekDown = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime(); // Get current time
      playerRef.current.seekTo(currentTime - 10); // Seek to current time - 10 seconds
    }
  };
  // UPDATES CURRENT TIME BASED ON PLAYER PROGRESS OUTPUT
  const handleProgressChange = (e) => {
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
    <div className="NB-body-Wrapper">
      <NewMenu />
      <ReactPlayer
        ref={playerRef}
        url={songUrl}
        controls={false}
        volume={volume / 100}
        playing={playPause}
        onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
        played={currentTime}
        onDuration={(duration) => setDuration(duration)}
        style={{ display: 'none' }}
        onEnded={((e) => advanceSongQueue())}
      />
      {!isMobile ? (
        // Content for Desktop
        <div className="NB-body">
          <div className="music-player-container">
            <div> <i className="fa-solid fa-shuffle fa-sm icon-hover-pointer" id='shuffle' onClick={((e) => alert('***SHUFFLE FEATURE COMING SOON***'))}></i> </div>
            <div> <i onClick={handleSeekDown} className="fa-solid fa-backward fa icon-hover-pointer" id='backwards'></i> </div>
            <div> <i onClick={playPauseFunc} className={toggleIcon} id='play'></i> </div>
            {/* <div> <i onClick={playPauseFunc} className="fa-solid fa-pause fa-xl" id='play'></i> </div> */}
            <div> <i onClick={handleSeekUp} className="fa-solid fa-forward fa icon-hover-pointer" id='forwards'></i> </div>
            <div> <i className="fa-solid fa-repeat fa-sm icon-hover-pointer" id='repeat' onClick={((e) => alert('***REPEAT FEATURE COMING SOON***'))}></i> </div>
          </div>
          <div className="NB-Wrapper">
            {!hasPlayed
              ? (<img className="NB-Img" src={noSong} alt='music' />)
              : (<img className="NB-Img" src={coverImage} alt='cover' />)}
            <div className='NB-MUSIC-BLOCK'>
              {hasPlayed
                ? <>
                  <div className="NB-Player-CurrentSong-Wrapper">
                    <div className="NB-Player-CurrentSong">{songTitle}</div>
                    <div className="NB-Player-ArtistAlbum">
                      <div className="NB-Player-Artist">{songArtist}</div> {/* change to -- equvalent emoji or symbol idk just no middle space in it like this (-  -)  */}
                    </div>
                  </div>
                  <div className="NB-Player-Times">
                    <div className="NB-Player-CurrentTime">{convertDecimalToTime(currentTime)}</div>
                    <div className="NB-Player-TimeLeft">-{convertDecimalToTime(duration - currentTime)}</div>
                  </div>
                  <input className='NB-Progress' type="range" value={currentTime} min='0' max={duration} onChange={(e) => handleProgressChange(e.target.value)} />
                </>
                : <img className="NB-Pear" src={pear} alt='pear' />
              }
            </div>
            <div className="NB-Volume-Slider">
              <i className="fa-solid fa-volume-low" id='music'></i>
              <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} className="slider" id="myslider" />
            </div>
          </div>
        </div>
      )
      :
      (
          <div className="M-NB-Body">
            {songArtist && songTitle && (
              //show teeny weenie weency player if song is playing currently
              <div className="M-NB-Player-Wrapper-Wrapper">
                <div className="M-NB-Player-Wrapper">
                  <div className="M-NB-SongInfo-Wrapper">
                    <div className="M-NB-SongImg-Wrapper">
                      <img src={coverImage} alt='' className="M-NB-SongImg" />
                    </div>
                    <div className="M-NB-SongTitle-Wrapper">
                      <div className="M-NB-SongTitle">{songTitle}</div>
                      <div className="M-NB-SongArtist">{songArtist}</div>
                    </div>
                  </div>
                  <div className="M-NB-Buttons-Wrapper">
                    <div className="M-NB-Play">
                      <i onClick={playPauseFunc} className={toggleIcon} id='play'></i>
                    </div>
                  </div>
                </div>
                <div className={isPhone ? "P-NB-ProgressBar-Wrapper" : "M-NB-ProgressBar-Wrapper"}>
                  <CustomSlider
                    currentTime={currentTime}
                    duration={duration}
                    handleProgressChange={handleProgressChange}
                  />
                </div>
              </div>
            )}
            <div className="M-NB-Nav">
              <Link className="M-NB-Icon" exact="true" to="/browse" >
                <span className={browseIcon}> home </span>
                <p>Home</p>
              </Link>
              <Link className="M-NB-Icon" exact="true" to="/allPlaylist" >
                <span className={playlistIcon}> view_list </span>
                <p>Playlists</p>
              </Link>
              {sessionUser && (
                <Link className="M-NB-Icon" exact="true" to="/songs">
                  <span className={songIcon}>library_music</span>
                  <p>Liked</p>
                </Link>
              )}
              {sessionUser && (
                <Link className="M-NB-Icon" exact="true" to="/manage-discography">
                  <span className={albumIcon}>album</span>
                  <p>Manage</p>
                </Link>
              )}
              {/* <div className="M-NB-Icon" onClick={() => ''}>
                <span className="material-symbols-outlined" id='M-Search'>search</span>
                <p>Search</p>
              </div> */}
              
              {/* <Link className="M-NB-Icon" exact="true" to="/browse">
                <span className="material-symbols-outlined"> code </span>
                <p>Devs</p>
              </Link> */}
            </div>
          </div>
        )
      }
    </div>
  );
}


export default NavBar
