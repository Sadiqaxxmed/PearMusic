import React from 'react'
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
                <span class="material-symbols-outlined">
                    search
                </span>
                <input placeholder='Search' id='search-field'></input>
            </div>
            <h3 className='SB-lib-play-headers'>Library</h3>
            <div className='SB-Library'>
                <li className='SB-Library'>
                    <span class="material-symbols-outlined SB-icons  pink-icons">
                        grid_view
                    </span>
                    <p>Browse</p></li>
                <li className='SB-Library'>
                    <span class="material-symbols-outlined SB-icons pink-icons">
                        music_note
                    </span>
                    <p>Songs</p></li>
                <li className='SB-Library'>
                    <span class="material-symbols-outlined SB-icons pink-icons">
                        home_storage
                    </span>
                    <p>Albums</p></li>
            </div>
            <div className='SB-Playlists'>
                <ul className='SB-Playlists-Title' />
                <h3 className='SB-lib-play-headers'>Playlists</h3>
                <div className='SB-Playlist-div'>
                    <li className='SB-User-Playlist-li'>
                        <span class="material-symbols-outlined SB-icons pink-icons">
                            list
                        </span>
                        <p>All Playlists</p></li>
                    <li className='SB-User-Playlist-li'>
                        <span class="material-symbols-outlined SB-icons pink-icons">
                            queue_music
                        </span>
                        <p>gym</p></li>
                    <li className='SB-User-Playlist-li'>
                        <span class="material-symbols-outlined SB-icons pink-icons">
                            queue_music
                        </span>
                        <p>body adi adi</p></li>
                    <li className='SB-User-Playlist-li'>
                        <span class="material-symbols-outlined SB-icons pink-icons">
                            queue_music
                        </span>
                        <p>ya ya ya ya</p></li>
                </div>
            </div>
        </div>
    )
}

export default SideBar
