import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkAllSongs } from "../../../store/song";
import loadingGif from "../../../images/pearloading.gif";
import "./SongForm.css";

function SignupFormModal() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [songTitle, setSongTitle] = useState('')
    const [songCoverImage, setSongCoverImage] = useState(null)
    const [songMp3, setSongMp3] = useState(null)
    const [genreValue, setGenreValue] = useState(null)
    const [loading, setLoading] = useState('hidden')
    const { closeModal } = useModal()

    const artistName = useSelector(state => state.session.user.username)
    const user = useSelector(state => state.session.user.id)


    const handleGenreValueChange = (selectedOption) => {
        setGenreValue(selectedOption.value);
    }

    function handleFileChange(event) {
        setSongMp3(event.target.files[0]);
    }

    function handleCoverFileChange(event) {
        setSongCoverImage(event.target.files[0])
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let err = {};

        const imageFormat = [
            ".jpg", ".jpeg", ".png", ".gif",
            ".bmp", ".tiff", ".psd", ".ai",
            ".eps", ".svg", ".pdf", ".ico",
            ".raw", ".webp"]

        const audioFormat = [
            ".mp3", ".wav", ".flac", ".aac",
            ".wma", ".ogg", ".m4a", ".amr",
            ".aiff", ".mid", ".midi", ".mpa",
            ".ra", ".ram", ".rpm", ".snd",
            ".au", ".dct", ".dvf", ".m4p",
            ".mpc", ".msv", ".sln", ".vox",
            ".webm"
        ]

        if (songTitle.length >= 16) err.titleLength = 'Song Title must be less than 16 characters'

        if (!imageFormat.some(ext => songCoverImage.name.endsWith(ext))) {
            err.coverImage = 'Please provide a valid image file'
        }

        if (!audioFormat.some(ext => songMp3.name.endsWith(ext))) {
            err.songFile = 'Please provide a valid audio file'
        }


        if (Object.values(err).length) return setErrors(err)

        setLoading('SF-Loading-GIF')

        const formData = new FormData();

        formData.append('songMp3', songMp3)
        formData.append('songCoverImage', songCoverImage)
        formData.append('title', songTitle)
        formData.append('genre', genreValue)
        formData.append('artistName', artistName)

        formData.append('User', user)

        const res = await fetch('/api/songs/singleSong', {
            method: "POST",
            body: formData
        });


        if (res.ok) {
            closeModal();
            dispatch(thunkAllSongs());
            return history.push('/browse');
        }
    };

    const GenreOptions = [
        { value: 'Pop', label: 'Pop' },
        { value: 'Rock', label: 'Rock' },
        { value: 'R&B', label: 'R&B' },
        { value: 'Rap', label: 'Rap' },
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
                        {errors.titleLength ? <div className="SF-Errors">* {errors.titleLength}</div> : null}
                        <div className="SF-Song-Title-Lable">Song Title:
                            <input type='text' className="SF-Song-Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />
                        </div>
                        {errors.coverImage ? <div className="SF-Errors">* {errors.coverImage}</div> : null}
                        <div> Cover Image:
                            <input className="SF-CoverImage" type='file' accept='image/*' onChange={handleCoverFileChange} required />

                        </div>
                        <div className="SF-Genre-Wrapper"> Genre:
                            <ReactSelect
                                className="SF-Genre"
                                options={GenreOptions}
                                value={GenreOptions.value}
                                onChange={handleGenreValueChange}
                            />
                        </div>
                        {errors.songFile ? <div className="SF-Errors">* {errors.songFile}</div> : null}
                        <div className="SF-Mp3-Wrapper"> Song File:
                            <input type='file' accept="audio/*" onChange={handleFileChange} required />
                        </div>
                        <button className='SF-Submit-Btn' type="submit">Submit</button>
                        <div className="SF-Loading-GIF-Container">
                            <img src={loadingGif} alt='loading-gif' className={loading}></img>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignupFormModal;
