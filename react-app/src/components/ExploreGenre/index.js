import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkExploreQueue, thunkPlayNow } from "../../store/queue";
import { thunkGetExploreGenre, thunkResetPlaylists } from "../../store/playlist";

import loading from '../../images/loading.gif'
import "./ExploreGenre.css"


function ExploreGenre() {
  const { genre_type } = useParams();
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false);
  const exploreGenre = Object.values(useSelector(state => state.playlists.exploreGenre));
  const descriptions = {
    'K-Pop': "Explore and dive into this amazing mix of K-Pop singles that are trending!",
    'Rap': "Nothing like rap music to get you into the mood for the evening!",
    'Pop': "How about you take a load off and 'Pop' in some pop music into your day!",
    'R&B': "Who can't deny the best genre to exist? Come check out this amazing R&B playlist!"
  }
  const coverColor = {
    'K-Pop': "#8899E7",
    'Rap': "#89232B",
    'Pop': "#9495B1",
    'R&B': "#E3912A",
    'Alternative': "#65372B"
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false)
      await dispatch(thunkGetExploreGenre(genre_type))
      setIsLoaded(true)
    }
    fetchData()
    return (() => {
      dispatch(thunkResetPlaylists());
    })

  }, [dispatch, genre_type])
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

  const playNowFunc = (song) => {
    dispatch(thunkPlayNow(song))
  }
  function addQueue() {
    dispatch(thunkExploreQueue(exploreGenre))
  }
  function totalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

    for (let i = 0; i < songs.length; i++) {
      let duration = songs[i].duration;
      minutes += Math.floor(duration);
      duration?.toString().split('.').forEach((second, i) => i % 2 !== 0 ? seconds += parseInt(second) : false)
    }
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60)
      seconds = seconds % 60;
    }
    return `${minutes} MINUTES, ${seconds} SECONDS`
  }
  function songTotalPlayTime(song) {
    let minutes = 0;
    let seconds = 0;
    let duration = song.duration;
    minutes = Math.floor(duration);
    seconds = duration.toFixed(1).toString().split('.')[1].toString().length < 2 ? seconds = `0${duration.toFixed(1).toString().split('.')[1].toString()}` : seconds = duration.toFixed(1).toString().split('.')[1].toString()
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60)
      seconds = seconds % 60;
    }
    return `${minutes}:${seconds}`
  }
  return (
    <>
      {!isLoaded
        ?
        <img className='LoadingGIf' src={loading} alt="loading-gif" />
        :
        <div className="EG-Body">
          <div className="gradient" style={{ background: `linear-gradient(to bottom, ${coverColor[genre_type]} 1%, rgb(31, 31, 31))` }} />
          <div className="SGPL-Top">
            <div className="SGPL-Top-Left">
              <img className="SG-PL-Img" alt='temp' src={exploreGenre[0]?.coverImage}></img>
            </div>
            <div className="SGPL-Top-Right">
              {!isMobile && <h3 className="SGPL-Title">{genre_type}</h3>}
              {!isMobile && <p className="SGPL-Info">{exploreGenre.length} SONGS • {totalPlayTime(exploreGenre)}</p>}
              {isMobile && <div className="SGPL-Title-Wrap">
                <h3 className="SGPL-Title">{genre_type}</h3>
                <p className="SGPL-Info">{exploreGenre.length} SONGS • {totalPlayTime(exploreGenre)}</p>
              </div>}
              <p className="SGPL-Description">{descriptions[genre_type]}</p>
              <div className="SGPL-Buttons">
                <div className="SGPL-Play-Button" onClick={(() => addQueue())}>
                  <i className="fa-solid fa-play fa-lrg SGPL-play"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="SGPL-Bottom">
            <div className="SGPL-Bottom-Title-Header">
              <div className="SGPL-Bottom-Song-Header"> <p className="SGPL-Bottom-text">Song</p> </div>
              {!isMobile && (<div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Artist</p> </div>)}
              {!isMobile && (<div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Album</p> </div>)}
              {!isMobile && (<div className="SGPL-Bottom-Time-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Time</p> </div>)}
            </div>
            {exploreGenre.map((song, i) =>
              <div className={i % 2 === 0 ? "SGPL-Darker-Shade" : 'SGPL-No-Shade'} tabIndex="0" key={`ExploreGenre-${i}`}>
                <div className="SGPL-Bottom-Title-Header">
                  <div className="SGPL-Bottom-Song-Header">
                    <div className="SGPL-Bottom-Song">
                      <img className="SG-Bottom-PL-Img" alt='temp' src={song.coverImage} onClick={() => playNowFunc(song)}></img>
                      {!isMobile ? <p className="SGPL-Bottom-Song-text">{song.title}</p>
                        :
                        <div className="SG-Bottom-TA-Wrapper">
                          <p className="SGPL-Bottom-Song-text">{song.title}</p>
                          <p className="SGPL-Bottom-text" >{song.artistName}</p>
                        </div>
                      }

                    </div>
                  </div>
                  {!isMobile && (<div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.artistName}</p> </div>)}
                  {!isMobile && (<div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.genre}</p> </div>)}
                  {!isMobile && (<div className="SGPL-Time">
                    <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{songTotalPlayTime(song)}</p>
                  </div>)}
                </div>
              </div>
            )}
          </div>
        </div>}
    </>
  )
}

export default ExploreGenre
