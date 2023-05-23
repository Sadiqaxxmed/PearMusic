import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkLikedSongs, thunkDeleteLikedSongs } from "../../store/song";
import { thunkUserPlaylists } from "../../store/playlist";
import { thunkPlayNow } from "../../store/queue";

import "./Songs.css";

function Songs() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session.user?.id);
  const songs = Object.values(useSelector((state) => state.songs.likedSongs));

  useEffect(() => {
    if (!user_id) return history.push('/browse')
    dispatch(thunkLikedSongs(user_id));
    dispatch(thunkUserPlaylists(user_id));
  }, [dispatch]);

  function unlikeSong(e) {
    dispatch(thunkDeleteLikedSongs(e.currentTarget.dataset.songid, user_id));
  }

  const playNowFunc = (song) => {
    dispatch(thunkPlayNow(song))
  }

  return (
    <>
      <div className="M-song-body">
        <h1 className="M-SG-labels">Liked Songs</h1>
        <div className="M-song-div">
          {songs.map((song) => (
            <div className="M-song-section" onClick={() => playNowFunc(song)}>
              <div className="M-song-sec-div">
                <div className="M-song-art-cover">
                  <img className="M-art-cover" alt="temp" src={song.coverImage}></img>
                </div>
                <div className="M-song-info">
                  <h3 className="M-song-info" id="M-song-name">
                    {song.title}
                  </h3>
                  <p className="M-song-info" id="M-artists-name">
                    {song.artistName}
                  </p>
                </div>
              </div>
              <div className="M-icon-section">
                {/* <i id="M-song-icon-menu" className="fa-solid fa-ellipsis"></i> */}
                <i
                  id="song-icon-heart"
                  className="fa-solid fa-heart"
                  data-songid={song.id}
                  onClick={(e) => unlikeSong(e)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Songs;
