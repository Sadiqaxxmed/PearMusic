import React, { useState } from "react";
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
    const [songCoverImage, setSongCoverImage] = useState('')
    const [songMp3, setSongMp3] = useState('')
    const [genreValue, setGenreValue] = useState(null)
	const { closeModal } = useModal();

    const handleGenreValueChange = (selectedOption) => {
        setGenreValue(selectedOption);
    }    

	const handleSubmit = async (e) => {
		
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
        
        // Add more options as needed
    ];
	const [showModal, setShowModal] = useState(true);
	const handleCloseModal = () => {
		setShowModal(false); // Set the state to close the modal
	}

	return (
		<>
		{showModal && (
            <div className="SF-Wrapper">
                <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()}id='x'/>
                <h1 className="SF-Title">Upload Song</h1>
                
                <form className='SF-Form' onSubmit={handleSubmit}>
                    <div className="SF-Errors">
                        {errors.map((error, idx) => (
                            <p key={idx}>{error}</p>
                        ))}
                    </div>
                    <div className="SF-Song-Title-Lable">Song Title:
                        <input type='text' className="SF-Song-Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} required />
                    </div>
                    <div> Cover Image: 
                        <input className="SF-CoverImage" type='file' value={songCoverImage} onChange={(e) => setSongCoverImage(e.target.value)} required/>
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
                        <input className="SF-Mp3" type='file' value={songMp3} onChange={(e) => setSongMp3(e.target.value)} required/>
                    </div>
                    <button className='SF-Submit-Btn' type="submit">Log In</button>
                </form>
            </div>
		)}
		</>
	);
}

export default SignupFormModal;