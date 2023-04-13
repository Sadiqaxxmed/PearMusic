import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkResetSongs, thunkUserSongs } from '../../store/song';
import { thunkResetAlbums, thunkUserAlbums } from '../../store/album';
import { thunkResetPlaylists, thunkUserPlaylists } from '../../store/playlist';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import './Manage-Discography.css'
import UDModal from './UDModalMenu'

function ManageDiscography() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isUDMOpen, setIsUDMOpen] = useState(false)
  const [cardId, setCardId] = useState(null)

  const userId = useSelector(state => state.session.user?.id)
  const userSongs = Object.values(useSelector(state => state.songs.allSongs))
  const userAlbums = Object.values(useSelector(state => state.albums.allAlbums))
  const userPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists))

  useEffect(() => {
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
      if(!isUDMOpen) setIsUDMOpen(true)
      else setIsUDMOpen(false)
      setCardId(id)

    }
  // function MyComponent(numSlides, className) {
  //   const imageURL = "https://assets.teenvogue.com/photos/615c6f908b261647679498e4/16:9/w_2560%2Cc_limit/GettyImages-1344925419.jpg";
  //   const imageCount = numSlides;

  //   const images = [];
  //   for (let i = 0; i < imageCount; i++) {
  //     images.push(<SwiperSlide className='MD-songs-carousel-images-div'><img className={className} key={i} src={imageURL} alt={`Image ${i + 1}`} /></SwiperSlide>);
  //   }
  //   return images
  // }

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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            style={{overflow:'hidden'}}
          >
            <div >
              {userSongs.map(song =>
                <SwiperSlide className='MD-swiper-slide-songs' >
                  <div className='MD-song-container-div'>
                    <div>
                      <img className='MD-song-images' key={song.id} src={song.coverImage} alt='Song Cover' />
                    </div>
                    <div className='MD-song-description-div'>
                      <h3>{song.title}</h3>
                      <p>{song.genre}</p>
                    </div>
                  </div>
                  <div>
                    <i id='MD-eclipse' className="fa-solid fa-ellipsis" onClick={((e) => toggleUDM(song.id))} onClose={((e) => setCardId(null))}></i>
                    {isUDMOpen && (song.id == cardId) && <UDModal song={song}/>}
                  </div>
                </SwiperSlide>
              )}
              {/* Render Jennie Pics lol */}
              {/* {MyComponent(30, albumsAndplaylistCSS)} */}
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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            style={{overflow:'hidden'}}
          >
            <div className='MD-songs-carousel-images-div'>
              {/* {MyComponent(30, albumsAndplaylistCSS)} */}
              {userPlaylists.map(playlist =>
                // <SwiperSlide className='MD-songs-carousel-images-div'><img className='MD-songs-test-css' key={playlist.id} src={playlist.coverImage} alt={`Image ${playlist.id + 1}`} /></SwiperSlide>
                <SwiperSlide className='MD-songs-carousel-images-div'><h3>{playlist.title}</h3></SwiperSlide>
              )}
            </div>
          </Swiper>
        </div>
      </div>

      <div className={userAlbums.length ? 'MD-section-container' : 'MD-display-none'}>
        <h3 className='MD-sub-labels'>Albums</h3>
        <div className='MD-playlists-container-div'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            style={{overflow:'hidden'}}
          >
            {userAlbums.map(album =>
              <div className='MD-albums-carousel-images-div'>
                <SwiperSlide >
                  <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <img className='MD-album-images' key={album.id} src={album.coverImage} alt='Album Cover' />
                    <div style={{ display: 'flex' }}>
                    <h3 style={{ color: 'rgb(238, 238, 238)', marginLeft:'60px' }}>{album.title}</h3>
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
