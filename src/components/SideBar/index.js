import React from 'react'

function SideBar(){
    
    return(
        <div className='SB-body'>
            <h1 className='SB-logo'>Pear Music</h1>
            <div>
                <input placeholder='Search'></input>
            </div>
            <div className='SB-Library'>
                <ul className='SB-Library-title'/>
                    <h1>Library</h1>
                    <li className='SB-Browse'>Browse</li>
                    <li className='SB-Songs'>Songs</li>
                    <li className='SB-Albums'>Albums</li>
            </div>
            <div className='SB-Playlists'>
                <ul className='SB-Playlists-Title'/>
                    <h1>PlayLists</h1>
                    <li className='SB-All-Playlists'>All Playlists</li>
                <ul className='SB-User-Playlists' />
                    <li>gym</li>
                    <li>body adi adi</li>
                    <li>ya ya ya ya</li>
            </div>
        </div>
    )
}

export default SideBar