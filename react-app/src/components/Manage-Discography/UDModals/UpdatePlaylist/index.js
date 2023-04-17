import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import './UpdatePlaylist.css'
import { thunkSinglePlaylist, thunkUpdatePlaylist } from "../../../../store/playlist";
import { useModal } from "../../../../context/Modal";

const UpdatePlaylist = ({ playlist }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id)
    const [title, setTitle] = useState(playlist ? playlist.title : '')
    const [description, setDescription] = useState(playlist ? playlist.description : '')
    const [errors, setErrors] = useState({});
    const playlistId = playlist.id
    const coverImage = playlist.coverImage
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkSinglePlaylist(playlistId))
    }, [dispatch, playlistId])

    const handleUpdate = (e) => {
        e.preventDefault();
        let err = {};

        if (title.length >= 16) err.title = "* Playlist title must be less than 16 characters"
        if (description.length >= 75) err.description = "* Description must be less than 75 characters"
        if (err.title || err.description) return setErrors(err)

        dispatch(thunkUpdatePlaylist({ title, description, coverImage }, playlistId, userId))
        return closeModal()
    }

    return (
        <div className='UP-Main-Wrapper' >
            {/* <img className='UP-Icon' src={pearMusicIcon} alt='Pear Music Icon' style={{ width: '55px' }} /> */}
            <div className="UP-Main-Wrapper">
                <div className="UP-Title">Update Playlist</div>
                <div className="UP-Title-Input-Wrapper">
                    {errors.title ? <p style={{ color: 'red', fontSize: '12px', marginBottom:'0' }}>{errors.title}</p> : null}
                    <h4 className="UP-Tag" style={{marginTop:'6px'}}>Title:</h4>
                    <input className="UP-Description-Input" type="text" placeholder={title} value={title} onChange={((e) => setTitle(e.target.value))} />
                </div>
                <div className="UP-Description-Input-Wrapper">
                    {errors.description ? <p style={{ color: 'red', fontSize: '12px', marginBottom:'0' }}>{errors.description}</p> : null}
                    <h4 className="UP-Tag" style={{marginTop:'6px'}}>Description:</h4>
                    <textarea className="UP-Title-Input" placeholder={description} value={description} onChange={((e) => setDescription(e.target.value))} />
                </div>
                <div className="UP-Submit-Button" onClick={handleUpdate}>Update</div>
            </div>
        </div>
    )
}

export default UpdatePlaylist
