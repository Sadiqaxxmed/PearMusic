import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllAlbums, thunkResetAlbums } from "../../store/album";
import { thunkAllSongs, thunkResetSongs } from "../../store/song";

import './Browse.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import image from '../../images/Fin-Cards(smaller)/kpop.gif'
import image2 from '../../images/Fin-Cards(smaller)/pop.gif'
import image3 from '../../images/Fin-Cards(smaller)/rap.gif'
import image4 from '../../images/Fin-Cards(smaller)/r&b.gif'


function Browser() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const browseCards = [image, image2, image3, image4]
  const albums = Object.values(useSelector(state => state.albums.allAlbums))
  const songs = Object.values(useSelector(state => state.songs.allSongs))

  // Shuffle Albums/Songs (Adds nice dynamic element to browse page)
  const randomize = array => array.sort(() => 0.5 - Math.random())

  const shuffledAlbums = randomize(albums)
  const shuffledSongs = randomize(songs)
  const shuffledBrowseCards = randomize(browseCards)

  useEffect(() => {
    dispatch(thunkAllSongs());
    dispatch(thunkAllAlbums());

    return () => {
      dispatch(thunkResetSongs());
      dispatch(thunkResetAlbums());
    }
  }, [dispatch])

  useEffect(() => {
    if (songs && albums) {
      setLoaded(true);
    } else {
      setLoaded(false)
    }
  }, [songs, albums])

  return (
    setLoaded && (
      <div className="BR-body">
        <h1 className="BR-labels">
          Browse
        </h1>
        <div className="BR-browse-container">
          {/* <div className="BR-images-div">
            <img className="BR-images" src={image} alt="Example GIF" onClick={() => alert('Feature Coming Soon!')} />
          </div>
          <div className="BR-images-div">
            <img className="BR-images" src={image2} alt="Example GIF" onClick={() => alert('Feature Coming Soon!')} />
          </div>
          <div className="BR-images-div">
            <img className="BR-images" src={image3} alt="Example GIF" onClick={() => alert('Feature Coming Soon!')} />
          </div>
          <div className="BR-images-div">
            <img className="BR-images" src={image4} alt="Example GIF" onClick={() => alert('Feature Coming Soon!')} />
          </div> */}
          {shuffledBrowseCards.map(browseCard =>
            <div className="BR-images-div">
              <img className="BR-images" src={browseCard} alt="Browse Card" onClick={() => alert('Feature Coming Soon!')} />
            </div>
            )}
        </div>
        <h1 className="BR-labels" style={{ marginBottom: '0' }}>Albums</h1>
        {albums && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            slidesPerView={4}
            slidesPerGroup={4}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {shuffledAlbums.map(album => (
              <SwiperSlide key={album.id}>
                <div style={{ marginTop: '50px' }}>
                  <img className='BR-album-images' src={album.coverImage} />
                  <h3 style={{ color: 'rgb(238, 238, 238)', textAlign: 'center' }}>{album.title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <h1 className="BR-labels">Songs</h1>
        {songs && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            slidesPerView={3}
            slidesPerGroup={3}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {shuffledSongs.map(song =>
              <SwiperSlide key={song.id}>
                <div className="BR-song-container">
                  <img className='BR-song-images' src={song.coverImage}></img>
                  <div className="BR-song-title">
                    <h3 style={{ color: 'rgb(238, 238, 238)', fontSize: '15px', marginBottom: '2px' }}>{song.title}</h3>
                    <h5 style={{ color: 'rgb(105, 105, 105)', fontSize: '10px', fontWeight: '600', margin: '0', }}>{song.genre}</h5>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>
    )
  )

}


export default Browser;
