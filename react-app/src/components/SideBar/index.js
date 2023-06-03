import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { thunkPlayNow } from "../../store/queue";
import { thunkUserPlaylists } from '../../store/playlist';

import './SideBar.css';
import image from '../../images/pear2.png';

function SideBar() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user?.id);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        dispatch(thunkUserPlaylists(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        const handleSearch = async () => {
            setSearchLoading(true);
            try {
                const res = await fetch(`/api/search/${searchTerm}`);
                if (res.ok) {
                    const result = await res.json();
                    setSearchResults(result);
                    setSearchLoading(false);
                } else {
                    console.error('Search request failed:', res.status);
                }
            } catch (error) {
                console.error('An error occurred during search:', error);
            }
        };

        if (searchTerm) {
            handleSearch();
        } else {
            setSearchLoading(false);
            setSearchResults([]);
        }
    }, [searchTerm]);

    const playNowFunc = (song) => {
        dispatch(thunkPlayNow(song));
    };
    // console.log(searchResults)
    return (
        <div className='SB-body'>
            <NavLink
                to='/'
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', width: '0' }}
            >
                <img src={image} alt='temp' style={{ width: 'auto', height: '23px' }} />
                <h2 className='SB-logo' style={{ fontWeight: '400' }}>
                    Music
                </h2>
            </NavLink>
            <div className='SB-search-field-div'>
                <span className='material-symbols-outlined'>search</span>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        id='search-field'
                        type='text'
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={((e) => setSearchTerm(e.target.value))}
                    />

                    {searchResults?.search_results?.length > 0 && (
                        <ul className='SB-Search-Results'>
                            {Object.values(searchResults.search_results).map((song, idx) => (
                                <li className='SB-Search-Result' key={`search-result-${idx}`} onClick={() => playNowFunc(song)}>
                                    {song.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
            <h3 className='SB-lib-play-headers'>Library</h3>
            <div className='SB-Library'>
                <li className='SB-Library'>
                    <span className='material-symbols-outlined SB-icons pink-icons'>Home</span>
                    <p>
                        <Link exact="true" to="/browse" style={{ textDecoration: 'none', color: 'white' }}>
                            Home
                        </Link>
                    </p>
                </li>
                <li className='SB-Library'>
                    {userId ? (
                        <>
                            <span className='material-symbols-outlined SB-icons pink-icons'>music_note</span>
                            <p>
                                <Link exact="true" to="/songs" style={{ textDecoration: 'none', color: 'white' }}>
                                    Liked Songs
                                </Link>
                            </p>
                        </>
                    ) : null}
                </li>
            </div>
            <div className='SB-Playlists'>
                <ul className='SB-Playlists-Title' />
                {userId ? (
                    <>
                        <h3 className='SB-lib-play-headers'>Playlists</h3>
                        <div className='SB-Playlist-div'>
                            <li className='SB-User-Playlist-li'>
                                <span className='material-symbols-outlined SB-icons pink-icons'>list</span>
                                <p>
                                    <Link exact="true" to="/allPlaylist" style={{ textDecoration: 'none', color: 'white' }}>
                                        All Playlists
                                    </Link>
                                </p>
                            </li>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default SideBar;
