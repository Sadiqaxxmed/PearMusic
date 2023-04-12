import React, { useState } from "react";
import { useSelector } from "react-redux";
import './UDModal.css'

import OpenModalButton from "../../OpenModalButton";
import UpdateSong from "../UDModals/UpdateSongModal";
import DeleteSong from "../UDModals/DeleteSongModal";


const UDModal = ({songId}) => {
    //prolly need for security later to double check if user owns music
    const sessionUser = useSelector(state => state.session.user)

    const [outerDivClassName, setOuterDivClassName] = useState('UDM-Main-Wrapper');

    //hides menu when modal button is clicked
    const handleInnerDivClick = () => {
        setOuterDivClassName('UDM-Main-Wrapper-Hidden');
    };


    return(
        <div className={outerDivClassName}>
            <div className="UDM-Update-Wrapper">
                {/* <div className="UDM-Update">&nbsp;Update</div> */}
                <OpenModalButton
                buttonText="Update"
                onButtonClick={handleInnerDivClick}
                modalComponent={<UpdateSong songId={songId}/>}
                />
                <i class="fa-solid fa-pen-to-square" id='update-ico'/>
            </div>
            <div className="UDM-Delete-Wrapper" >
                {/* <div className="UDM-Delete">&nbsp;Delete</div> */}
                <OpenModalButton
                buttonText="Delete"
                onButtonClick={handleInnerDivClick}
                modalComponent={<DeleteSong songId={songId}/>}
                />
                <i class="fa-solid fa-trash" id='delete-ico'/> 
            </div>
        </div>
    )
}

export default UDModal