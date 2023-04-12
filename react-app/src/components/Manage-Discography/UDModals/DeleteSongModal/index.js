import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteSong } from "../../../../store/song";

import './DeleteSong.css'
import pearMusicIcon from '../../../../images/pearMusicIcon.png'

const DeleteSong = (song) => {
    const dispatch = useDispatch();

    const songTitle = song.songId.song.title
    const userId = useSelector(state => state.session.user.id)
    const songId = song.songId.song.id

    const handleDelete = (e) => {
        e.preventDefault();
        // console.log('delete song start')
        // console.log({songId, userId})
        dispatch(thunkDeleteSong({songId, userId}))
        // console.log('delete song end')
    }

    return(
        <div className='DS-Main-Wrapper' >
            <img className='DS-Icon' src={pearMusicIcon} alt='Pear Music Icon' style={{width:'55px'}}/>
            <p className="DS-Title">Are you sure you want to delete the song - {songTitle}?</p>
            <div className="DS-Buttons">
                <div className="DS-Cancel-Button">Cancel</div>
                <div className="DS-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeleteSong