import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './ToolTipMenu.css'

import { thunkUserPlaylists,thunkResetPlaylists, thunkCreatePlaylist } from "../../store/playlist";
import { func } from "prop-types";
import { thunkAddSong } from "../../store/queue";


function ToolTipMenu(song) {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user?.id)
    const userPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists))
    const songId = song.song.id

    const [outerDivClassName, setOuterDivClassName] = useState('TTM-Main-Wrapper-DIF');
    const [showPlaylists, setShowPlaylists] = useState(false)

    useEffect(() => {
        dispatch(thunkUserPlaylists(userId))

    }, [dispatch, userId])

    // adds song to playlist (need to make menu close after action is complete)
    function AddToPlaylist(songId,playlistId){
        console.log('songID=>>>>>>>>>>>', songId)
        console.log('playlistId=>>>>>>>>>>>', playlistId)
    }

    // adds song to queue (need to add functionality to close menu once a button is clikced and an action is completed but for now its fine)
    function addToQueue(song){
        dispatch(thunkAddSong(song.song))
        return console.log('song added to queue')
    }

    const createPlaylist = async (songId) => {
        const playlistId = await dispatch(thunkCreatePlaylist(songId))
        console.log('CREATED PLAYLIST', playlistId)
        history.push(`/SinglePlaylist/${playlistId}`)
    }

    // handles playlists menu pop out on 'add to playlist btn' click (need to add functionality to close menu once a button is clikced and an action is completed but for now its fine)
    function handlePopOut() {
        if (!showPlaylists) {
            setShowPlaylists(true)
        } else {
            setShowPlaylists(false)
        }
    }

    return (
        <div>
            <div className={outerDivClassName}>
                <div className="TTM-Btn-Wrapper"> {/* create playlist and redirect user to that new playlist */}
                    <div className='TTM-Create-Playlist' onClick={((e) => createPlaylist(songId))}>&nbsp;Create playlist</div>
                </div>
                <div className="TTM-Btn-Wrapper" > {/* open extra menu with all user playlists */}
                    <div className='TTM-AddToPlaylist' onClick={((e) => handlePopOut())}>&nbsp;Add to playlist{`->`} </div>
                </div>
                <div className="TTM-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                    <div className='TTM-AddToQueue' onClick={((e) => addToQueue(song))}>&nbsp;Add to queue</div>
                </div>
                <div className="TTM-Btn-Wrapper" > {/* redirect to a page of jennies or a jennie only playlist */}
                    <div className='TTM-Jennie' onClick={((e) => console.log("JENNIE JENNIE JENNIE JENNIE"))}>&nbsp;JENNIE</div>
                </div>
                <div className="TTM-Btn-Wrapper-End">  {/* redirect to keegsters playlist */}
                    <div className='TTM-Keegster' onClick={((e) => console.log('KEEGSTER KEEGSTER KEEGSTER KEEGSTER'))}>&nbsp;KEEGSTER</div>
                </div>
            </div>
            {/* pop out menu for user playlists to add song to a specific playlist */}
            <div className={`pop-out-menu${showPlaylists ? '-open' : ''}`}>
                <div className="POM-BTN-Wrapper-Title">Playlists</div>
                {userPlaylists.map(playlist => 
                    <div className="POM-BTN-Wrapper" key={playlist.id} onClick={((e)=>AddToPlaylist(songId,playlist.id))}>{playlist.title}</div>
                )}
            </div>
        </div>
    )

}

export default ToolTipMenu