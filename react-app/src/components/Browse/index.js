import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAllSongs, thunkResetSongs, thunkLikedSongs, thunkLikeSongs, thunkDeleteLikedSongs } from "../../store/song";
import { thunkPlayNow } from "../../store/queue";
import { thunkAllPlaylists, thunkUserPlaylists } from "../../store/playlist";

import ToolTipMenu from "../ToolTip";
import loading from '../../images/loading.gif'

import './Browse.css'
import 'swiper/swiper.min.css'

import KPop from '../../images/Fin-Cards(smaller)/kpop.gif'
import Pop from '../../images/Fin-Cards(smaller)/pop.gif'
import Rap from '../../images/Fin-Cards(smaller)/rap.gif'
import RnB from '../../images/Fin-Cards(smaller)/r&b.gif'
import MidwestEmo from '../../images/Fin-Cards(smaller)/midwest.gif'


function Browser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user?.id);
  const songs = Object.values(useSelector(state => state.songs.allSongs));
  const likedSongs = Object.values(useSelector(state => state.songs.likedSongs)).map(song => song.id);
  // const allPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists));

  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const mIcon = 'M-icon-section'
  const dIcon = 'icon-section'

  function checkM() {
    if (isMobile) {
      return mIcon
    } else return dIcon
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

  useEffect(async () => {
    const fetchData = async () => {
      setIsLoaded(false)
      await dispatch(thunkAllSongs());
      await dispatch(thunkLikedSongs(user));
      await dispatch(thunkAllPlaylists())
      await dispatch(thunkUserPlaylists(user));
      setIsLoaded(true)
    }
    fetchData()
    return () => {
      dispatch(thunkResetSongs());
    }
  }, [dispatch, user])

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
    <>
      {!isLoaded ? <img className='LoadingGIf' src={loading} alt="loading-gif" />
      :
      (<div className="BR-body">
          <h1 className="BR-Top">
            Listen Now
          </h1>
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
                <img className="BR-images" src={MidwestEmo} alt="Browse Card" onClick={() => history.push('/explore/Alternative')} />
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
                <img className="BR-images" src={MidwestEmo} alt="Browse Card" onClick={() => history.push('/explore/Alternative')} />
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
              {songs.map((song, idx) => (
                <div className="BR-song-section BR-song-container-div" key={`BR-Song-${idx}`}>
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
                  <div if='BR-icons-wrap' className={checkM()}>
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
                            id="BR-song-icon-heart"
                            className="fa-solid fa-heart"
                            onClick={() => isLikedSong(song.id, user)}
                          ></i>
                        ) : (
                          <i
                            className="fa-regular fa-heart BR-Song-heart-icon"
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
        </div>
      )}
    </>
  )
}

export default Browser
