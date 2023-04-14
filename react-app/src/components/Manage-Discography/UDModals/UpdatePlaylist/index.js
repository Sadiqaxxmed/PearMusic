import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import './UpdatePlaylist.css'
import pearMusicIcon from '../../../../images/pearMusicIcon.png'
import { thunkUpdatePlaylist } from "../../../../store/playlist";

const UpdatePlaylist = ({playlistId}) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverImage, setCoverImage] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(thunkUpdatePlaylist({title,description,coverImage}, playlistId))

    }

    return (
        <div className='UP-Main-Wrapper' >
            {/* <img className='UP-Icon' src={pearMusicIcon} alt='Pear Music Icon' style={{ width: '55px' }} /> */}
            <div className="UP-Main-Wrapper">
                <div className="UP-Title">Update Playlist</div>
                    <input className="UP-Title" type="text" placeholder={title} value={title} onChange={((e) => setTitle(e.target.value))} />
                    <input className="UP-Description" type="text" placeholder={title} value={description} onChange={((e) => setDescription(e.target.value))} />
                    <input className="UP-CoverImage" type="text" placeholder={title} value={coverImage} onChange={((e) => setCoverImage(e.target.value))} />
                <div className="UP-Submit-Button" onClick={handleUpdate}>Update</div>
            </div>
        </div>
    )
}

export default UpdatePlaylist
