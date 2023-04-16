import { useEffect, useState } from 'react';
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

  return (
    <div className="MD-body">
      <h1 className='MD-label'>Manage Discography</h1>
      <h1 className="BR-labels">Songs</h1>
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
            <i id='MD-eclipse' className={ isUDMOpen && song.id === cardId ? "fa-solid fa-xmark" : "fa-solid fa-ellipsis" } onClick={((e) => toggleUDM(song.id))} onClose={((e) => setCardId(null))}></i>
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
      {/* <div className={userSongs.length ? 'MD-section-container' : 'MD-display-none'}>
        <h3 className='MD-sub-labels'>Songs</h3>
        <div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={2}
            slidesPerGroup={1}
            navigation
            style={{ overflow: 'hidden' }}
          >
            <div >
              {userSongs.map((song, idx) =>
                <SwiperSlide key={`song_${song.id}_${idx}`} className='MD-swiper-slide-songs' >
                  <div className='MD-song-container-div'>
                    <div>
                      <img className='MD-song-images' src={song.coverImage} alt='Song Cover' />
                    </div>
                    <div className='MD-song-description-div'>
                      <h3>{song.title}</h3>
                      <p>{song.genre}</p>
                    </div>
                  </div>
                  <div>
                    <i id='MD-eclipse' className="fa-solid fa-ellipsis" onClick={((e) => toggleUDM(song.id))} onClose={((e) => setCardId(null))}></i>
                    {isUDMOpen && (song.id == cardId) &&
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
                  </div>
                </SwiperSlide>
              )}
            </div>
          </Swiper>
        </div>
      </div> */}

      <div className={userPlaylists.length ? 'MD-section-container' : 'MD-display-none'}>
        <h3 className='MD-sub-labels'>Playlists</h3>
        <div className='MD-playlists-container-div'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation
            style={{ overflow: 'hidden' }}
          >
            <div className='MD-songs-carousel-images-div'>
              {/* {MyComponent(30, albumsAndplaylistCSS)} */}
              {userPlaylists.map((playlist, idx) =>
                // <SwiperSlide className='MD-songs-carousel-images-div'><img className='MD-songs-test-css' key={playlist.id} src={playlist.coverImage} alt={`Image ${playlist.id + 1}`} /></SwiperSlide>

                <SwiperSlide className='MD-songs-carousel-images-div' key={`playlist_${playlist.id}_${idx}`}>
                  <img src={playlist.coverImage} alt='playlist img' className='MD-Playlist-CoverImage' />
                  <div>
                    <div className='MD-Playlist-Info'>

                      <h3 className='MD-playlist-Title'>{playlist.title}</h3>
                      <div className='MD-Playlist-Icon'>
                        <i id='MD-eclipse-playlist' className={ menuOpen && playlist.id === playlistCardId ? "fa-solid fa-xmark" : "fa-solid fa-ellipsis"} onClick={((e) => openMenuFunc(playlist.id))} onClose={((e) => setPlaylistCardId(null))}></i>
                      </div>
                    </div>
                    {menuOpen && (playlistCardId === playlist.id) &&
                      <div id='MD-Main-Wrapper'>
                        <div className='TTM-Main-Wrapper'>
                          <div className="TTM-Btn-Wrapper"> {/* dispatch add to queue thunk */}
                            <OpenModalButton
                              buttonText="Update"
                              onButtonClick={((e) => setMenuOpen(false))}
                              modalComponent={<UpdatePlaylist playlist={playlist} />}
                            />
                          </div>
                          <div className="TTM-Btn-Wrapper" > {/* open extra menu with all user playlists */}
                            <div className='TTM-Delete' onClick={((e) => deletePlaylist(playlist.id))}>&nbsp;Delete</div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </SwiperSlide>
              )}
            </div>
          </Swiper>
        </div>
      </div>

      <div className={userAlbums.length ? 'MD-section-container' : 'MD-display-none'} onClick={((e) => alert('Albums Feature Coming soon'))}>
        <h3 className='MD-sub-labels'>{`Albums`}</h3>
        <div className='MD-playlists-container-div'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation
            style={{ overflow: 'hidden' }}
          >
            {userAlbums.map((album, idx) =>
              <div className='MD-albums-carousel-images-div' key={`album_${album.idx}_${idx}`}>
                <SwiperSlide>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img className='MD-album-images' src={album.coverImage} alt='Album Cover' />
                    <div style={{ display: 'flex' }}>
                      <h3 className='MD-Album-Title'>{album.title}</h3>
                      {/* <i id='MD-eclipse' className="fa-solid fa-ellipsis"></i> */}
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ManageDiscography
