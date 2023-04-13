import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './SinglePlaylist.css'
import { thunkPlaylistSongs, thunkSinglePlaylist } from "../../store/playlist";
import { thunkGetComments, thunkCreateComment } from "../../store/comment";
import { thunkNewQueue } from "../../store/queue";

function SinglePlaylist() {
  const dispatch = useDispatch();
  const { playlist_id } = useParams();
  const [ comment, setComment ] = useState('');
  const [ errors, setErrors ] = useState({});
  const userId = useSelector(state => state.session.user?.id)
  const songs = Object.values(useSelector(state => state.playlists.singlePlaylist))
  const playlist = Object.values(useSelector(state => state.playlists.playlistDetails))[0]
  const comments = Object.values(useSelector(state => state.comments.playlistComments))

  useEffect(() => {
    dispatch(thunkPlaylistSongs(playlist_id))
    dispatch(thunkSinglePlaylist(playlist_id))
    dispatch(thunkGetComments(playlist_id))
  }, [dispatch])

  function addQueue() {
    dispatch(thunkNewQueue(playlist_id))
  }

  function totalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

    for (let i = 0; i < songs.length; i++) {
      let duration = songs[i].duration;
      minutes += Math.floor(duration);
      duration.toString().split('.').forEach((second, i) => i % 2 != 0 ? seconds += parseInt(second) : false)
    }

    return `${minutes} MINUTES, ${seconds} SECONDS`
  }

  function songTotalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

    let duration = songs.duration;
    minutes = Math.floor(duration);
    seconds = duration.toString().split('.')[1].toString().length < 2 ? seconds = `0${duration.toString().split('.')[1].toString()}` : seconds = duration.toString().split('.')[1].toString()
    return `${minutes}:${seconds}`
  }

  function handleSubmit(e) {
    e.preventDefault()
    // ! POSSIBLY PUT VALIDATIONS?
    let error = {}

    if (comment.length > 125) error.length = 'Comment must be less than 125 characters'

    if (error.length) setErrors(error)
    dispatch(thunkCreateComment(comment, userId, playlist_id))
  }

  function isDisabled() {
    if (comment.length <= 0) return true
  }

  return (
    <>
      <div className="SGPL-Body">
        <div className="SGPL-Top">
          <div className="SGPL-Top-Left">
            <img className="SG-PL-Img" alt='temp' src={playlist?.coverImage}></img>
          </div>
          <div className="SGPL-Top-Right">
            <h3 className="SGPL-Title">{playlist?.title}</h3>
            <p className="SGPL-Info">{songs.length} SONGS • {totalPlayTime(songs)}</p>
            <p className="SGPL-Description">{playlist?.description}</p>
            <div className="SGPL-Buttons">
              <div className="SGPL-Play-Button" onClick={((e) => addQueue())}>
                <i className="fa-solid fa-play fa-lrg SGPL-play"></i>
                <p className="SGPL-Play-Text" >Play</p>
              </div>
              <div className="SGPL-Shuffle-Button">
                <i className="fa-solid fa-shuffle fa-lrg SGPL-Shuffle"></i>
                <p className="SGPL-Shuffle-Text">Shuffle</p>
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
          {songs.map((song, i) =>
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
                  <div className="SGPL-icon-menu-div">
                    <i className="fa-solid fa-ellipsis SGPL-icon-menu"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="SGPL-Comments-Container">
          <div>
            <p className="SGPL-Bottom-text">{comments.length} Comments {errors.length ? <span style={{color:'red', fontSize:'12px'}}> -- {errors.length}</span> : null }</p>
          </div>
          <form onSubmit={handleSubmit}>
            <span class="material-symbols-outlined">account_circle</span>
            <input
            type='text'
            placeholder="Add a comment..."
            className="SGPL-Input-Comment-Field"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ></input>
            <button disabled={isDisabled()}>Submit</button>
          </form>
          <div className="SGPL-Comments-Area">
            {comments.map(comment =>
              <>
                <div className='SGPL-Profile-Comment-Container'>
                  <span class="material-symbols-outlined">account_circle</span>
                  <div>
                    <p className="SGPL-Comments">{comment.comment}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SinglePlaylist;
