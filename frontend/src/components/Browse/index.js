import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllAlbums } from "../../store/album";
import { thunkAllSongs } from "../../store/song";
import './Browse.css'

function Browser() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const albums = Object.values(useSelector(state => state.albums.allAlbums))
  const songs = Object.values(useSelector(state => state.songs.allSongs))

  console.log('SONGS :   ', songs)

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
          <div className="BR-album-carousel">
            {/* ITERATE THROUGH ALBUM LIST AND DISPLAY DATA */}
            {/* <img className="BR-album-images" src='https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/e2/61/f8/e261f8c1-73db-9a7a-c89e-1068f19970e0/16UMGIM67863.rgb.jpg/632x632bb.webp' />
          <img className="BR-album-images" src='https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/f0/b0/21/f0b021d2-8bfb-e2ff-93f9-17c64147f971/18UMGIM14845.rgb.jpg/632x632bb.webp' />
          <img className="BR-album-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/60/7c/e2/607ce27e-88bb-8113-9cea-250d4f0becd7/21UMGIM77374.rgb.jpg/592x592bb.webp' /> */}
            {albums.map(album =>
              <div key={album.id}>
                <img className='BR-album-images' src={album.coverImage}></img>
                <h3>{album.title}</h3>
              </div>
            )}
          </div>
        )}
        <h1 className="BR-labels">Songs</h1>
        {songs && (
          <div className="BR-songs-carousel">
            {/* <img className="BR-song-images" src='https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/e5/6d/fb/e56dfbad-9def-634d-f06a-4ec1335eff7e/1963621048327_cover.jpg/632x632bb.webp' /> */}
            {/* {songs.map(song => {
            <div key={song.id}>
              <img className="BR-song-images" src={song.coverImage}/>
              <h3>{song.title}</h3>
            </div>
          })
          } */}
            {songs.map(song =>
              <div key={song.id}>
                <img className='BR-song-images' src={song.coverImage}></img>
                <h3>{song.title}</h3>
              </div>
            )}
          </div>
        )}
      </div>
    )
  )

}


export default Browser;
