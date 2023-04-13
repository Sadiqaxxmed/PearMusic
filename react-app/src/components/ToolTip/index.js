// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import './UDModal.css'

import { useState } from "react";
import { useSelector } from "react-redux";
import './ToolTipMenu.css'




function ToolTipMenu(song) {
    const sessionUser = useSelector(state => state.session.user)
    const userPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists))
    
    const [outerDivClassName, setOuterDivClassName] = useState('TTM-Main-Wrapper');
    const [showPlaylists, setShowPlaylists] = useState(false)

    function handlePopOut(){
        if(!showPlaylists){
            setShowPlaylists(true)
        }else{
            setShowPlaylists(false)
        }
    }

    const handleInnerDivClick = () => {
        setOuterDivClassName('TTM-Main-Wrapper-Hidden');
    };

    return (
        <div>
            <div className={outerDivClassName}>
                <div className="TTM-Btn-Wrapper"> {/* create playlist and redirect user to that new playlist */}
                    <div className='TTM-Create-Playlist' onClick={((e) => console.log('CP CP CP CP CP'))}>&nbsp;Create playlist</div>
                </div>
                <div className="TTM-Btn-Wrapper" > {/* open extra menu with all user playlists */}
                    <div className='TTM-AddToPlaylist' onClick={((e) => handlePopOut())}>&nbsp;Add to playlist{`->`} </div>
                </div>
                <div className="TTM-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                    <div className='TTM-AddToQueue' onClick={((e) => console.log('ATQ ATQ ATQ ATQ'))}>&nbsp;Add to queue</div>
                </div>
                <div className="TTM-Btn-Wrapper" > {/* redirect to a page of jennies or a jennie only playlist */}
                    <div className='TTM-Jennie' onClick={((e) => console.log("JENNIE JENNIE JENNIE JENNIE"))}>&nbsp;JENNIE</div>
                </div>
                <div className="TTM-Btn-Wrapper-End">  {/* redirect to keegsters playlist */}
                    <div className='TTM-Keegster' onClick={((e) => console.log('KEEGSTER KEEGSTER KEEGSTER KEEGSTER'))}>&nbsp;KEEGSTER</div>
                </div>
            </div>
            <div className={`pop-out-menu${showPlaylists ? '-open': ''}`}>
                sadasdasdasdasdasdasd
            </div>
        </div>
    )

}

export default ToolTipMenu