import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SongForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [songTitle, setSongTitle] = useState('')
    const [songCoverImage, setSongCoverImage] = useState(null)
    const [songMp3, setSongMp3] = useState(null)
    const [genreValue, setGenreValue] = useState(null)
    const { closeModal } = useModal();

    const handleGenreValueChange = (selectedOption) => {
        setGenreValue(selectedOption);
    }

    function handleFileChange(event) {
        setSongCoverImage(event.target.files[0]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log('COVER IMAGE FILE  :   ', e)

        const formData = new FormData();
        formData.append('coverImage', songCoverImage)
        formData.append('songMp3', songMp3)
        formData.append('title', songTitle)
        formData.append('genre', genreValue)


        console.log(formData) // FormData{}

        // const res = await fetch('/songs/singleSong', {
        //     method: "POST",
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(songData),
        // });
        // console.log('RESPONSE', await res.json())
        return;
    };

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


    const [showModal, setShowModal] = useState(true);
    const handleCloseModal = () => {
        setShowModal(false); // Set the state to close the modal
    }

    return (
        <>
            {showModal && (
                <div className="SF-Wrapper">
                    <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x' />
                    <h1 className="SF-Title">Upload Song</h1>

                    <form className='SF-Form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        <div className="SF-Errors">
                            {errors.map((error, idx) => (
                                <p key={idx}>{error}</p>
                            ))}
                        </div>
                        <div className="SF-Song-Title-Lable">Song Title:
                            <input type='text' className="SF-Song-Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />
                        </div>
                        <div> Cover Image:
                            <input className="SF-CoverImage" type='file' accept='image/*' onChange={handleFileChange} required />

                        </div>
                        <div className="SF-Genre-Wrapper"> Genre:
                            <ReactSelect
                                className="SF-Genre"
                                options={GenreOptions}
                                value={genreValue}
                                onChange={handleGenreValueChange}
                            />
                        </div>
                        <div className="SF-Mp3-Wrapper"> Song File:
                            <input className="SF-Mp3" type='file' onChange={(e) => setSongMp3(e.target.files[0].name)} required />
                        </div>
                        <button className='SF-Submit-Btn' type="submit">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignupFormModal;
