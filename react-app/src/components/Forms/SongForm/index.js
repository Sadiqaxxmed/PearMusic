import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkAllSongs } from "../../../store/song";
import loadingGif from "../../../images/pearloading.gif";
import "./SongForm.css";

import Dropzone from 'react-dropzone';
// import heic2any from 'heic2any'; // Import heic2any library


function SignupFormModal() {
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
        { value: 'Grunge', label: 'Grunge' }
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
        setSongCoverImage(file);

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
        setSongMp3(file);

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = (event) => {
            // Set the file preview as data URL
            setSongPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    function isAudioFile() {
        if (!audioFormat?.some(ext => songMp3?.name.endsWith(ext))) {
            return false
        } else {
            return true
        }
    }
    function isImageFile() {
        if (!imageFormat?.some(ext => songCoverImage?.name.endsWith(ext))) {
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
            songMp3 !== null &&
            isAudioFile() &&
            isImageFile()
        );
    };

    //SUBMIT LOGIC///////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();
        let err = {};

        if (songTitle?.length >= 16) err.titleLength = 'Song Title must be less than 16 characters';

        if (songCoverImage.name.endsWith('.HEIC')) {
            return console.log(songCoverImage)

        } if (!imageFormat?.some(ext => songCoverImage?.name.endsWith(ext))) {
            err.coverImage = 'Please provide a valid image file';
        } else if (songCoverImage?.endsWith('.HEIC')) {
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
                <div className="SF-Wrapper">
                    <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x' />
                    <h1 className="SF-Title">Upload Song</h1>
                    {errors.submit ? <div className="SF-Errors">* {errors.submit} *</div> : null}
                    {!isMobile ? (
                        <form className='SF-Form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                            {errors.titleLength ? <div className="SF-Errors">* {errors.titleLength}</div> : null}
                            <div className="SF-Song-Title-Lable">Track Name
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
                    )

                        :

                        (
                            <form className='SF-Form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                                {errors.titleLength ? <div className="SF-Errors">* {errors.titleLength}</div> : null}
                                <div className="SF-Song-Title-Lable">Track Name
                                    <input type='text' className="SF-Song-Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />
                                </div>
                                <div className="SF-Genre-Wrapper"> Genre:
                                    <ReactSelect
                                        className="SF-Genre"
                                        options={GenreOptions}
                                        value={GenreOptions.value}
                                        onChange={handleGenreValueChange}
                                    />
                                </div>
                                {errors.coverImage ? <div className="SF-Errors">* {errors.coverImage}</div> : null}
                                <div className="SF-FileWrapper">
                                    <div>
                                    <label className="SF-CoverImage-Wrapper">Cover Image
                                            <Dropzone onDrop={handleCoverFileChange} accept="image/*" multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive }) => (
                                                    <div {...getRootProps()} className={`DragAndDropContainer ${isDragActive ? 'active' : ''}`}>
                                                        <input {...getInputProps()} />
                                                        {coverPreview ? (
                                                            isImageFile() ? (
                                                                <img src={coverPreview} alt="Cover Preview" className="CoverImgPreview" />)
                                                                :
                                                                (
                                                                    <div className="Song-InnerBox">
                                                                        <i className="fa-solid fa-cloud-arrow-up" id="CI-Cloud"></i>
                                                                        {!errors.coverImage === 'HEIC' ? (
                                                                            <span style={{ color: 'red' }}>Invalid Image file. Please select an Image file.</span>)
                                                                            :
                                                                            <span style={{ color: 'red' }}>*HEIC Image files Unsupported*</span>}
                                                                    </div>
                                                                )
                                                        ) : (
                                                            <div className="CoverImage-InnerBox">
                                                                <i class="fa-solid fa-cloud-arrow-up" id='CI-Cloud'></i>
                                                                <span>Drag and drop or click to select a cover image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </Dropzone>
                                        </label>
                                    </div>
                                    <div>
                                    <label className="SF-Song-Wrapper">Audio File
                                        {errors.songFile ? <div className="SF-Errors">* {errors.songFile}</div> : null}
                                        <Dropzone onDrop={handleFileChange} accept="audio/*" multiple={false}>
                                            {({ getRootProps, getInputProps, isDragActive }) => (
                                                <div
                                                    {...getRootProps()}
                                                    className={`DragAndDropContainer ${isDragActive ? 'active' : ''}`}
                                                >
                                                    <input {...getInputProps()} />
                                                    {songPreview ? (
                                                        isAudioFile() ? (
                                                            <audio controls className="SongPreview">
                                                                <source src={songPreview} type="audio/mpeg" />
                                                            </audio>
                                                        ) : (
                                                            <div className="Song-InnerBox">
                                                                <i className="fa-solid fa-cloud-arrow-up" id="CI-Cloud"></i>
                                                                <span style={{ color: 'red' }}>Invalid audio file. Please select an audio file.</span>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="Song-InnerBox">
                                                            <i className="fa-solid fa-cloud-arrow-up" id="CI-Cloud"></i>
                                                            <span>Drag and drop or click to select a song file</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Dropzone>
                                        </label>
                                    </div>
                                </div>
                               
                                <button className='SF-Submit-Btn' type="submit" disabled={!isFormValid()}>Submit</button>
                                <div className="SF-Loading-GIF-Container">
                                    <img src={loadingGif} alt='loading-gif' className={loading}></img>
                                </div>
                            </form>
                        )
                    }
                </div>
            )}
        </>
    );
}

export default SignupFormModal;

// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import ReactSelect from 'react-select';
// import { useSelector, useDispatch } from "react-redux";
// import { useModal } from "../../../context/Modal";
// import { thunkAllSongs } from "../../../store/song";
// import loadingGif from "../../../images/pearloading.gif";
// import "./SongForm.css";
// import Dropzone from 'react-dropzone';
// import heic2any from 'heic2any';

// function SignupFormModal() {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();

//     const [errors, setErrors] = useState({});
//     const [songTitle, setSongTitle] = useState('');
//     const [songCoverImage, setSongCoverImage] = useState(null);
//     const [coverPreview, setCoverPreview] = useState(null);
//     const [songPreview, setSongPreview] = useState(null);
//     const [songMp3, setSongMp3] = useState(null);
//     const [genreValue, setGenreValue] = useState(null);
//     const [loading, setLoading] = useState('hidden');
//     const [isMobile, setIsMobile] = useState(false);

//     const artistName = useSelector(state => state.session.user.username);
//     const user = useSelector(state => state.session.user.id);

//     const handleGenreValueChange = (selectedOption) => { setGenreValue(selectedOption.value) };

//     // const handleCoverFileChange = async (acceptedFiles) => {
//     //     const file = acceptedFiles[0];
//     //     // Check if the file is in HEIC format
//     //     if (file.type === 'image/heic') {
//     //         try {
//     //             // Convert HEIC to JPEG using heic2any library

//     //             const convertedFile = await heic2any({ blob: file, toType: 'image/jpeg' });
//     //             setSongCoverImage(convertedFile);

//     //             // Read the converted file for preview
//     //             const reader = new FileReader();
//     //             reader.onload = (event) => {
//     //                 // Set the file preview as data URL
//     //                 setCoverPreview(event.target.result);
//     //             };
//     //             reader.readAsDataURL(convertedFile);
//     //         } catch (error) {
//     //             console.error('Error converting HEIC to JPEG:', error);
//     //         }
//     //     } else {
//     //         setSongCoverImage(file);

//     //         // Read the file for preview
//     //         const reader = new FileReader();
//     //         reader.onload = (event) => {
//     //             // Set the file preview as data URL
//     //             setCoverPreview(event.target.result);
//     //         };
//     //         reader.readAsDataURL(file);
//     //     }
//     // };


//     // const handleFileChange = (acceptedFiles) => {
//     //     const file = acceptedFiles[0];
//     //     setSongMp3(file);

//     //     // Read the file for preview
//     //     const reader = new FileReader();
//     //     reader.onload = (event) => {
//     //         // Set the file preview as data URL
//     //         setSongPreview(event.target.result);
//     //     };
//     //     reader.readAsDataURL(file);
//     // };

//     // function isAudioFile() {
//     //     const audioFormat = [
//     //         "mp3", "wav", "flac", "aac",
//     //         "wma", "ogg", "m4a", "amr",
//     //         "aiff", "mid", "midi", "mpa",
//     //         "ra", "ram", "rpm", "snd",
//     //         "au", "dct", "dvf", "m4p",
//     //         "mpc", "msv", "sln", "vox",
//     //         "webm"
//     //     ];
//     //     if (!audioFormat?.some(ext => songMp3?.name.endsWith(ext))) {
//     //         return false
//     //     } else return true
//     // }
//     // function isImageFile() {
//     //     const imageFormat = [
//     //         ".jpg", ".jpeg", ".png", ".gif",
//     //         ".bmp", ".tiff", ".psd", ".ai",
//     //         ".eps", ".svg", ".pdf", ".ico",
//     //         ".raw", ".webp", '.HEIC'
//     //     ];
//     //     if (!imageFormat?.some(ext => songCoverImage?.startsWith(ext))) {

//     //         return false
//     //     } else return true
//     // }

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     let err = {};

//     //     const imageFormat = [
//     //         ".jpg", ".jpeg", ".png", ".gif",
//     //         ".bmp", ".tiff", ".psd", ".ai",
//     //         ".eps", ".svg", ".pdf", ".ico",
//     //         ".raw", ".webp", '.HEIC'
//     //     ];

//     //     const audioFormat = [
//     //         ".mp3", ".wav", ".flac", ".aac",
//     //         ".wma", ".ogg", ".m4a", ".amr",
//     //         ".aiff", ".mid", ".midi", ".mpa",
//     //         ".ra", ".ram", ".rpm", ".snd",
//     //         ".au", ".dct", ".dvf", ".m4p",
//     //         ".mpc", ".msv", ".sln", ".vox",
//     //         ".webm"
//     //     ];

//     //     if (songTitle?.length >= 16) err.titleLength = 'Song Title must be less than 16 characters';
//     //     // console.log(songCoverImage)

//     //     if (!audioFormat?.some(ext => songMp3?.name.endsWith(ext))) {
//     //         err.songFile = 'Please provide a valid audio file';
//     //     }

//     //     const formData = new FormData();

//     //     if (songCoverImage?.type === 'image/heic') {
//     //         try {
//     //             const convertedCoverImage = await heic2any({ blob: songCoverImage, toType: 'image/jpeg' });
//     //             formData.append('songCoverImage', convertedCoverImage);
//     //         } catch (error) {
//     //             console.error('Error converting cover image from HEIC to JPEG:', error);
//     //         }
//     //     } else {
//     //         formData.append('songCoverImage', songCoverImage);
//     //     }

//     //     if (Object.values(err).length) return setErrors(err);


//     //     setLoading('SF-Loading-GIF');


//     //     formData.append('songMp3', songMp3);
//     //     formData.append('title', songTitle);
//     //     formData.append('genre', genreValue);
//     //     formData.append('artistName', artistName);
//     //     formData.append('User', user);

//     //     const res = await fetch('/api/songs/singleSong', {
//     //         method: "POST",
//     //         body: formData
//     //     });

//     //     if (res.ok) {
//     //         closeModal();
//     //         dispatch(thunkAllSongs());
//     //         return history.push('/browse');
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let err = {};

//         const imageFormat = [
//             ".jpg", ".jpeg", ".png", ".gif",
//             ".bmp", ".tiff", ".psd", ".ai",
//             ".eps", ".svg", ".pdf", ".ico",
//             ".raw", ".webp"]

//         const audioFormat = [
//             ".mp3", ".wav", ".flac", ".aac",
//             ".wma", ".ogg", ".m4a", ".amr",
//             ".aiff", ".mid", ".midi", ".mpa",
//             ".ra", ".ram", ".rpm", ".snd",
//             ".au", ".dct", ".dvf", ".m4p",
//             ".mpc", ".msv", ".sln", ".vox",
//             ".webm"
//         ]

//         if (songTitle.length >= 16) err.titleLength = 'Song Title must be less than 16 characters'

//         if (!imageFormat.some(ext => songCoverImage.name.endsWith(ext))) {
//             err.coverImage = 'Please provide a valid image file'
//         }

//         if (!audioFormat.some(ext => songMp3.name.endsWith(ext))) {
//             err.songFile = 'Please provide a valid audio file'
//         }


//         if (Object.values(err).length) return setErrors(err)

//         setLoading('SF-Loading-GIF')

//         const formData = new FormData();

//         formData.append('songMp3', songMp3)
//         formData.append('songCoverImage', songCoverImage)
//         formData.append('title', songTitle)
//         formData.append('genre', genreValue)
//         formData.append('artistName', artistName)

//         formData.append('User', user)

//         const res = await fetch('/api/songs/singleSong', {
//             method: "POST",
//             body: formData
//         });
//         if (res.ok) {
//             closeModal();
//             dispatch(thunkAllSongs());
//             return history.push('/browse');
//         }
//     };


//     const GenreOptions = [
//         { value: 'Pop', label: 'Pop' },
//         { value: 'Rock', label: 'Rock' },
//         { value: 'R&B', label: 'R&B' },
//         { value: 'Rap', label: 'Rap' },
//         { value: 'K-Pop', label: 'K-Pop' },
//         { value: 'Country', label: 'Country' },
//         { value: 'Folk', label: 'Folk' },
//         { value: 'Jazz', label: 'Jazz' },
//         { value: 'Heavy Metal', label: 'Heavy Metal' },
//         { value: 'Funk', label: 'Funk' },
//         { value: 'EDM', label: 'EDM' },
//         { value: 'Disco', label: 'Disco' },
//         { value: 'Trap', label: 'Trap' },
//         { value: 'Grunge', label: 'Grunge' }
//     ];

//     const [showModal, setShowModal] = useState(true);
//     const handleCloseModal = () => {
//         setShowModal(false); // Set the state to close the modal
//     };

//     useEffect(() => {
//         const checkScreenSize = () => {
//             setIsMobile(window.innerWidth <= 1050); // Adjust the value according to your mobile range
//         };

//         checkScreenSize();

//         window.addEventListener('resize', checkScreenSize);
//         return () => {
//             window.removeEventListener('resize', checkScreenSize);
//         };
//     }, []);



//     return (
//         <>
//             {showModal && (
//                 <div className="SF-Wrapper">
//                     <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id='x' />
//                     <h1 className="SF-Title">Upload Song</h1>
//                     {!isMobile ? (
//                         <form className='SF-Form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
//                             {errors.titleLength ? <div className="SF-Errors">* {errors.titleLength}</div> : null}
//                             <div className="SF-Song-Title-Lable">Track Name
//                                 <input type='text' className="SF-Song-Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />
//                             </div>
//                             {errors.coverImage ? <div className="SF-Errors">* {errors.coverImage}</div> : null}
//                             <div> Cover Image:
//                                 <input className="SF-CoverImage" type='file' accept='image/*' onChange={handleCoverFileChange} required />
//                             </div>
//                             <div className="SF-Genre-Wrapper"> Genre:
//                                 <ReactSelect
//                                     className="SF-Genre"
//                                     options={GenreOptions}
//                                     value={GenreOptions.value}
//                                     onChange={handleGenreValueChange}
//                                 />
//                             </div>
//                             {errors.songFile ? <div className="SF-Errors">* {errors.songFile}</div> : null}
//                             <div className="SF-Mp3-Wrapper"> Song File:
//                                 <input type='file' accept="audio/*" onChange={handleFileChange} required />
//                             </div>
//                             <button className='SF-Submit-Btn' type="submit">Submit</button>
//                             <div className="SF-Loading-GIF-Container">
//                                 <img src={loadingGif} alt='loading-gif' className={loading}></img>
//                             </div>
//                         </form>
//                     )

//                         :

//                         (
//                             <form className='SF-Form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
//                                 {errors.titleLength ? <div className="SF-Errors">* {errors.titleLength}</div> : null}
//                                 <div className="SF-Song-Title-Lable">Track Name
//                                     <input type='text' className="SF-Song-Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />
//                                 </div>
//                                 <div className="SF-Genre-Wrapper"> Genre:
//                                     <ReactSelect
//                                         className="SF-Genre"
//                                         options={GenreOptions}
//                                         value={GenreOptions.value}
//                                         onChange={handleGenreValueChange}
//                                     />
//                                 </div>
//                                 {errors.coverImage ? <div className="SF-Errors">* {errors.coverImage}</div> : null}
//                                 <div className="SF-FileWrapper">
//                                     <div>
//                                         <label className="SF-CoverImage-Wrapper">Cover Image

//                                             <Dropzone onDrop={handleCoverFileChange} accept="image/*" multiple={false}>
//                                                 {({ getRootProps, getInputProps, isDragActive }) => (
//                                                     <div {...getRootProps()} className={`DragAndDropContainer ${isDragActive ? 'active' : ''}`}>
//                                                         <input {...getInputProps()} />
//                                                         {coverPreview ? (
//                                                             true ? (
//                                                                 <img src={coverPreview} alt="Cover Preview" className="CoverImgPreview" />)
//                                                                 :
//                                                                 (
//                                                                     <div className="Song-InnerBox">
//                                                                         <i className="fa-solid fa-cloud-arrow-up" id="CI-Cloud"></i>
//                                                                         <span>Invalid Image file. Please select an Image file.</span>
//                                                                     </div>
//                                                                 )
//                                                         ) : (
//                                                             <div className="CoverImage-InnerBox">
//                                                                 <i class="fa-solid fa-cloud-arrow-up" id='CI-Cloud'></i>
//                                                                 <span>Drag and drop or click to select a cover image</span>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </Dropzone>
//                                         </label>
//                                     </div>
//                                     <div>
//                                         {errors.songFile ? <div className="SF-Errors">* {errors.songFile}</div> : null}
//                                         <Dropzone onDrop={handleFileChange} accept="audio/*" multiple={false}>
//                                             {({ getRootProps, getInputProps, isDragActive }) => (
//                                                 <div
//                                                     {...getRootProps()}
//                                                     className={`DragAndDropContainer ${isDragActive ? 'active' : ''}`}
//                                                 >
//                                                     <input {...getInputProps()} />
//                                                     {songPreview ? (
//                                                         isAudioFile() ? (
//                                                             <audio controls className="SongPreview">
//                                                                 <source src={songPreview} type="audio/mpeg" />
//                                                             </audio>
//                                                         ) : (
//                                                             <div className="Song-InnerBox">
//                                                                 <i className="fa-solid fa-cloud-arrow-up" id="CI-Cloud"></i>
//                                                                 <span>Invalid audio file. Please select an audio file.</span>
//                                                             </div>
//                                                         )
//                                                     ) : (
//                                                         <div className="Song-InnerBox">
//                                                             <i className="fa-solid fa-cloud-arrow-up" id="CI-Cloud"></i>
//                                                             <span>Drag and drop or click to select a song file</span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </Dropzone>
//                                     </div>
//                                 </div>
//                                 <button className='SF-Submit-Btn' type="submit">Submit</button>
//                                 <div className="SF-Loading-GIF-Container">
//                                     <img src={loadingGif} alt='loading-gif' className={loading}></img>
//                                 </div>
//                             </form>
//                         )
//                     }
//                 </div>
//             )}
//         </>
//     );
// }

// export default SignupFormModal;

