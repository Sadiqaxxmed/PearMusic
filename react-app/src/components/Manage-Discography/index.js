import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkResetSongs, thunkUserSongs } from '../../store/song';
import { thunkResetAlbums, thunkUserAlbums } from '../../store/album';
import { thunkResetPlaylists, thunkUserPlaylists } from '../../store/playlist';
import { thunkDeletePlaylist } from "../../store/playlist";
import UpdatePlaylist from './UDModals/UpdatePlaylist'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import './Manage-Discography.css'

import OpenModalButton from '../OpenModalButton';
import UpdateSong from "./UDModals/UpdateSongModal";
import DeleteSong from "./UDModals/DeleteSongModal";

function ManageDiscography() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isUDMOpen, setIsUDMOpen] = useState(false)
  const [cardId, setCardId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [playlistCardId, setPlaylistCardId] = useState(null)
  const [slidesPerView, setSlidesPerView] = useState(4);


  const userId = useSelector(state => state.session.user?.id)
  const userSongs = Object.values(useSelector(state => state.songs.userSongs))
  const userAlbums = Object.values(useSelector(state => state.albums.allAlbums))
  const userPlaylists = Object.values(useSelector(state => state.playlists.userPlaylists))

  useEffect(() => {
    dispatch(thunkUserSongs(userId))
    dispatch(thunkUserAlbums(userId))
    dispatch(thunkUserPlaylists(userId))
    if (!userId) {
      return history.push('/browse')
    }

    return () => {
      dispatch(thunkResetSongs())
      dispatch(thunkResetAlbums())
      dispatch(thunkResetPlaylists())
    }
  }, [dispatch, userId, history])

  function toggleUDM(id) { //opens da meat ta ball menu
    if (!isUDMOpen) setIsUDMOpen(true)
    else setIsUDMOpen(false)
    setCardId(id)
  }

  const deletePlaylist = (playlistId) => {
    dispatch(thunkDeletePlaylist(playlistId, userId))

    setMenuOpen(false)
  }

  function openMenuFunc(id) {
    if (!menuOpen) {
      setMenuOpen(true)
      setPlaylistCardId(id)
    } else {
      setPlaylistCardId(null)
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      
      // Update the number of slides per view based on screen width
      if (screenWidth < 768) {
        setSlidesPerView(1);
      } else if (screenWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
      }
    };

    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the initial slides per view
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="MD-body">
      <h1 className='MD-label' id='MD-Label'>Manage Discography</h1>
      <h1 className="BR-labels">Songs</h1>
      <div className='MD-Song-Section-Wrapper'>
        {userSongs.map((song) => (
          <div className="BR-song-section">
            <div className="song-sec-div">
              <div className="song-art-cover">
                <img className="art-cover" alt="temp" src={song.coverImage}></img>
              </div>
              <div className="song-info">
                <p className="song-info" id="song-name">
                  {song.title}
                </p>
                <p className="song-info" id="artists-name">
                  {song.artistName}
                </p>
              </div>
            </div>
            <div className="icon-section">
              <i id='MD-eclipse' className={isUDMOpen && song.id === cardId ? "fa-solid fa-xmark" : "fa-solid fa-ellipsis"} onClick={((e) => toggleUDM(song.id))} onClose={((e) => setCardId(null))}></i>
              {isUDMOpen && (song.id === cardId) &&
                <div className='UDM-Main-Wrapper'>
                  <div className="UDM-Update-Wrapper">
                    <OpenModalButton
                      buttonText="Update"
                      onButtonClick={''}
                      modalComponent={<UpdateSong song={song} />}
                    />
                    <i class="fa-solid fa-pen-to-square" id='update-ico' />
                  </div>
                  <div className="UDM-Delete-Wrapper" >
                    <OpenModalButton
                      buttonText="Delete"
                      onButtonClick={''}
                      modalComponent={<DeleteSong song={song} />}
                    />
                    <i class="fa-solid fa-trash" id='delete-ico' />
                  </div>
                </div>
              }
              {/* <i id="song-icon-menu" className="fa-solid fa-ellipsis" onClick={((e) => openMenuFunc(song.id))}></i> */}
              {/* {menuOpen && (song.id == cardId) && <ToolTipMenu song={song} />}
              {likedSongs.includes(song.id) ? <i id="song-icon-heart" className="fa-solid fa-heart" onClick={() => isLikedSong(song.id, user)}></i> : <i class="fa-regular fa-heart BR-heart-icon" onClick={() => isLikedSong(song.id, user)}></i>} */}
            </div>
          </div>
        ))}
      </div>

      
    </div>
  )
}

export default ManageDiscography
