import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkResetSongs, thunkUserSongs, thunkAllSongs } from '../../store/song';
import { thunkResetAlbums, thunkUserAlbums } from '../../store/album';
import { thunkResetPlaylists, thunkUserPlaylists, thunkAllPlaylists } from '../../store/playlist';
import { thunkDeletePlaylist, thunkDeleteSongPlaylist } from "../../store/playlist";
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
    // dispatch(thunkAllSongs());
    dispatch(thunkUserSongs(userId))
    dispatch(thunkUserAlbums(userId))
    dispatch(thunkUserPlaylists(userId))
    if (!userId) {
      return history.push('/')
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
      <div className={userSongs.length ? 'MD-section-container' : 'MD-display-none'}>
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
                          {/* <div className="UDM-Update">&nbsp;Update</div> */}
                          <OpenModalButton
                            buttonText="Update"
                            onButtonClick={''}
                            modalComponent={<UpdateSong song={song} />}
                          />
                          <i class="fa-solid fa-pen-to-square" id='update-ico' />
                        </div>
                        <div className="UDM-Delete-Wrapper" >
                          {/* <div className="UDM-Delete">&nbsp;Delete</div> */}
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
      </div>

      <div className={userPlaylists.length ? 'MD-section-container' : 'MD-display-none'}>
        <h3 className='MD-sub-labels'>Playlists</h3>
        <div className='MD-playlists-container-div'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
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
                    <h3 className='MD-playlist-Title'>{playlist.title}<i id='MD-eclipse-playlist' className="fa-solid fa-ellipsis" onClick={((e) => openMenuFunc(playlist.id))} onClose={((e) => setPlaylistCardId(null))}></i></h3>
                    {menuOpen && (playlistCardId == playlist.id) &&
                      <div >
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
        <h3 className='MD-sub-labels'>{`🛠️ Albums (FEATURE COMING SOON) 🛠️`}</h3>
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
                      <h3 style={{ color: 'rgb(238, 238, 238)', marginLeft: '60px' }}>{album.title}</h3>
                      <i id='MD-eclipse' className="fa-solid fa-ellipsis"></i>
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
