import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectCoverflow, EffectCards } from 'swiper';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAllAlbums, thunkResetAlbums } from "../../store/album";
import { thunkAllSongs, thunkResetSongs, thunkLikedSongs, thunkLikeSongs, thunkDeleteLikedSongs } from "../../store/song";
import { thunkPlayNow } from "../../store/queue";




import { thunkAllPlaylists, thunkUserPlaylists } from "../../store/playlist";
import ToolTipMenu from "../ToolTip";


import './Browse.css'
import 'swiper/swiper.min.css'
// import 'swiper/modules/navigation/navigation.min.css'
import KPop from '../../images/Fin-Cards(smaller)/kpop.gif'
import Pop from '../../images/Fin-Cards(smaller)/pop.gif'
import Rap from '../../images/Fin-Cards(smaller)/rap.gif'
import RnB from '../../images/Fin-Cards(smaller)/r&b.gif'


function Browser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user?.id);
  const albums = Object.values(useSelector(state => state.albums.allAlbums));
  const songs = Object.values(useSelector(state => state.songs.allSongs));
  const likedSongs = Object.values(useSelector(state => state.songs.likedSongs)).map(song => song.id);
  const allPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists));

  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const mIcon = 'M-icon-section'
  const dIcon = 'icon-section'
  const shuffledAlbums = albums

  function checkM(){
    if(isMobile){ 
      return mIcon
    }else return dIcon
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the value according to your mobile range
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    dispatch(thunkAllSongs());
    dispatch(thunkAllAlbums());
    dispatch(thunkLikedSongs(user));
    dispatch(thunkAllPlaylists())
    dispatch(thunkUserPlaylists(user));

    return () => {
      dispatch(thunkResetSongs());
      dispatch(thunkResetAlbums());
    }
  }, [dispatch, user])

  useEffect(() => {
    if (songs && albums) {
      setLoaded(true);
    } else {
      setLoaded(false)
    }
  }, [songs, albums, loaded])

  const playNowFunc = (song) => {
    dispatch(thunkPlayNow(song))
  }

  function openMenuFunc(id) {
    if (!menuOpen) {
      setMenuOpen(true)
      setCardId(id)
    } else {
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
        <h1 className="BR-Top">
          Listen Now
        </h1>
        {/* {!isMobile ? (
          <div className="BR-browse-container">
            <img className="BR-images" src={KPop} alt="Browse Card" onClick={() => history.push('/explore/K-Pop')} />
            <img className="BR-images" src={Pop} alt="Browse Card" onClick={() => history.push('/explore/Pop')} />
            <img className="BR-images" src={Rap} alt="Browse Card" onClick={() => history.push('/explore/Rap')} />
            <img className="BR-images" src={RnB} alt="Browse Card" onClick={() => history.push('/explore/R&B')} />
          </div>) */}
          {/* : */}
          <div className="BR-Rec-Cards">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={3}
              spaceBetween={0}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper-BR"
            >
              <SwiperSlide>
                <img className="BR-images" src={KPop} alt="Browse Card" onClick={() => history.push('/explore/K-Pop')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={Pop} alt="Browse Card" onClick={() => history.push('/explore/Pop')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={Rap} alt="Browse Card" onClick={() => history.push('/explore/Rap')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={RnB} alt="Browse Card" onClick={() => history.push('/explore/R&B')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={KPop} alt="Browse Card" onClick={() => history.push('/explore/K-Pop')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={Pop} alt="Browse Card" onClick={() => history.push('/explore/Pop')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={Rap} alt="Browse Card" onClick={() => history.push('/explore/Rap')} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="BR-images" src={RnB} alt="Browse Card" onClick={() => history.push('/explore/R&B')} />
              </SwiperSlide>
              
            </Swiper>
          </div>
        <h1 className="BR-labels">Songs</h1>
        <div className="BR-song-grid-container-wrapper">
          <div className="BR-song-grid-container">
            {songs.map((song) => (
              <div className="BR-song-section BR-song-container-div">
                <div className="song-sec-div" style={{ marginTop: '10px', marginBottom: '0' }}>
                  <div className="song-art-cover">
                    <img className="art-cover" alt="temp" src={song.coverImage} onClick={() => playNowFunc(song)} key={song.id}></img>
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
                <div className={checkM()}>
                  {user ? (
                    <>
                      <i
                        id="song-icon-menu"
                        className="fa-solid fa-ellipsis"
                        onClick={(e) => openMenuFunc(song.id)}
                      ></i>
                      {menuOpen && song.id === cardId && <ToolTipMenu song={song} setMenuOpen={setMenuOpen} />}
                      {likedSongs.includes(song.id) ? (
                        <i
                          id="song-icon-heart"
                          className="fa-solid fa-heart"
                          onClick={() => isLikedSong(song.id, user)}
                        ></i>
                      ) : (
                        <i
                          className="fa-regular fa-heart BR-heart-icon"
                          onClick={() => isLikedSong(song.id, user)}
                        ></i>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* <h1 className="BR-labels" style={{ marginBottom: '0' }}>Albums</h1> */}
        {/* {albums && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            slidesPerView={4}
            slidesPerGroup={4}
            navigation
            className="BR-Swiper"
          >
            {shuffledAlbums.map(album => (
              <SwiperSlide key={album.id} id="Swiper-Slide-container">
                <img className='BR-album-images' src={album.coverImage} alt='Album Cover' onClick={() => alert('Feature Coming Soon!')} />
                <div>
                  <p className="BR-album-title">{album.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )} */}
      </div>
    )
  )

}

export default Browser
