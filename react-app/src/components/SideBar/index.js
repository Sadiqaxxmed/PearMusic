import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import './SideBar.css'
import image from '../../images/pear2.png'
import { thunkUserPlaylists } from '../../store/playlist';
function SideBar() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user?.id)
    const userPlaylists = Object.values(useSelector(state => state.playlists.userPlaylists))

    useEffect(() => {
        dispatch(thunkUserPlaylists(userId))
    }, [dispatch])


    return (
        <div className='SB-body'>
            <NavLink to='/' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', width: '0' }}>
                <img src={image} alt='temp' style={{ width: 'auto', height: '23px' }} />
                <h2 className='SB-logo' style={{ fontWeight: '400' }}>
                    Music
                </h2>
            </NavLink>
            <div className='SB-search-field-div'>
                <span className="material-symbols-outlined">
                    search
                </span>
                <form onSubmit={() => alert('Feature Coming Soon!')}>
                    <input placeholder='Search' id='search-field'></input>
                </form>
            </div>
            <h3 className='SB-lib-play-headers'>Library</h3>
            <div className='SB-Library'>
                <li className='SB-Library'>
                    <span className="material-symbols-outlined SB-icons  pink-icons">
                        grid_view
                    </span>
                    <p> <Link exact="true" to="/" style={{ textDecoration: 'none', color: 'white' }}> Browse  </Link> </p></li>
                <li className='SB-Library'>
                    <span className="material-symbols-outlined SB-icons pink-icons">
                        music_note
                    </span>
                    <p> <Link exact="true" to="/songs" style={{ textDecoration: 'none', color: 'white' }}> Songs  </Link> </p></li>
                <li className='SB-Library'>
                    <span className="material-symbols-outlined SB-icons pink-icons">
                        home_storage
                    </span>
                    <p> <Link exact="true" to="/albums" style={{ textDecoration: 'none', color: 'white' }}>Albums</Link> </p></li>
            </div>
            <div className='SB-Playlists'>
                <ul className='SB-Playlists-Title' />
                <h3 className='SB-lib-play-headers'>Playlists</h3>
                <div className='SB-Playlist-div'>
                    <li className='SB-User-Playlist-li'>
                        <span className="material-symbols-outlined SB-icons pink-icons">
                            list
                        </span>
                        <p> <Link exact="true" to="/allPlaylist" style={{ textDecoration: 'none', color: 'white' }}> All Playlists  </Link> </p></li>
                    {/* <li className='SB-User-Playlist-li'>
                        <span className="material-symbols-outlined SB-icons pink-icons">
                            queue_music
                        </span>
                        <p>gym</p></li>
                    <li className='SB-User-Playlist-li'>
                        <span className="material-symbols-outlined SB-icons pink-icons">
                            queue_music
                        </span>
                        <p>body adi adi</p></li>
                    <li className='SB-User-Playlist-li'>
                        <span className="material-symbols-outlined SB-icons pink-icons">
                            queue_music
                        </span>
                        <p>ya ya ya ya</p></li> */}
                    {userPlaylists.map(playlist =>
                        <li className='SB-User-Playlist-li'>
                            <span className="material-symbols-outlined SB-icons pink-icons">queue_music</span>
                            <NavLink to={`/SinglePlaylist/${playlist.id}`}>
                            <p style={{fontSize:'15px'}}>{playlist.title}</p>
                            </NavLink>
                        </li>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SideBar
