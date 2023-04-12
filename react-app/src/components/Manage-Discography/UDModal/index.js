import React from "react";
import './UDModal.css'
import { useSelector } from "react-redux";

const UDModal = () => {
    const sessionUser = useSelector(state => state.session.user)
    //<i class="fa-solid fa-trash"/> delete
    //<i class="fa-solid fa-pen-to-square"/> update
    return(
        <div className="UDM-Main-Wrapper">
            <div className="UDM-Update-Wrapper">
                <div className="UDM-Update">&nbsp;Update</div>
                <i class="fa-solid fa-pen-to-square" id='update-ico'/>
            </div>
            <div className="UDM-Delete-Wrapper">
                <div className="UDM-Delete">&nbsp;Delete</div>
                <i class="fa-solid fa-trash" id='delete-ico'/> 
            </div>
        </div>
    )
}

export default UDModal