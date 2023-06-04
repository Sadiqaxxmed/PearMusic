import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './ToolTipMenu.css';

import { thunkUserPlaylists, thunkCreatePlaylist, thunkAddToPlaylist } from "../../store/playlist";
import { thunkAddSong } from "../../store/queue";

function ToolTipMenu({ song, setMenuOpen }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const menuRef = useRef(null); // Ref for the menu itself
    const ulRef = useRef(null);
    const userId = useSelector(state => state.session.user?.id);
    const userPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists));
    const songId = song.id;

    const [showPlaylists, setShowPlaylists] = useState(false);

    useEffect(() => {
        dispatch(thunkUserPlaylists(userId));

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [dispatch, setMenuOpen, userId]);

    // adds song to playlist (need to make menu close after action is complete)
    function AddToPlaylist(songId, playlistId) {
        dispatch(thunkAddToPlaylist(songId, playlistId));
        setShowPlaylists(false);
        setMenuOpen(false);
    }

    // adds song to queue (need to add functionality to close menu once a button is clicked and an action is completed but for now its fine)
    function addToQueue(song) {
        dispatch(thunkAddSong(song));
        return;
    }

    const createPlaylist = async (songId, userId) => {
        const playlistId = await dispatch(thunkCreatePlaylist(songId, userId));
        history.push(`/SinglePlaylist/${playlistId}`);
    }

    // handles playlists menu pop out on 'add to playlist btn' click (need to add functionality to close menu once a button is clicked and an action is completed but for now its fine)
    function handlePopOut() {
        setShowPlaylists(!showPlaylists);
    }

    console.log(showPlaylists);
    console.log(userPlaylists);

    return (
        <div className="TT-Menu-Wrapper" ref={menuRef}>
            <div className="TT-PL-Wrapper" style={{ display: showPlaylists ? 'block' : 'none' }} ref={ulRef}>
                <div className="TT-PL-Title">
                    Your playlists
                    <i
                        className="fa-solid fa-arrow-left"
                        id="TT-PL-Arrow"
                        onClick={handlePopOut}
                    />
                </div>
                {userPlaylists.map(playlist => (
                    <div
                        className="TT-PL-Option"
                        key={playlist.id}
                        onClick={() => AddToPlaylist(songId, playlist.id)}
                    >
                        {playlist.title}
                    </div>
                ))}
            </div>
            <div className="TT-Options-Wrapper" style={{ display: showPlaylists ? 'none' : 'flex' }}>
                <div className="TT-Option-Container">
                    {/* create playlist and redirect user to that new playlist */}
                    <div className="TT-Option" onClick={() => createPlaylist(songId, userId)}>
                        Create playlist
                    </div>
                </div>
                <div className="TT-Option-Container">
                    {/* open extra menu with all user playlists */}
                    <div className="TT-Option" onClick={handlePopOut}>
                        Add to playlist
                    </div>
                </div>
                <div className="TT-Option-Container">
                    {/* dispatch add to queue thunk */}
                    <div className="TT-Option" onClick={() => addToQueue(song)}>
                        Add to queue
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToolTipMenu;
