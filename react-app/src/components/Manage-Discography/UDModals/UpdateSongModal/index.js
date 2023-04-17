import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from 'react-select';
import './UpdateSong.css'
import { thunkUpdateSong } from "../../../../store/song";
import { useModal } from "../../../../context/Modal";

const UpdateSong = (song) => {

    const dispatch = useDispatch()

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
    const [title, setTitle] = useState(song.song.title)
    const [genreValue, setGenreValue] = useState(song.song.genre)
    const [errors, setErrors] = useState({});
    const songId = song.song.id
    const userId = useSelector(state => state.session.user.id)
    const { closeModal } = useModal();




    const handleUpdate = (e) => {
        e.preventDefault()
        let err = {};
        if (title.length >= 16) err.title = '* Song Title must be less than 16 characters'
        if (err.title) return setErrors(err)

        dispatch(thunkUpdateSong({songId,userId,title,genreValue}))
        closeModal()
    }

    const handleGenreValueChange = (selectedOption) => { setGenreValue(selectedOption.value); }
    return (
        <div className="US-Main-Wrapper">
            <div className="US-Title">
                <h3>Update Song</h3>
            </div>
            <label>
                { errors.title ? <p style={{color:'red', marginBottom:'10px', marginTop:'0'}}>{errors.title}</p> : null }
                <p className="US-input-field">Song Title:</p>

                <input className="US-TitleInput" type="text" placeholder={title} value={title} onChange={((e)=> setTitle(e.target.value))}/>
            </label>

            <div className="US-update-info">
            <div className="US-Genre-div">
            <label className="US-Genre-label">
                <p className="US-input-field">Genre:</p>

            <ReactSelect
                className="US-Genre"
                options={GenreOptions}
                value={GenreOptions.value}
                defaultInputValue={genreValue}
                onChange={handleGenreValueChange}
            />
            </label>
            </div>
            </div>
            <div className="US-Submit-Button" onClick={handleUpdate}>Update</div>
        </div>
    )
}

export default UpdateSong
