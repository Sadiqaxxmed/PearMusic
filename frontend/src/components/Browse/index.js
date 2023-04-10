import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllAlbums } from "../../store/album";
import { thunkAllSongs } from "../../store/song";

import './Browse.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
// import 'swiper/modules/scrollbar/scrollbar.min.css'

function Browser() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const albums = Object.values(useSelector(state => state.albums.allAlbums))
  const songs = Object.values(useSelector(state => state.songs.allSongs))

  useEffect(() => {
    dispatch(thunkAllSongs());
  }, [dispatch])

  useEffect(() => {
    dispatch(thunkAllAlbums())
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
        <div className="BR-browse-carousel">
          <img className="BR-browse-images" src='https://is5-ssl.mzstatic.com/image/thumb/Video114/v4/a2/da/85/a2da8572-031c-8058-a576-29e3c3b61b6b/Job2857371a-d686-4e4a-b432-76d75141c7cb-108139790-PreviewImage_PreviewImageIntermediate_preview_image_nonvideo-Time1606902986937.png/540x540cc.webp' />
        </div>
        <h1 className="BR-labels">Albums</h1>
        {albums && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            slidesPerView={4}
            slidesPerGroup={4}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {albums.map(album => (
              <SwiperSlide>
                <img className='BR-album-images' src={album.coverImage} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
            <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' />
            </SwiperSlide>
            <SwiperSlide>
            <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' />
            </SwiperSlide>
            <SwiperSlide>
            <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' />
            </SwiperSlide>
            <SwiperSlide>
            <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' />
            </SwiperSlide>
            <SwiperSlide>
            <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' />
            </SwiperSlide>
            <SwiperSlide>
            <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' />
            </SwiperSlide>
          </Swiper>
        )}
        <h1 className="BR-labels">Songs</h1>
        {songs && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {songs.map(song =>
              <SwiperSlide>
                <img className='BR-song-images' src={song.coverImage}></img>
                <h3>{song.title}</h3>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>
    )
  )

}


export default Browser;
