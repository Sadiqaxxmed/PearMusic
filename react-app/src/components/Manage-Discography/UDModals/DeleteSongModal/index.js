import React from "react";

import './DeleteSong.css'
import pearMusicIcon from '../../../../images/pearMusicIcon.png'

const DeleteSong = () => {
    const handleDelete = () => {
        console.log('handle submit in delete song modal')
    }

    return(
        <div className='DS-Main-Wrapper' >
            <img className='DS-Icon' src={pearMusicIcon} alt='Pear Music Icon' style={{width:'55px'}}/>
            <p className="DS-Title">Are you sure you want to delete the song 'RapGod'</p>
            <div className="DS-Buttons">
                <div className="DS-Cancel-Button">Cancel</div>
                <div className="DS-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeleteSong