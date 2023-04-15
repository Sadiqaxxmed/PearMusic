import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkExploreQueue } from "../../store/queue";
import { thunkGetExploreGenre, thunkResetPlaylists, thunkUserPlaylists } from "../../store/playlist";

import "./ExploreGenre.css"


function ExploreGenre() {
  const { genre_type } = useParams();
  const dispatch = useDispatch();
  const exploreGenre = Object.values(useSelector(state => state.playlists.exploreGenre));
  const userId = useSelector(state => state.session.user.id);

  const descriptions = {
    'K-Pop': "Explore and dive into this amazing mix of K-Pop singles that are trending!",
    'Rap': "Nothing like rap music to get you into the mood for the evening!",
    'Pop': "How about you take a load off and 'Pop' in some pop music into your day!",
    'R&B': "Who can't deny the best genre to exist? Come check out this amazing R&B playlist!"
  }

  useEffect(() => {
    dispatch(thunkGetExploreGenre(genre_type))
    dispatch(thunkUserPlaylists(userId))

    return (() => {
      dispatch(thunkResetPlaylists());
    })
  }, [dispatch])

  function addQueue() {
    dispatch(thunkExploreQueue(exploreGenre))
  }

  function totalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

    for (let i = 0; i < songs.length; i++) {
      let duration = songs[i].duration;
      minutes += Math.floor(duration);
      duration.toString().split('.').forEach((second, i) => i % 2 != 0 ? seconds += parseInt(second) : false)
    }
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60)
      seconds = seconds % 60;
    }
    return `${minutes} MINUTES, ${seconds} SECONDS`
  }

  function songTotalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

    let duration = songs.duration;
    minutes = Math.floor(duration);
    seconds = duration.toString().split('.')[1].toString().length < 2 ? seconds = `0${duration.toString().split('.')[1].toString()}` : seconds = duration.toString().split('.')[1].toString()
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60)
      seconds = seconds % 60;
    }
    return `${minutes}:${seconds}`
  }

  return (
    <>
      <div className="EG-Body">
        <div className="SGPL-Top">
          <div className="SGPL-Top-Left">
            <img className="SG-PL-Img" alt='temp' src={exploreGenre[0]?.coverImage}></img>
          </div>
          <div className="SGPL-Top-Right">
            <h3 className="SGPL-Title">{genre_type}</h3>
            <p className="SGPL-Info">{exploreGenre.length} SONGS • {totalPlayTime(exploreGenre)}</p>
            <p className="SGPL-Description">{ descriptions[genre_type] }</p>
            <div className="SGPL-Buttons">
              <div className="SGPL-Play-Button" onClick={(() => addQueue())}>
                <i className="fa-solid fa-play fa-lrg SGPL-play"></i>
                <p className="SGPL-Play-Text">Play</p>
              </div>
              <div className="SGPL-Shuffle-Button">
                <p className="SGPL-Shuffle-Text" onClick={(() => alert('***SHUFFLE FEATURE COMING SOON***'))}>Shuffle</p>
              </div>
            </div>
          </div>
        </div>
        <div className="SGPL-Bottom">
          <div className="SGPL-Bottom-Title-Header">
            <div className="SGPL-Bottom-Song-Header"> <p className="SGPL-Bottom-text">Song</p> </div>
            <div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Artist</p> </div>
            <div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Album</p> </div>
            <div className="SGPL-Bottom-Time-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Time</p> </div>
          </div>
          {exploreGenre.map((song, i) =>
            <div className={i % 2 == 0 ? "SGPL-Darker-Shade" : 'SGPL-No-Shade'} tabindex="0">
              <div className="SGPL-Bottom-Title-Header">
                <div className="SGPL-Bottom-Song-Header">
                  <div className="SGPL-Bottom-Song">
                    <img className="SG-Bottom-PL-Img" alt='temp' src={song.coverImage}></img>
                    <p className="SGPL-Bottom-Song-text">{song.title}</p>
                  </div>
                </div>
                <div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.artistName}</p> </div>
                <div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.genre}</p> </div>
                <div className="SGPL-Time">
                  <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{songTotalPlayTime(song)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ExploreGenre
