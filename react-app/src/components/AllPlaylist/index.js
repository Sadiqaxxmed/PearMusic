import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './AllPlaylist.css'
import { useDispatch, useSelector } from "react-redux";
import { thunkAllPlaylists, thunkResetPlaylists, thunkResetSinglePlaylist } from "../../store/playlist";
import { thunkResetComments } from "../../store/comment";

function AllPlaylist() {
  const dispatch = useDispatch();
  const allPlaylists = Object.values(useSelector(state => state.playlists.allPlaylists));

  useEffect(() => {
    dispatch(thunkAllPlaylists());

    dispatch(thunkResetSinglePlaylist());
    dispatch(thunkResetComments());

  }, [dispatch])

  return (
    <>
      <div className="PL-Body">
        <h1 className="PL-Body-Title">All Playlist</h1>
        {
          allPlaylists.map(playlist =>
              <div className="PL-Section" key={playlist.id}>
                <div className="PL-Div">
                  <div className="PL-Top-Sec"></div>
                  <div className="PL-CoverImg">
                    <Link exact="true" to={`/SinglePlaylist/${playlist.id}`} style={{ textDecoration: 'none' }}>
                      <img className="PL-Img" alt='Playlist Cover' src={playlist.coverImage} id='test'></img>
                    </Link>
                  </div>
                  <div className="PL-Bottom-Sec">
                    <h3 className="PL-Title">{playlist.title}</h3>
                    {/* <div className="icons-sec">
                      <i id='PL-icon-heart' className="fa-solid fa-heart"></i>
                      <i id='PL-icon-menu' className="fa-solid fa-ellipsis"></i>
                    </div> */}
                  </div>
                </div>
              </div>
          )
        }
      </div>
    </>
  )
}

export default AllPlaylist;
