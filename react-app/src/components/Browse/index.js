import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllAlbums, thunkResetAlbums } from "../../store/album";
import { thunkAllSongs, thunkResetSongs, thunkLikedSongs, thunkLikeSongs, thunkDeleteLikedSongs } from "../../store/song";
import { thunkAddSong, thunkNewQueue, thunkPlayNow } from "../../store/queue";
import ToolTipMenu from "../ToolTip";

import './Browse.css'
import 'swiper/swiper.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import image from '../../images/Fin-Cards(smaller)/kpop.gif'
import image2 from '../../images/Fin-Cards(smaller)/pop.gif'
import image3 from '../../images/Fin-Cards(smaller)/rap.gif'
import image4 from '../../images/Fin-Cards(smaller)/r&b.gif'


function Browser() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user?.id)
  const albums = Object.values(useSelector(state => state.albums.allAlbums))
  const songs = Object.values(useSelector(state => state.songs.allSongs))
  const likedSongs = Object.values(useSelector(state => state.songs.likedSongs)).map(song => song.id)
  
  const [loaded, setLoaded] = useState(false);
  const browseCards = [image, image2, image3, image4]
  const [menuOpen, setMenuOpen] = useState(false)
  const [cardId, setCardId] = useState(null)
  
// Shuffle Albums/Songs (Adds nice dynamic element to browse page)
  const randomize = array => array.sort(() => 0.5 - Math.random())

  const shuffledAlbums = albums
  const shuffledSongs = songs
  const shuffledBrowseCards = browseCards

  useEffect(() => {
    dispatch(thunkAllSongs());
    dispatch(thunkAllAlbums());
    dispatch(thunkLikedSongs(user))

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
  }, [songs, albums, loaded])

  const addSongToQeueueFunc = (song) => {
    dispatch(thunkAddSong(song))
  }

  const playNowFunc = (song) => {
    dispatch(thunkPlayNow(song))
  }

  function openMenuFunc(id) {
    if(!menuOpen){
      setMenuOpen(true)
      setCardId(id)
    }else{
      setMenuOpen(false)
      setCardId(null)
    }
    
  }

  function isLikedSong(songId, userId) {

    if (likedSongs.includes(songId)) {
      dispatch(thunkDeleteLikedSongs(songId, userId))
    } else dispatch(thunkLikeSongs(songId, userId))

    return
  }

  return (
    setLoaded && (
      <div className="BR-body">
        <h1 className="BR-labels">
          Browse
        </h1>
        <div className="BR-browse-container">
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
            style={{ overflow: 'hidden' }}
          >
            {shuffledAlbums.map(album => (
              <SwiperSlide key={album.id}>
                <div style={{ marginTop: '50px' }}>
                  <img className='BR-album-images' src={album.coverImage} alt='Album Cover' />
                  <h3 style={{ color: 'rgb(238, 238, 238)', textAlign: 'center' }}>{album.title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <h1 className="BR-labels">Songs</h1>
        {songs.map((song) => (

          <div className="BR-song-section">
            <div className="song-sec-div">
              <div className="song-art-cover">
                <img className="art-cover" alt="temp" src={song.coverImage} onClick={() => playNowFunc(song)}></img>
              </div>
              <div className="song-info">
                <h3 className="song-info" id="song-name">
                  {song.title}
                </h3>
                <p className="song-info" id="artists-name">
                  {song.artistName}
                </p>
              </div>
            </div>
            <div className="icon-section">
              <i id="song-icon-menu" className="fa-solid fa-ellipsis" onClick={((e)=> openMenuFunc(song.id))}></i>
              {menuOpen && (song.id == cardId) && <ToolTipMenu song={song}/>}
              {likedSongs.includes(song.id) ? <i id="song-icon-heart" className="fa-solid fa-heart" onClick={() => isLikedSong(song.id, user)}></i> : <i class="fa-regular fa-heart BR-heart-icon" onClick={() => isLikedSong(song.id, user)}></i>}

              {/* <i id="song-icon-heart" className="fa-solid fa-heart" data-songid={song.id}></i> */}
            </div>
          </div>

        ))}
      </div>
    )
  )

}

export default Browser