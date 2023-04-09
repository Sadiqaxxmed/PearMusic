import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./AlbumForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
    const [albumTitle, setAlbumTitle] = useState('')
    const [albumCoverImage, setAlbumCoverImage] = useState('')
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		
	};
	
	const [showModal, setShowModal] = useState(true);
	const handleCloseModal = () => {
		setShowModal(false); // Set the state to close the modal
	}

	return (
		<>
		{showModal && (
            <div className="AlbumForm-Wrapper">
                <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()}id='x'/>
                <h1 className="AlbumForm-Title">Upload Album</h1>
                
                <form className='AlbumForm-Form' onSubmit={handleSubmit}>
                    <div>Album Title:
                        <input type='text' className="AlbumForm-Album-Title" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required />
                    </div>
                    <div>Cover Image:
                        <input className="AlbumForm-CoverImage" type='file' value={albumCoverImage} onChange={(e) => setAlbumCoverImage(e.target.value)} required/>
                    </div>
                </form>
            </div>
		)}
		</>
	);
}

export default SignupFormModal;