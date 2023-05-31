import React, { useEffect, useState } from "react";
import BadWords from 'bad-words';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkAllPlaylists, thunkDeletePlaylist, thunkDeleteSongPlaylist, thunkPlaylistSongs, thunkResetPlaylists, thunkSinglePlaylist } from "../../store/playlist";
import { thunkGetComments, thunkCreateComment, thunkResetComments, thunkDeleteComment } from "../../store/comment";
import { thunkNewQueue, thunkPlayNow } from "../../store/queue";
import { thunkResetSongs } from "../../store/song";

import OpenModalButton from "../OpenModalButton";
import UpdatePlaylist from "../Manage-Discography/UDModals/UpdatePlaylist";
import ColorThief from 'colorthief'
import loading from '../../images/loading.gif'
import './SinglePlaylist.css'



function SinglePlaylist() {
    const badWords = new BadWords();
    const dispatch = useDispatch();
    const { playlist_id } = useParams();
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});

    const history = useHistory()
    const userId = useSelector(state => state.session.user?.id)

    const songs = Object.values(useSelector(state => state.playlists.singlePlaylist))
    const playlist = Object.values(useSelector(state => state.playlists.playlistDetails))[0]
    const comments = Object.values(useSelector(state => state.comments.playlistComments))

    const [menuOpen, setMenuOpen] = useState(false)
    const [cardId, setCardId] = useState(null)
    const [openUDM, setOpenUDM] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [averageColor, setAverageColor] = useState("#00000");

    useEffect(async () => {
        const fetchData = async () => {
            setIsLoaded(false)
            await dispatch(thunkPlaylistSongs(playlist_id))
            await dispatch(thunkAllPlaylists())
            await dispatch(thunkGetComments(playlist_id))
            let res = await dispatch(thunkSinglePlaylist(playlist_id))
            if (res?.error) {
                history.push('/');
            }
            setIsLoaded(true)
        }
        fetchData()
    }, [dispatch, playlist_id])
    useEffect(() => {
        const getDominantColor = (url) => {
            const image = new Image();
            image.crossOrigin = 'Anonymous';
            image.src = url;

            image.addEventListener('load', () => {
                const colorThief = new ColorThief();
                const color = colorThief.getColor(image);
                const averageColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                setAverageColor(averageColor);
            });
        };

        if (playlist?.coverImage) {
            getDominantColor(playlist.coverImage);
        }
    }, [playlist?.coverImage]);
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

    function addQueue() {
        dispatch(thunkNewQueue(playlist_id))
    }
    function totalPlayTime(songs) {
        let minutes = 0;
        let seconds = 0;

        for (let i = 0; i < songs.length; i++) {
            let duration = songs[i].duration;
            minutes += Math.floor(duration);
            duration?.toString().split('.').forEach((second, i) => {
                if (i % 2 !== 0) {
                    seconds += parseInt(second);
                }
            });
        }

        return `${minutes} MINUTES, ${seconds} SECONDS`
    }
    function songTotalPlayTime(songs) {
        let minutes = 0;
        let seconds = 0;

        let duration = songs.duration;
        minutes = Math.floor(duration);
        seconds = duration?.toString().split('.')[1].toString().length < 2 ? seconds = `0${duration?.toString().split('.')[1].toString()}` : seconds = duration?.toString().split('.')[1].toString()
        return `${minutes}:${seconds}`
    }
    const DeletePlaylist = (playlistId, userId) => {
        dispatch(thunkDeletePlaylist(playlistId, userId))
        dispatch(thunkResetPlaylists())
        dispatch(thunkResetSongs())
        return history.push('/allPlaylist')
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
    const playNowFunc = (song) => {
        dispatch(thunkPlayNow(song))
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
        dispatch(thunkDeleteSongPlaylist(songId, playlistId))
    }
    

    function handleSubmit(e) {
        e.preventDefault()
        let error = {}

        if (comment.length === 0) error.length = 'Please provide a comment!'
        if (comment.length > 125) error.length = 'Comment must be less than 125 characters';
        if (badWords.isProfane(comment)) error.profanity = "Keegster doesn't approve of this language!"
        if (Object.values(error).length) return setErrors(error)
        dispatch(thunkCreateComment(comment, userId, playlist_id))
        setErrors({});
        setComment('');
        return
    }


    return (
        <>
            {!averageColor && !isLoaded ? (
                <img className='LoadingGIf' src={loading} alt="loading-gif" />
            ) : (
                !isMobile ? (
                    <div className="SGPL-Body">
                        <div className="gradient" style={{ background: `linear-gradient(to bottom, ${averageColor} 1%, rgb(31, 31, 31))` }} />

                        <div className="SGPL-Top">
                            <div className="SGPL-Top-Left">
                                <img className="SG-PL-Img" alt="temp" src={playlist?.coverImage} />
                            </div>
                            <div className="SGPL-Top-Right">
                                <h3 className="SGPL-Title">{playlist?.title}</h3>
                                <p className="SGPL-Info">{songs.length} SONGS • {totalPlayTime(songs)}</p>
                                <p className="SGPL-Description">{playlist?.description}</p>
                                <div className="SGPL-Buttons">
                                    <div className="SGPL-Play-Button" onClick={addQueue}>
                                        <i className="fa-solid fa-play fa-lrg SGPL-play"></i>
                                        <p className="SGPL-Play-Text">Play</p>
                                    </div>
                                    <div className="SGPL-Shuffle-Button">
                                        <p className="SGPL-Shuffle-Text" onClick={() => alert('***SHUFFLE FEATURE COMING SOON***')}>Shuffle</p> {/* Change back to shuffle when crud is complete */}
                                    </div>
                                    {userId === playlist?.owner_id && (
                                        <div className="SGPL-Owner-Buttons">
                                            <i
                                                id="song-icon-menu"
                                                className={openUDM ? "fa-solid fa-xmark" : "fa-solid fa-ellipsis"}
                                                onClick={() => setOpenUDM(!openUDM)}
                                            ></i>
                                            {openUDM && (
                                                <div>
                                                    <div className="SGPL-Menu-Wrapper">
                                                        <div className="SGPL-Menu-Btn-Wrapper">
                                                            <OpenModalButton
                                                                className="SGPL-Menu-Btn-Update"
                                                                buttonText="Update"
                                                                onButtonClick={() => setOpenUDM(false)}
                                                                modalComponent={<UpdatePlaylist playlist={playlist} />}
                                                            />
                                                        </div>
                                                        <div className="SGPL-Menu-Btn-Wrapper-End">
                                                            <div className="SGPL-Menu-Delete" onClick={() => DeletePlaylist(playlist.id, userId)}>&nbsp;&nbsp;Delete</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="SGPL-Bottom">
                            <div className="SGPL-Bottom-Title-Header">
                                <div className="SGPL-Bottom-Song-Header">
                                    <p className="SGPL-Bottom-text">Song</p>
                                </div>
                                <div className="SGPL-Bottom-Artist-Header">
                                    <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Artist</p>
                                </div>
                                <div className="SGPL-Bottom-Album-Header">
                                    <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Album</p>
                                </div>
                                <div className="SGPL-Bottom-Time-Header">
                                    <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Time</p>
                                </div>
                            </div>
                            {songs.map((song, i) => (
                                <div className={i % 2 === 0 ? "SGPL-Darker-Shade" : 'SGPL-No-Shade'} tabIndex="0" key={song.id}>
                                    <div className="SGPL-Bottom-Title-Header">
                                        <div className="SGPL-Bottom-Song-Header">
                                            <div className="SGPL-Bottom-Song">
                                                <img className="SG-Bottom-PL-Img" alt="temp" src={song.coverImage} onClick={() => playNowFunc(song)}></img>
                                                <p className="SGPL-Bottom-Song-text">{song.title}</p>
                                            </div>
                                        </div>
                                        <div className="SGPL-Bottom-Artist-Header">
                                            <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.artistName}</p>
                                        </div>
                                        <div className="SGPL-Bottom-Album-Header">
                                            <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.genre}</p>
                                        </div>
                                        <div className="SGPL-Time">
                                            <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{songTotalPlayTime(song)}</p>
                                        </div>
                                        <div className="SGPL-Delete-Div">
                                            {userId === playlist?.owner_id && <i className="fa-solid fa-xmark SGPL-delete-comment-icon" id="SGPL-Bottom-Info-Text" onClick={() => DeleteSong(song.id, playlist_id)}></i>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="SGPL-Comments-Container">
                            {/* comments */}
                            <div className="SGPL-Border-Top-Comments">
                                <p className="SGPL-Bottom-text">{comments.length} Comments</p>
                                {errors.length ? <p style={{ color: 'red', fontSize: '12px' }}> {`* ${errors.length}`}</p> : null}
                                {errors.profanity ? <p style={{ color: 'red', fontSize: '12px' }}> {`* ${errors.profanity}`}</p> : null}
                            </div>
                            <form onSubmit={handleSubmit} className="SGPL-User-Input-Comment-Container">
                                <div style={{ display: 'flex' }}>
                                    <span className="material-symbols-outlined SB-icons SGPL-current-user-profile-pic">account_circle</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="SGPL-Input-Comment-Field"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></input>
                                <button className="SGPL-Comment-Button">Submit</button>
                            </form>
                            <div className="SGPL-Comments-Area">
                                {comments.map((comment) => (
                                    <div className="SGPL-Profile-Comment-Container" key={comment.id}>
                                        <span className="material-symbols-outlined SB-icons SGPL-profile-pic-container">account_circle</span>
                                        <div className="SGPL-Comment-Container">
                                            <p className="SGPL-Comment">{comment.comment}</p>
                                            {userId === comment.owner_id && <i className="fa-solid fa-xmark SGPL-delete-comment-icon" onClick={() => deleteComment(comment.owner_id, comment.id, playlist_id)}></i>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) :
                    <div className="SGPL-Body">
                        <div className="gradient" style={{ background: `linear-gradient(to bottom, ${averageColor} 1%, rgb(31, 31, 31))` }} />
                        <div className="SGPL-Top">
                            <div className="SGPL-Top-Left">
                                <img className="SG-PL-Img" alt='temp' src={playlist?.coverImage}></img>
                            </div>
                            <div className="SGPL-Top-Right">
                                <div className="SGPL-Title-Wrap">
                                    <h3 className="SGPL-Title">{playlist?.title}</h3>
                                    <p className="SGPL-Info">{songs.length} SONGS • {totalPlayTime(songs)}</p>
                                </div>
                                <div className="SGPL-Buttons-M">
                                    <div className="SGPL-Play-Button" onClick={((e) => addQueue())}>
                                        <i className="fa-solid fa-play fa-lrg SGPL-play"></i>
                                    </div>
                                    {/* <div className="SGPL-Shuffle-Button"> */}
                                    {/* <p className="SGPL-Shuffle-Text" onClick={((e) => alert('***SHUFFLE FEATURE COMING SOON***'))}>Shuffle</p> Change back to shuffle when crud is complete */}
                                    {/* </div> */}
                                    {(userId == playlist?.owner_id) &&
                                        <div className="SGPL-Owner-Buttons">
                                            <i id="song-icon-menu" className={openUDM ? "fa-solid fa-xmark" : "fa-solid fa-ellipsis"} onClick={((e) => openUDM ? setOpenUDM(false) : setOpenUDM(true))}></i>
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
                        {/* //////////////////////////////////////// SONGS ///////////////////////////////////////////////////////////////////////////////////////////////*/}
                        <div className="SGPL-Bottom">
                            {songs.map((song, i) =>
                                <div className={i % 2 == 0 ? "SGPL-Darker-Shade" : 'SGPL-No-Shade'} tabIndex="0">
                                    <div className="SGPL-Bottom-Title-Header">
                                        <div className="SGPL-Bottom-Song-Header">
                                            <div className="SGPL-Bottom-Song">
                                                <img className="SG-Bottom-PL-Img" alt='temp' src={song.coverImage} onClick={() => playNowFunc(song)}></img>
                                                <div className="SG-Bottom-TA-Wrapper">
                                                    <p className="SGPL-Bottom-Song-text">{song.title}</p>
                                                    <p className="SGPL-Bottom-text" >{song.artistName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="SGPL-Delete-Div">
                                            {userId == playlist?.owner_id && <i className="fa-solid fa-xmark SGPL-delete-comment-icon" id="SGPL-Bottom-X" onClick={((e) => DeleteSong(song.id, playlist_id))}></i>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* /////////////////////////////////////////////////////////////// End ///////////////////////////////////////////////////////////////////////////////////////////////*/}

                        {/* ///////////////////////////////////////////////////////////// comments ///////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <div className="SGPL-Comments-Container">
                            <div className="SGPL-Border-Top-Comments">
                                <p className="SGPL-Bottom-text">{comments.length} Comments</p>
                                {errors.length ? <p style={{ color: 'red', fontSize: '12px' }}> {`* ${errors.length}`}</p> : null}
                                {errors.profanity ? <p style={{ color: 'red', fontSize: '12px' }}> {`* ${errors.profanity}`}</p> : null}
                            </div>
                            <form onSubmit={handleSubmit} className="SGPL-User-Input-Comment-Container">
                                <div style={{ display: 'flex' }}>
                                    <span className="material-symbols-outlined SB-icons SGPL-current-user-profile-pic">account_circle</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder="Add a comment..."
                                    className="SGPL-Input-Comment-Field"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></input>
                                <button className="SGPL-Comment-Button">Submit</button>
                            </form>
                            <div className="SGPL-Comments-Area">
                                {comments.map(comment =>
                                    <>
                                        <div className='SGPL-Profile-Comment-Container'>
                                            <span class="material-symbols-outlined SB-icons SGPL-profile-pic-container">account_circle</span>
                                            <div className="SGPL-Comment-Container">
                                                <p className="SGPL-Comment">{comment.comment}</p>
                                                {userId == comment.owner_id ? <i className="fa-solid fa-xmark SGPL-delete-comment-icon" onClick={() => deleteComment(comment.owner_id, comment.id, playlist_id)}></i> : null}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
            )}
        </>
    );
}

export default SinglePlaylist;
