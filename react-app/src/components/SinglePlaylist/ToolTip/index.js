import { useDispatch } from "react-redux";
import './ToolTip.css'
import { thunkDeleteSongPlaylist } from "../../../store/playlist";


function ToolTip({song,playlistId}) {
    const dispatch = useDispatch()
    const songId = song.id

    const deleteSong = async (songId,playlistId) => {
        dispatch(thunkDeleteSongPlaylist(songId,playlistId))
    }

    return (
        <div>
            <div className='TTM-Main-Wrapper'>
                <div className="TTM-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                    <div className='TTM-AddToQueue'>&nbsp;Add to queue</div>
                </div>
                <div className="TTM-Btn-Wrapper" > {/* open extra menu with all user playlists */}
                    <div className='TTM-Delete' onClick={((e) => deleteSong(songId,playlistId))}>&nbsp;Remove from playlist</div>
                </div>
            </div>
        </div>
    )

}

export default ToolTip
