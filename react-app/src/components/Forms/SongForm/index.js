import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkAllSongs } from "../../../store/song";
import loadingGif from "../../../images/pearloading.gif";
import "./SongForm.css";

import { useDropzone } from 'react-dropzone';
// import heic2any from 'heic2any'; // Import heic2any library


function SongForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const artistName = useSelector(state => state.session.user.username);
    const user = useSelector(state => state.session.user.id);

    const handleCloseModal = () => { setShowModal(false); }; // Set the state to close the modal
    const handleGenreValueChange = (selectedOption) => { setGenreValue(selectedOption.value); };

    const [errors, setErrors] = useState({});
    const [songTitle, setSongTitle] = useState('');
    const [songCoverImage, setSongCoverImage] = useState(null);
    const [songMp3, setSongMp3] = useState(null);
    const [genreValue, setGenreValue] = useState(null);
    const [loading, setLoading] = useState('hidden');
    const [isMobile, setIsMobile] = useState(false);
    const [coverPreview, setCoverPreview] = useState(null);
    const [songPreview, setSongPreview] = useState(null);
    const [showModal, setShowModal] = useState(true);
    const { closeModal } = useModal()

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
        { value: 'Alternative', label: 'Alternative' }
    ];
    const imageFormat = [
        ".jpg", ".jpeg", ".png", ".gif",
        ".bmp", ".tiff", ".psd", ".ai",
        ".eps", ".svg", ".pdf", ".ico",
        ".raw", ".webp"
    ];
    const audioFormat = [
        ".mp3", ".wav", ".flac", ".aac",
        ".wma", ".ogg", ".m4a", ".amr",
        ".aiff", ".mid", ".midi", ".mpa",
        ".ra", ".ram", ".rpm", ".snd",
        ".au", ".dct", ".dvf", ".m4p",
        ".mpc", ".msv", ".sln", ".vox",
        ".webm"
    ];



    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1050); // Adjust the value according to your mobile range
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const handleCoverFileChange = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (isImageFile(file)) {
            setSongCoverImage(file);
            delete errors.coverImage
        }
        else return errors.coverImage = 'not a valid image file'

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = (event) => {
            // Set the file preview as data URL
            setCoverPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    const handleFileChange = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (isAudioFile(file)) {
            setSongMp3(file);
            delete errors.mp3
        }
        else return errors.mp3 = 'not a valid mp3 file'

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = (event) => {
            // Set the file preview as data URL
            setSongPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    function isAudioFile(songFile) {
        if (!audioFormat?.some(ext => songFile?.name.endsWith(ext))) {
            return false
        } else {
            return true
        }
    }
    function isImageFile(file) {
        if (!imageFormat?.some(ext => file?.name.endsWith(ext))) {
            return false
        }
        else if (songCoverImage?.name.endsWith('.HEIC')) {
            errors.coverImage = ('HEIC')
        }
        else {
            return true
        }
    }
    const isFormValid = () => {
        return (
            songTitle.trim().length > 0 &&
            genreValue !== null &&
            songCoverImage !== null &&
            songMp3 !== null 
        );
    };

    const {
        getRootProps: getCoverRootProps,
        getInputProps: getCoverInputProps,
        isDragActive: isCoverDragActive,
        isDragAccept: isCoverDragAccept,
        isDragReject: isCoverDragReject
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: handleCoverFileChange
    });
    const {
        getRootProps: getSongRootProps,
        getInputProps: getSongInputProps,
        isDragActive: isSongDragActive,
        isDragAccept: isSongDragAccept,
        isDragReject: isSongDragReject
    } = useDropzone({
        accept: 'audio/mpeg, audio/wav',
        onDrop: handleFileChange
    });

    //SUBMIT LOGIC///////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();
        let err = {};

        if (songTitle?.length >= 16) err.titleLength = 'Song Title must be less than 16 characters';

        if (songCoverImage.name.endsWith('.HEIC')) {
            return console.log(songCoverImage)

        } if (!imageFormat?.some(ext => songCoverImage?.name.endsWith(ext))) {
            err.coverImage = 'Please provide a valid image file';
        } else if (songCoverImage?.name.endsWith('.HEIC')) {
            err.coverImage = ('HEIC')
        }

        if (!audioFormat?.some(ext => songMp3?.name.endsWith(ext))) {
            err.songFile = 'Please provide a valid audio file';
        }

        if (Object.values(err).length) return setErrors(err);

        setLoading('SF-Loading-GIF');

        const formData = new FormData();
        formData.append('songMp3', songMp3);
        formData.append('songCoverImage', songCoverImage);
        formData.append('title', songTitle);
        formData.append('genre', genreValue);
        formData.append('artistName', artistName);
        formData.append('User', user);

        const res = await fetch('/api/songs/singleSong', {
            method: "POST",
            body: formData
        });
        // console.log('////////////////',res )
        if (res.ok) {
            closeModal();
            dispatch(thunkAllSongs());
            return history.push('/browse');
        } else {
            setLoading('hidden')
            err.submit = 'Error with submission please try again'
            setErrors(err)
        }
    };
    //SUBMIT LOGIC///////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            {showModal && (
                <div className='SF-Wrapper'>
                    <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x' />
                    <h1 className="SF-Title">Upload Song</h1>
                    {errors.submit ? <div className="SF-Errors">* {errors.submit} *</div> : null}
                    <form className='SF-Form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        {errors.titleLength ? <div className="SF-Errors">* {errors.titleLength}</div> : null}
                        <div className='SF-Song-Title-Lable'>Track Name
                            <input
                                type="text"
                                name="songTitle"
                                onChange={(e) => setSongTitle(e.target.value)}
                                value={songTitle}
                                placeholder="Title"
                                className="SF-Song-Title"
                            />
                            {errors.songTitle && <p className="error-message">Please enter a song title.</p>}
                        </div>

                        <div className='SF-Genre-Wrapper'>
                            <ReactSelect
                                className="SF-Genre"
                                options={GenreOptions}
                                onChange={handleGenreValueChange}
                                value={GenreOptions.find((option) => option.value === genreValue)}
                                placeholder="Genre"
                            />
                            {errors.genre && <p className="error-message">Please select a genre.</p>}
                        </div>

                        <div className="SF-CoverImageFileInput-Wrapper">
                            <div id='SF-CoverImageFileInput' {...getCoverRootProps({ className: `dropzone ${isCoverDragActive ? "active" : ""} ${isCoverDragAccept ? "accept" : ""} ${isCoverDragReject ? "reject" : ""}` })}>
                                <input {...getCoverInputProps()} />
                                {!isCoverDragActive && !coverPreview && (<i class="fa-solid fa-image" id='CI-Cloud'></i>)}
                                {!isCoverDragActive && !coverPreview && !errors.coverImage && (<p>Tap or drop a cover image here</p>)}
                                {errors.coverImage && <p className="error-message" style={{ color: 'red' }}>Invalid file format for cover image. Please upload a JPEG or PNG file.</p>}
                                {coverPreview && <div className="CoverImage-InnerBox"><img src={coverPreview} alt="Cover Preview" className="CoverImgPreview" /></div>}
                            </div>
                        </div>

                        <div className="SF-SongInput-Wrapper"></div>
                        <div id='SF-SongInput' {...getSongRootProps({ className: `dropzone ${isSongDragActive ? "active" : ""} ${isSongDragAccept ? "accept" : ""} ${isSongDragReject ? "reject" : ""}` })}>
                            <input {...getSongInputProps()} />
                            {!isSongDragActive && !songPreview && (<i class="fa-solid fa-music" id='CI-Cloud'></i>)}
                            {!isSongDragActive && !songPreview && !errors.mp3 && (<p>Tap or drop your song file here</p>)}
                            {errors.mp3 && <p className="error-message" style={{ color: 'red' }}>Invalid file format for song file. Please upload an MP3 or WAV file.</p>}
                            {songPreview && <div className="Song-InnerBox"><audio src={songPreview} controls className="SongPreview" /></div>}
                        </div>


                        <button className='SF-Submit-Btn' type="submit" disabled={!isFormValid()}>Submit</button>
                        <div className="SF-Loading-GIF-Container">
                            <img src={loadingGif} alt='loading-gif' className={loading}></img>
                        </div>
                    </form>

                </div>
            )}
        </>
    );

}

export default SongForm;