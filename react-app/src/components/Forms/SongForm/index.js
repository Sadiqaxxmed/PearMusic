import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useSelector } from "react-redux";
// import { useModal } from "../../../context/Modal";
// import { signUp } from "../../../store/session";
import "./SongForm.css";

function SignupFormModal() {
    // const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [songTitle, setSongTitle] = useState('')
    const [songCoverImage, setSongCoverImage] = useState(null)
    const [songMp3, setSongMp3] = useState(null)
    const [genreValue, setGenreValue] = useState(null)

    const artistName = useSelector(state => state.session.user.username)

    // const { closeModal } = useModal();

    const handleGenreValueChange = (selectedOption) => {
        //console.log(selectedOption.value)
        setGenreValue(selectedOption.value);
    }

    function handleFileChange(event) {
        //console.log('asdasdasdasdas', event.target.files[0])
        //console.log('theres something about ya girl and yoour in my worrrld and i wanna swirl',event.target.files)
        setSongMp3(event.target.files[0]);
        // setSongCoverImage(event.target.files[0])
    }

    function handleCoverFileChange(event) {
        //console.log('theres something about ya girl and yoour in my worrrld and i wanna swirl',event.target.files)
        setSongCoverImage(event.target.files[0])
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('VALUES   :   ', e)
        // console.log('COVER IMAGE FILE  :   ', e)

        const formData = new FormData();

        // console.log('ass',Object.values({songMp3}))
        formData.append('songMp3', songMp3)
        formData.append('songCoverImage', songCoverImage)
        formData.append('title', songTitle)
        formData.append('genre', genreValue)
        formData.append('artistName', artistName)
        // console.log('tig ol biddies', formData.get('songMp3'))
        // console.log('big ol giddies', formData.get('title'))
        // console.log('gooboo', formData.get('genre'))
        // console.log('solja boy tell em', formData.get('songCoverImage'))

        const res = await fetch('/api/songs/singleSong', {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            return history.push('/')
        }
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
                            <input className="SF-CoverImage" type='file' accept='image/*' onChange={handleCoverFileChange} required />

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
                            <input type='file' accept="audio/*" onChange={handleFileChange} required />
                        </div>
                        <button className='SF-Submit-Btn' type="submit">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignupFormModal;
