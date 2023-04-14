import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLikedSongs, thunkDeleteLikedSongs } from "../../store/song";
import { thunkUserPlaylists } from "../../store/playlist";


import "./Songs.css";

function Songs() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user?.id);
  const songs = Object.values(useSelector((state) => state.songs.likedSongs));

  useEffect(() => {
    dispatch(thunkLikedSongs(user_id));
    dispatch(thunkUserPlaylists(user_id));
  }, [dispatch]);

  function unlikeSong(e){
    dispatch(thunkDeleteLikedSongs(e.currentTarget.dataset.songid, user_id));
  }

  return (
    <>
      <div className="song-body">
        <h1 className="SG-labels">Songs</h1>
        <div className="song-div">
          {songs.map((song) => (

            <div className="song-section">
              <div className="song-sec-div">
                <div className="song-art-cover">
                  <img className="art-cover" alt="temp" src={song.coverImage}></img>
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
                <i id="song-icon-menu" className="fa-solid fa-ellipsis"></i>
                <i id="song-icon-heart" className="fa-solid fa-heart" data-songid={song.id} onClick={((e) => unlikeSong(e))} ></i>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );
}

export default Songs;
