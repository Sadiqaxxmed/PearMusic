import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';


import './Manage-Discography.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { thunkUserSongs } from '../../store/song';
import { thunkUserAlbums } from '../../store/album';
// import { thunkUserPlaylists } from '../../store/playlist';

function ManageDiscography() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(state => state.session.user?.id)
  const userSongs = Object.values(useSelector(state => state.songs.allSongs))
  const userAlbums = Object.values(useSelector(state => state.albums.allAlbums))
  const userPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists))

  useEffect(() => {
    dispatch(thunkUserSongs(userId))
    dispatch(thunkUserAlbums(userId))
    // dispatch(thunkUserPlaylists(userId))

    if (!userId) {
      return history.push('/')
    }
  }, [dispatch, userId])


  // function MyComponent(numSlides, className) {
  //   const imageURL = "https://assets.teenvogue.com/photos/615c6f908b261647679498e4/16:9/w_2560%2Cc_limit/GettyImages-1344925419.jpg";
  //   const imageCount = numSlides;

  //   const images = [];
  //   for (let i = 0; i < imageCount; i++) {
  //     images.push(<SwiperSlide className='MD-songs-carousel-images-div'><img className={className} key={i} src={imageURL} alt={`Image ${i + 1}`} /></SwiperSlide>);
  //   }
  //   return images
  // }

  // const songsCSS = 'MD-songs-test-css';
  // const albumsAndplaylistCSS = 'MD-songs-img';



  return (
    <div className="MD-body">
      <h1 className='MD-label'>Manage Discography</h1>
      <div style={{ marginBottom: '50px' }}>
        <h3 className='MD-sub-labels'>Songs</h3>
        <div className='MD-songs-container-div'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <div className='MD-songs-carousel-images-div'>
              {userSongs?.map(song =>
                <SwiperSlide className='MD-songs-carousel-images-div'><img className='MD-songs-test-css' key={song.id} src={song.coverImage} alt={`Image ${song.id + 1}`} /></SwiperSlide>
              )}
            </div>
          </Swiper>
        </div>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3 className='MD-sub-labels'>Playlists</h3>
        <div className='MD-playlists-container-div'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <div className='MD-songs-carousel-images-div'>

            </div>
          </Swiper>
        </div>
      </div>

      <h3 className='MD-sub-labels'>Albums</h3>
      <div className='MD-playlists-container-div'>
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          slidesPerGroup={1}
          navigation
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <div className='MD-songs-carousel-images-div'>
            {userAlbums.map(album =>
              <SwiperSlide className='MD-songs-carousel-images-div'><img className='MD-songs-img' key={album.id} src={album.coverImage} alt={`Image ${album.id + 1}`} /></SwiperSlide>
            )}
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default ManageDiscography
