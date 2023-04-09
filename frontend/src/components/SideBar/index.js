import React from 'react'
import { Link } from 'react-router-dom';

import './SideBar.css'
import image from '../../images/pear2.png'
function SideBar() {

    return (
        <div className='SB-body'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={image} style={{ width: 'auto', height: '23px' }} />
                <h2 className='SB-logo' style={{ fontWeight: '400' }}>
                    Music
                </h2>
            </div>
            <div className='SB-search-field-div'>
                <span className="material-symbols-outlined">
                    search
                </span>
                <input placeholder='Search' id='search-field'></input>
            </div>
            <h3 className='SB-lib-play-headers'>Library</h3>
            <div className='SB-Library'>
                <li className='SB-Library'>
                    <span className="material-symbols-outlined SB-icons  pink-icons">
                        grid_view
                    </span>
                    <p> <Link exact="true" to="/" style={{ textDecoration:'none', color:'white' }}> Browse  </Link> </p></li>
                <li className='SB-Library'>
                    <span className="material-symbols-outlined SB-icons pink-icons">
                        music_note
                    </span>
                    <p> <Link exact="true" to="/songs" style={{ textDecoration:'none', color:'white' }}> Songs  </Link> </p></li>
                <li className='SB-Library'>
                    <span className="material-symbols-outlined SB-icons pink-icons">
                        home_storage
                    </span>
                    <p> <Link exact="true" to="/albums" style={{ textDecoration:'none', color:'white' }}>Albums</Link> </p></li>
            </div>
            <div className='SB-Playlists'>
                <ul className='SB-Playlists-Title' />
                <h3 className='SB-lib-play-headers'>Playlists</h3>
                <div className='SB-Playlist-div'>
                    <li className='SB-User-Playlist-li'>
                        <span className="material-symbols-outlined SB-icons pink-icons">
                            list
                        </span>
                        <p> <Link exact="true" to="/allPlaylist" style={{ textDecoration:'none', color:'white' }}> All Playlists  </Link> </p></li>
                    <li className='SB-User-Playlist-li'>
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
                        <p>ya ya ya ya</p></li>
                </div>
            </div>
        </div>
    )
}

export default SideBar
