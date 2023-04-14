import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './ToolTipMD.css'
import { thunkDeletePlaylist, thunkDeleteSongPlaylist } from "../../../store/playlist";
import UpdatePlaylist from '../UDModals/UpdatePlaylist'
import OpenModalButton from "../../OpenModalButton";

function ToolTipMD(playlist) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user?.id)
    // adds song to queue (need to add functionality to close menu once a button is clikced and an action is completed but for now its fine)
    // function addToQueue(song) {
    //     dispatch(thunkAddSong(song.song))
    //     return console.log('song added to queue')
    // }
    console.log(playlist.playlistId)
    const deletePlaylist = async (playlistId) => {
        console.log('hit')
        dispatch(thunkDeletePlaylist(playlistId))
    }

    // const updatePlaylist = async (playlistId) => {
    //     console.log('hit')

    // }

    return (
        <div>
            <div className='TTM-Main-Wrapper'>
                <div className="TTM-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                    <OpenModalButton
                        buttonText="Update"
                        onButtonClick={''}
                        modalComponent={<UpdatePlaylist playlistId={playlist.playlistId} />}
                    />
                </div>
                <div className="TTM-Btn-Wrapper" > {/* open extra menu with all user playlists */}
                    <div className='TTM-Delete' onClick={((e) => deletePlaylist(playlist.playlistId))}>&nbsp;Delete</div>
                </div>
            </div>
        </div>
    )

}

export default ToolTipMD