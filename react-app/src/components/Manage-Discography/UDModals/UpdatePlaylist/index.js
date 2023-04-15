import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import './UpdatePlaylist.css'
import pearMusicIcon from '../../../../images/pearMusicIcon.png'
import { thunkAllPlaylists, thunkSinglePlaylist, thunkUpdatePlaylist, thunkUserPlaylists } from "../../../../store/playlist";
import { useModal } from "../../../../context/Modal";

const UpdatePlaylist = ({ playlist }) => {
    console.log(playlist)
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id)
    const [title, setTitle] = useState(playlist ? playlist.title : '')
    const [description, setDescription] = useState(playlist ? playlist.description : '')
    const playlistId = playlist.id
    const coverImage = playlist.coverImage
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkSinglePlaylist(playlistId))
        console.log('1111111111111')
    }, [dispatch])

    console.log('there' , playlistId)


    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(thunkUpdatePlaylist({ title, description,coverImage}, playlistId,userId))
        return closeModal()
    }

    return (
        <div className='UP-Main-Wrapper' >
            {/* <img className='UP-Icon' src={pearMusicIcon} alt='Pear Music Icon' style={{ width: '55px' }} /> */}
            <div className="UP-Main-Wrapper">
                <div className="UP-Title">Update Playlist</div>
                    <div className="UP-Title-Input-Wrapper">
                        <h4 className="UP-Tag">Title:</h4>
                        <input className="UP-Description-Input" type="text" placeholder={title} value={title} onChange={((e) => setTitle(e.target.value))} />
                    </div>
                    <div className="UP-Description-Input-Wrapper">
                        <h4 className="UP-Tag">Description:</h4>
                        <textarea className="UP-Title-Input" placeholder={description} value={description} onChange={((e) => setDescription(e.target.value))} />
                    </div>
                {/* <input className="UP-CoverImage" type="text" placeholder={coverImage} value={coverImage} onChange={((e) => setCoverImage(e.target.value))} /> */}
                <div className="UP-Submit-Button" onClick={handleUpdate}>Update</div>
            </div>
        </div>
    )
}

export default UpdatePlaylist
