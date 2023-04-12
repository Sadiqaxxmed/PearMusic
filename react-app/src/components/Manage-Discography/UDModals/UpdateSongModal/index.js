import React, { useState } from "react";
import ReactSelect from 'react-select';
import './UpdateSong.css'

const UpdateSong = () => {
    const GenreOptions = [
        { value: 'Pop', label: 'Pop' },
        { value: 'Rock', label: 'Rock' },
        { value: 'R&B', label: 'R&B' },
        { value: 'Hip-Hop', label: 'Hip-Hop' },
        { value: 'K-Pop', label: 'K-Pop' },
        { value: 'Country', label: 'Country' },
        { value: 'Folk', label: 'Folk' },
        { value: 'Jazz', label: 'Jazz' },
        { value: 'Heavy Metal', label: 'Heavy Metal' },
        { value: 'Funk', label: 'Funk' },
        { value: 'EDM', label: 'EDM' },
        { value: 'Disco', label: 'Disco' },
        { value: 'Trap', label: 'Trap' },
        { value: 'Grunge', label: 'Grunge' },
    ];

    const [title, setTitle] = useState('')
    const [genreValue, setGenreValue] = useState(null)

    const handleUpdate = () => {
        console.log('handle update func in update song modal')
        console.log(title)
        console.log(genreValue)
    }

    const handleGenreValueChange = (selectedOption) => {
        //console.log(selectedOption.value)
        setGenreValue(selectedOption.value);
    }
    return(
        <div className="US-Main-Wrapper">
            <div className="US-Title">Update Song</div>
            <input className="US-TitleInput" type="text" placeholder={title} value={title} onChange={((e)=> setTitle(e.target.value))}/>
            <ReactSelect 
                className="US-Genre"
                options={GenreOptions}
                value={genreValue}
                onChange={handleGenreValueChange}
            />
            <div className="US-Submit-Button" onClick={handleUpdate}>Update</div>
        </div>
    )
}

export default UpdateSong