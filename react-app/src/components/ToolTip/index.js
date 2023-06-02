import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './ToolTipMenu.css'

import { thunkUserPlaylists, thunkCreatePlaylist, thunkAddToPlaylist } from "../../store/playlist";
import { thunkAddSong } from "../../store/queue";

function ToolTipMenu({ song, setMenuOpen }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const ulRef = useRef(null);
    const userId = useSelector(state => state.session.user?.id);
    const userPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists));
    const songId = song.id;

    const [showPlaylists, setShowPlaylists] = useState(false);

    useEffect(() => {
        dispatch(thunkUserPlaylists(userId));

        const handleClickOutside = (event) => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dispatch, setMenuOpen, userId]);

    const addToPlaylist = (songId, playlistId) => {
        dispatch(thunkAddToPlaylist(songId, playlistId));
        setShowPlaylists(false);
        setMenuOpen(false);
    };

    const addToQueue = (song) => {
        dispatch(thunkAddSong(song));
    };

    const createPlaylist = async (songId, userId) => {
        const playlistId = await dispatch(thunkCreatePlaylist(songId, userId));
        history.push(`/SinglePlaylist/${playlistId}`);
    };

    const handlePopOut = () => {
        setShowPlaylists(!showPlaylists);
    };

    return (
        <div className="TTM-container-div" ref={ulRef}>
            <div className="TTM-Main-Wrapper-DIF">
                <div className="TTM-Btn-Wrapper">
                    <div className='TTM-Create-Playlist' onClick={() => createPlaylist(songId, userId)}>
                        &nbsp;Create playlist
                    </div>
                </div>
                <div className="TTM-Btn-Wrapper">
                    <div className='TTM-AddToPlaylist' onClick={handlePopOut}>
                        &nbsp;{'<-'} Add to playlist
                    </div>
                </div>
                <div className="TTM-Btn-Wrapper">
                    <div className='TTM-AddToQueue' onClick={() => addToQueue(song)}>
                        &nbsp;Add to queue
                    </div>
                </div>
            </div>
            <div className={`pop-out-menu${showPlaylists ? '-open' : ''}`}>
                <div className="POM-BTN-Wrapper-Title">Playlists</div>
                {userPlaylists.map(playlist =>
                    <div className="POM-BTN-Wrapper" key={playlist.id} onClick={() => addToPlaylist(songId, playlist.id)}>
                        {playlist.title}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToolTipMenu;