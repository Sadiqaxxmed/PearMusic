import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteSong } from "../../../../store/song";

import './DeleteSong.css'
import pearMusicIcon from '../../../../images/pearMusicIcon.png'
import { useModal } from "../../../../context/Modal";

const DeleteSong = (song) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const userId = useSelector(state => state.session.user.id)

    const songTitle = song.song.title
    const songId = song.song.id

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteSong({songId, userId}))
        closeModal()
    }

    return(
        <div className='DS-Main-Wrapper' >
            <img className='DS-Icon' src={pearMusicIcon} alt='Pear Music Icon' style={{width:'55px'}}/>
            <p className="DS-Title">Are you sure you want to delete the song - {songTitle}?</p>
            <div className="DS-Buttons">
                <div className="DS-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="DS-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeleteSong
