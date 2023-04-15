import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './SinglePlaylist.css'


import { thunkAllPlaylists, thunkDeletePlaylist, thunkDeleteSongPlaylist, thunkPlaylistSongs, thunkSinglePlaylist } from "../../store/playlist";
import { thunkGetComments, thunkCreateComment, thunkResetComments, thunkDeleteComment } from "../../store/comment";


import { thunkNewQueue } from "../../store/queue";
import ToolTip from "./ToolTip";
import { func } from "prop-types";
import OpenModalButton from "../OpenModalButton";
import UpdatePlaylist from "../Manage-Discography/UDModals/UpdatePlaylist";

function SinglePlaylist() {
  const dispatch = useDispatch();
  const { playlist_id } = useParams();
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory()
  const userId = useSelector(state => state.session.user?.id)

  const songs = Object.values(useSelector(state => state.playlists.singlePlaylist))
  const playlist = Object.values(useSelector(state => state.playlists.playlistDetails))[0]
  const comments = Object.values(useSelector(state => state.comments.playlistComments))

  console.log('INSIDE THE COMPONENT', playlist)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cardId, setCardId] = useState(null)
  const [openUDM, setOpenUDM] = useState(false)

  useEffect(() => {
    dispatch(thunkPlaylistSongs(playlist_id))
    dispatch(thunkAllPlaylists())
    dispatch(thunkSinglePlaylist(playlist_id))
    dispatch(thunkGetComments(playlist_id))

    return () => {
      dispatch(thunkResetComments())
    }
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


  const DeletePlaylist = async (playlistId, userId) => {
    dispatch(thunkDeletePlaylist(playlistId, userId))
    history.push('/allPlaylist')
  }


  const DeleteSong = (songId, playlistId) => {
    dispatch(thunkDeleteSongPlaylist(songId, playlistId))
    setOpenUDM(false)
  }


  function openMenuFunc(id) {
    if (!menuOpen) {
      setMenuOpen(true)
      setCardId(id)
    } else {
      setMenuOpen(false)
      setCardId(null)
    }

  }

  totalPlayTime(songs)

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

  function deleteComment(ownerId, commentId, playlistId) {
    if (userId === ownerId) {
      dispatch(thunkDeleteComment(commentId, playlistId))
      dispatch(thunkResetComments())
    }
    else {
      alert('This aint yours bud')
    }
  }

  const deleteSong = async (songId, playlistId) => {
    console.log('hit')
    dispatch(thunkDeleteSongPlaylist(songId, playlistId))
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
                <p className="SGPL-Play-Text">Play</p>
              </div>
              <div className="SGPL-Shuffle-Button">
                <p className="SGPL-Shuffle-Text" onClick={((e) => alert('***SHUFFLE FEATURE COMING SOON***'))}>Shuffle</p> {/* Change back to shuffle when crud is complete */}
              </div>
              {(userId == playlist?.owner_id) &&
                <div className="SGPL-Owner-Buttons">
                  <i id="song-icon-menu" className="fa-solid fa-ellipsis" onClick={((e) => openUDM ? setOpenUDM(false) : setOpenUDM(true))}></i>
                  {openUDM &&
                    <div >
                      <div className='SGPL-Menu-Wrapper'>
                        <div className="SGPL-Menu-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                          <OpenModalButton
                            className='SGPL-Menu-Btn-Update'
                            buttonText={`Update`}
                            onButtonClick={((e) => setOpenUDM(false))}
                            modalComponent={<UpdatePlaylist playlist={playlist} />}
                          />
                        </div>
                        <div className="SGPL-Menu-Btn-Wrapper-End" > {/* open extra menu with all user playlists */}
                          <div className='SGPL-Menu-Delete' onClick={((e) => DeletePlaylist(playlist.id, userId))}>&nbsp;&nbsp;Delete</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
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
                </div>
                <div className="SGPL-Delete-Div">
                {userId == playlist?.owner_id && <i class="fa-solid fa-xmark SGPL-delete-comment-icon" id="SGPL-Bottom-Info-Text"onClick={((e) => DeleteSong(song.id, playlist_id))}></i>}
                  {/*<i id="song-icon-menu" className="fa-solid fa-ellipsis" onClick={((e) => openMenuFunc(song.id))}></i>
                      {menuOpen && (song.id == cardId) &&
                      <div>
                        <div className='TTM-Main-Wrapper'>
                          <div className="TTM-Btn-Wrapper"> 
                            <div className='TTM-AddToQueue' onClick={((e) => console.log('bass'))}>&nbsp;Add to queue</div>
                          </div>
                          <div className="TTM-Btn-Wrapper" >
                            <div className='TTM-Delete' onClick={((e) => deleteSong(song.id, playlist.id))}>&nbsp;Remove from playlist</div>
                          </div>
                        </div>
                      </div>
                    } 
                    */}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="SGPL-Comments-Container">


          {/* comments */}
          <div className="SGPL-Border-Top-Comments">

            <p className="SGPL-Bottom-text">{comments.length} Comments {errors.length ? <span style={{ color: 'red', fontSize: '12px' }}> -- {errors.length}</span> : null}</p>
          </div>
          <form onSubmit={handleSubmit} className="SGPL-User-Input-Comment-Container">
            <div style={{ display: 'flex' }}>
              <span class="material-symbols-outlined SB-icons SGPL-current-user-profile-pic">account_circle</span>
            </div>
            <input
              type='text'
              placeholder="Add a comment..."
              className="SGPL-Input-Comment-Field"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button disabled={isDisabled()} style={{ marginBottom: '10px' }}>Submit</button>
          </form>
          <div className="SGPL-Comments-Area">
            {comments.map(comment =>
              <>
                <div className='SGPL-Profile-Comment-Container'>
                  <span class="material-symbols-outlined SB-icons SGPL-profile-pic-container">account_circle</span>
                  <div className="SGPL-Comment-Container">
                    <p className="SGPL-Comment">{comment.comment}</p>
                    {userId == comment.owner_id ? <i class="fa-solid fa-xmark SGPL-delete-comment-icon" onClick={() => deleteComment(comment.owner_id, comment.id, playlist_id)}></i> : null}
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
