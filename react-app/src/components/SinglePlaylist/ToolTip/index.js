import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './ToolTip.css'
import { thunkDeleteSongPlaylist } from "../../../store/playlist";


function ToolTip({song,playlistId}) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user?.id)
    const songId = song.id
    // adds song to queue (need to add functionality to close menu once a button is clikced and an action is completed but for now its fine)
    // function addToQueue(song) {
    //     dispatch(thunkAddSong(song.song))
    //     return console.log('song added to queue')
    // }

    const deleteSong = async (songId,playlistId) => {
        console.log('hit')
        dispatch(thunkDeleteSongPlaylist(songId,playlistId))
    }

    return (
        <div>
            <div className='TTM-Main-Wrapper'>
                <div className="TTM-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                    <div className='TTM-AddToQueue' onClick={((e) => console.log('bass'))}>&nbsp;Add to queue</div>
                </div>
                <div className="TTM-Btn-Wrapper" > {/* open extra menu with all user playlists */}
                    <div className='TTM-Delete' onClick={((e) => deleteSong(songId,playlistId))}>&nbsp;Remove from playlist</div>
                </div>
            </div>
        </div>
    )

}

export default ToolTip