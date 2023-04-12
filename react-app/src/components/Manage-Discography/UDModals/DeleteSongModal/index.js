import React from "react";

import './DeleteSong.css'

const DeleteSong = () => {
    const handleDelete = () => {
        console.log('handle submit in delete song modal')
    }

    return(
        <div className='DS-Main-Wrapper' >
            <h1 className="DS-Title">ARE YOU SURE?</h1>
            <div className="DS-Button" onClick={handleDelete}>DELETE THIS SONG</div>
        </div>
    )
}

export default DeleteSong