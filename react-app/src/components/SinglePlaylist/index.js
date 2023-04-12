import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './SinglePlaylist.css'
import { thunkPlaylistSongs, thunkSinglePlaylist } from "../../store/playlist";

function SinglePlaylist() {
  const dispatch = useDispatch()
  const { playlist_id } = useParams()
  const songs = Object.values(useSelector(state => state.playlists.singlePlaylist))
  const playlist = Object.values(useSelector(state => state.playlists.playlistDetails))[0]

  useEffect(() => {
    dispatch(thunkPlaylistSongs(playlist_id))
    dispatch(thunkSinglePlaylist(playlist_id))
  }, [dispatch])


  function totalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

    for (let i = 0; i < songs.length; i++) {
      let duration = songs[i].duration;
      minutes += Math.floor(duration);
      duration.toString().split('.').forEach((second, i)=> i % 2 != 0 ? seconds += parseInt(second) : false )
    }

    return `${minutes} MINUTES, ${seconds} SECONDS`
  }

  function songTotalPlayTime(songs) {
    let minutes = 0;
    let seconds = 0;

      let duration = songs.duration;
      minutes = Math.floor(duration);
      // console.log("HEYYYYYY   : ",minutes)
      // duration.toString().split('.').forEach((second, i)=> i % 2 != 0 && parseInt(second).length > 2 ? second = parseInt(second) : second = `0${parseInt(second)}`)
      console.log(typeof parseInt(duration.toString().split('.')[1]))
      seconds = duration.toString().split('.')[1].toString().length < 2 ? seconds = `0${duration.toString().split('.')[1].toString()}` : seconds = duration.toString().split('.')[1].toString()

      console.log("HEYYYYYYY", seconds)
   return `${minutes}:${seconds}`
  }

  totalPlayTime(songs)
  return (
    <>
      <div className="SGPL-Body">

        <div className="SGPL-Top">
          <div className="SGPL-Top-Left">
            <img className="SG-PL-Img" alt='temp' src={playlist?.coverImage}></img>
          </div>

          <div className="SGPL-Top-Right">
            <h3 className="SGPL-Title">{playlist?.title}</h3>
            <p className="SGPL-Info">{songs.length} SONGS • {totalPlayTime(songs)}</p>
            <p className="SGPL-Description">{playlist?.description}</p>
            <div className="SGPL-Buttons">
              <div className="SGPL-Play-Button">
                <i className="fa-solid fa-play fa-lrg SGPL-play"></i>
                <p className="SGPL-Play-Text">Play</p>
              </div>
              <div className="SGPL-Shuffle-Button">
                <i className="fa-solid fa-shuffle fa-lrg SGPL-Shuffle"></i>
                <p className="SGPL-Shuffle-Text">Shuffle</p>
              </div>
            </div>
          </div>
        </div>

        <div className="SGPL-Bottom">

          <div className="SGPL-Bottom-Title-Header">
            <div className="SGPL-Bottom-Song-Header"> <p className="SGPL-Bottom-text">Song</p> </div>
            <div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Artist</p> </div>
            <div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Album</p> </div>
            <div className="SGPL-Bottom-Time-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Time-text">Time</p> </div>
          </div>
          {songs.map( (song, i) =>

          <div className= {i % 2 == 0 ? "SGPL-Darker-Shade" : '' }>
          <div className="SGPL-Bottom-Title-Header">
          <div className="SGPL-Bottom-Song-Header">
          <div className="SGPL-Bottom-Song">
            <img className="SG-Bottom-PL-Img" alt='temp' src={song.coverImage}></img>
            <p className="SGPL-Bottom-Song-text">{song.title}</p>
          </div>
          </div>
          <div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.artistName}</p> </div>
          <div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{song.genre}</p> </div>
          <div className="SGPL-Time">
            <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">{songTotalPlayTime(song)}</p>
          <div className="SGPL-icon-menu-div">
            <i className="fa-solid fa-ellipsis SGPL-icon-menu"></i>
          </div>
          </div>
          </div>
          </div>

            )}



          {/* <div className="SGPL-Bottom-Title-Header">
            <div className="SGPL-Bottom-Song-Header">
              <div className="SGPL-Bottom-Song">
                <img className="SG-Bottom-PL-Img" alt='temp' src="data:image/jpeg;base64,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"></img>
                <p className="SGPL-Bottom-Song-text">Hours In Silence</p>
              </div>
            </div>
            <div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">Drake</p> </div>
            <div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">Her Loss</p> </div>
            <div className="SGPL-Time">
              <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">5:37</p>
              <div className="SGPL-icon-menu-div">
                <i className="fa-solid fa-ellipsis SGPL-icon-menu"></i>
              </div>
            </div>
          </div>

          <div className="SGPL-Darker-Shade">
            <div className="SGPL-Bottom-Title-Header">
              <div className="SGPL-Bottom-Song-Header">
                <div className="SGPL-Bottom-Song">
                  <img className="SG-Bottom-PL-Img" alt='temp' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSFRISEhIYEhISGB8YGBgYEhIfHx8fHxQwJyUUKyspLjwzHiwwLSQkPT0uLj0zQ0NDKCg8Tjw7Tzw7PDEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIANcA1wMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgIDBAUHAQj/xABMEAACAQMCAwQFBgkICQUAAAABAgMABBESIQUGMRNBUWEHInGBkRQyobHB0RUjQlJTcqLS8BY1VGKCo7LhFyQzNIOSk7PCQ0RjdPH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlVKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKVRcOVR2UamCkgeJA2FBUzAYBIBOw36+XnXtcatubLmS4geaZVCvjX2UZ0KxAYDbw99TNLv5Pf3c7vi3d0ifJ2Um3DI/lvkf2hQTKlQGxvpY5Z7hjh7k2zFW30JJOyhPIhMe+tzxHi9wJbmOIK3ZmEDCgsA4YuQCRrIAGFzQSWlQuXjrAwyMEleEXOfxciOCkIYIVPzGPf1GOlbzhU1wWjM0sMizR6wqqUZTscLuda4O527qDcUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSg1h5etNXafJ49erVq0jrnrWRPwyGQSB41YTEFwR84qAAT7MD4Vl0oMW44bDJr7SNX7RVR8jqFOVHuJOKxl4BbBWQQJpfSW65JXOls9cjJ361s6UGFBwiCPRoiUdmWKnGTlxhic9cjrmvLLhEEDF4olRiMZAOwznSPAeQ2rOpQKUpQK4sON38s7Qw3ErMzsEUPjoTtv5V2muJ8vTLHxFHkYIiytlmIAGx6nuoNp8j434z/APWT96t1ypb8TW5Q3Zl7DDatUikZ0nGwPjUq/lDaf0uH/rR/fWTZ8UgmYrFMkjAZISRWIHjtQZdK5zzLzjcPcNaWIwVfRqCgszg4IGdgAaw71+MWi9vJKzRrjV60bge0dw8xQdSpUc5U5nW8gkdwEeH/AGgHTGM6x4A4PwqITc131/MYrEGNdyAoTVpH5TMenu+mg6lSuV3nFOK8PKtcPrRjj1tDqT+bkbg/Cp7w/mCKW1+WN6kaqS4O5Ur1Xz36eORQbelcrl5o4hxCUx2SlFG4VAmQPFmPT6K8k47xPhzqbnLxsej6GB8QGXof4xQdVpWguuNiWwku7dtJ7NmXIBKsOqnu2NQXg/Ot62tMm4nfCxLoT1TvqbCgZ2xQdZpXIuJcS4va4lneSNSdiRGVz4YGQKk1hzFc31jK1sum9iZVIUJggsPWAbYZGr4Ggqm56K3fyT5OCO2EWvtPF8asaftqQ8ywTvbTJbMVmZRpw2D84ZUHuJGa4vKbn5Vls/K+1Hcue01beXX3V0GO+4hDY3kt0xSZCnZkrFsCwB2G3xoMz0fWF3CkoutSoxGhHfJB31N12B2+Hxl9Qv0dcanuluTcSdpoKafVQYyDnoB4CtNxnnK5uZzb8PGF1FVKqCzY6tvso/jNB02vG6GuUXl7xiyAlmZ9GcEsY3XfuOM6foqc8pcwi/hZyoWRDpdR0yRsw8j9hoIXyRxy5lvY45Lh3Qh8qzZGyHFdTrjXo9/nCP2Sf4DUl5v5ymSY2doMOpCs+kMxY/kqDt3/ABoOgUrl1wvGrdTO7uVUamGqJsDxK/dUq5J5nN8rpIoE8eM6ejA/ljw8/d7gk9KUoFcJ4fw8XV72DMUEkjAsBkjqfsru1cK4ZfrbXoncFljkYkLjJ6jbPtoJp/ovj/pT/wDTT763XLPJ62EjyrMzl0KYKKOrA5+itb/pNtv0M3wj/erYcD52gu5lgSORXcEgsExsue4+VBEeYeAXVndNd26F1LmRWVdWkk5KsPefLFZcPpHYgx3VorqRhwrEZHeCrA5+NVyc63VrdGG7VTEjENpjwxU9HG+/cay+aOaOHz28ijE0roQn4pgVYjZtRG2KDecAmsrqGX5LGkQddEirGiMMqQM469TiufpZXvCJzIkZZcFdQQsjrnO+Pm9B4Gth6N7OcLdzxDGY9EZYeq0mcj247/bWTwTn+RJWS/ARRtlYiCrA9COtB5H6Q4pgI7yzDpkE4KuMjv0sPtrK5zu4Dw1GswqwyyqCEUKOhJBHccqK13PfHrG5iUQAST6gdYjK4HeCSATnwq9wLl2SbhcyEEPJJ2sSnbOlQPdqwQPdQavlPjlxaROtvZmcO+S4SQ7hcacgd321l8e47eXkJgk4eygkEMIpsgg9Rt7R76tck80rY9pb3KsqF9QIXdGxg5HXuFbvj/pEjVdNnl5CR67IQoHsO5NBr+XYZY+G8SSWN4wFLKHRl6pvjPsFUeieJTNcORlljUA+ALb/AFCt+1zcy8MupboBZJI2KqE04XTtkeJ3PsxWj9En+0uv1E/xGgmXOiBrG6BGcJn3hgQfoqH+iQ+vd/qp9bVMucv9xu/1D9dQ30SfPu/1U+tqDR3v87H/AO2v/dFdI58/3C6/VX/uCua8fY2/E3kdThJ1kx4rqDbe6pxzFxyG84fdvAxYIEDZVhgmQbb9aDV+iYjTeZ6ZTOfDDV7c832VtIRZWSO4yutVRAd+gwCWFYXo/gaS14mifPeMKvtKNgVquSeMRWU7PcId10htOSpzvt59/fQbXj/NdzcW8sbWLRxOBlyshAwwOckAVleiXpef2P8Ayqvm3m+O5glt7UNJqALuVICqGG+/icD31b9En/vPYn/lQaP0e/zhH7JP8Brac4cuXEVy15bozqziQFVyyMN9x7d61fo9/nCP2Sf4DUg4vzfd2d20U6qYA+RiPBaMnYg53OPpFBj23pHkX8XdWqvthsEqT7QQalfKl/Y3Ad7WJIZAMOojRXAJ8uozWq41zbw6aCQN+OZlIVDE2oHG25GF9oNaH0W2Tm4eYAiNEKE9xZmGF8+mfhQdVpSlArRvyhYsSxtlJJyTqk6n310f8EQ/o/2n++n4Ih/R/tSffQc2/kbY/wBFX/mk++smw5ctbdxJFAqOuQGBfbIweproH4Jh/R/tP99PwTD+j/bf76CD8T4TBdACeJZMdCRuPYRuK1MPJFih1C3BPg0khHwJ3rp34Ih/R/tSffVD8LgUElMAAknW+wHf1oIrDEqKERQiqMBVAAA8AB0rW8T5dtro6poFdvzhlW+IwTUG4/zpcdvKLaQpCHOgGOMkAHYbrmtO/O1/3XH9zB+7QdHs+TrGJgy26lh01s7fQxIrfAVxn+W9/wD0n+5g/dr0c7X/APSf7mD92g6hxPl21ujqmgV2/OGVb3kYJqzYcp2cDB0t11jcFi7Y8xqJxXNf5a3/APScf8GD92vRztf/ANIz/wAKD92g6/c26SI8ci6o3GGBzuD3VicL4Jb2pYwRCMuAGILHOPaa5X/LW/2/1g4P/wAMH7tVHnLiALDtj6u5HZQbY/s0HXbq2WVWjkUOjjDKc7jwrE4ZwW3tSxgiEZbAbBY5x06muVfy2v8A9P8A3UH7tDzxfjrcY/4MH7tB1Pi3Are6x28SuVGA2WDAeGRvVm05atYopIEi/FSkF1Luc46dTkVza355vQys82tFYFl7OEagDuuQu2RX0JZWdvNHHKiZWVFdTrfoy5HfQQ7hfB4LXWIIxH2mNWCxzjp1PmaxOJcr2lyxeWBS56spdSfbpIzXQ/wTD+j/AGn++n4Jh/M/bf76CBQcv2yRvAkCLG+A43y2D3nqfjVzhnBre119hEI9eNWCxzjOOp8zU5/BMP5n7b/fT8Ew/mftv99BALHly1gcSxQKjjOGBfvGD1NZfEeGw3K6J41kUdNQ3HsPUe6pp+CYf0f7T/fT8EQ/o/2n++g5inI1ip1fJ8+RkkI+GakFvbpGoSNFjReiqoAHuFS78Ew/o/2n++n4Jh/M/bf76CK0qVfgmH8z9t/vpQZ9KUoFKUoPKg3pP498ngW3RsST5LYO4QdR7zt7Aams8qxqzuwVEBZmPQADJY1wDj/ERxG4ecvsXVUjIJPZ5wMd2RnOPbQRu4usuJJEz3hdOnOfHbpWruJNRJAC57gTt8a23MCBZHUb6WIJOcnFaYL40FIGaq092+TjbFbXhXBJLgrpUhC6ofHfO4z7DU/4HylAiskia3J+cQScZOAD3d3woOZpZuRIcaezxqB67nHSr9vbJ+MLdAmpfEnIrpHHOBIe0eIYZlcOSvjgkn34qD3vC5IwCUIDKEGe/J/yoNfDJqaBSAFjO+QcfPyc1caVjHPIwGqdwuceB1Njw/JqtOHTAZ0kFsqNvLc+X+dZFty/Kxw4wqLnxG/dQWoYF0wRtjIzPKx7kA2X3gfFhWFNCxGsoVEjFxttpyen0/Ct4IYIo3VmDsxOornJC7hd+m+M1f4HBcXzsyINAAQEj1VA/IFBDnGCcdM9K7Z6Huaofk3yOaZY5InOjtHVQyu2Qqkncg528xUA5g5QliVpECusYy4RssN+pFWOW+TJuIwTzW7ozwNgwsGDMCuQQemTuAPKg6fzJzpfxvJJaWqPZwSNGXcOSzI4VtwcKNRwO84Jqd8C4kLq3huVUoJkDaSdwT1Xzwc18xWFzOf9WEsgjdwWhDuA7ZA04H5ROBX1NZ2yxIkcahERQqqO4AfNoL9KUoFKUoFKUoFKUoPaUpQKUpQa3mG1M1rdRDrJE6jfvKGuBcuRapDE4AeMEnxOnf319HMM5HjXJH4HFBcagGEiFgoPQD2/ZQc85pjb5VMuSxLnu6+GBWfwXlhtSvOuQQcLnG/hU0XhTtJJJ2KLnckgkk9zeVZltwzSQ8ja3A38M0HvDrAgFdKgEgggb7d/trcW8QRdPU95xuSKtxMB5Yq4HFBbuYQRtgH+PjUamVZiFkUdTpYHw7vKpMzeNYxsQTkdOtBGZCoOy4UYAPUDc7fGse5i1lGI7MKcFVORuemPtqUS8JU5Jxv/AFdqwZ7QLqOAQRgjBPTptQRK55f7VGMeGkYgAhids9c+zf3VLOFQmzijjTSkaD12YgZJNW+E3K9ooIxqBx0646Vub6DKFtHaBd9Pft9dBjOYLnVJDIFmjAJx348R3g9KwuQZxZ8Rns1UCK8UTx740kKSVHj+UPcKyrBnlMb9ksIUal0nJ096n2+FaXjCPBcWN/GMmAlWHkWPq+wgsKCxzDy9dwcaW4t7aSRHmSZWRMrgkawTjC76uvjmu31YsrlJUSRDlXAI+73VfoFKUoFKUoFKUoFKUoPaUpQKUpQKj/G7VdesqDqHXHeKkFYnEYNaHxXcUEZc7GsCWs6RcVjtHnbvoMPUfOryZ+NVtFg0dgoyeg60HufGr6P5VG7zm61jJXXrYHHqjIq9Z8wawCIzpPecj6xQSHTq6jasWe0HWltxAN4VlZ1CgifEbMxkOgwQdQPmPyfYa31hcCRAQf8AI+FU8Qt9asO89M+NQ6z4ybaZgwJjbGrvwQevwoJbwu3EbGNC0jkHJI3x1zgVj8ZbSxjZcAAZBHjvVFrePDIbhMTxupwp2Iyc9fI1h3nEWuXMjqEOMAAk4A6Cg2/K/Gvkz6HP4lzuPzT+cPtroiMCAQQQRkEHb21xgGszhvpFSxJhmDSxDONOCynwGdiKDrlK4bxf0w3UjEWsUcCdxYa39/cPhWnPpQ4mSP8AWV27hBD+7QfRVK5DyF6SpZrkW9+6FZvVRwippbuU42Ibp7cV16gUpSgUpSgqpSlApSlB5SvaUEa4hbaXYe8ew1gR7E5re8f4fLMn+ryLHMvQupKnyONx7RUPWx4grtHJFHMUTVriZlAOdo/XGCx69dh1oPOL8XjgV3kOAnXxz4VyzjvNk1ySqsY4s9B4edTyfhovoy7FlKMUdHXDKw/JPUfCo3e8lnPqHGPGgjnDb+CA62Bkk7jpzg+w1vrPj73MixhOzj7yMaj7+g+vzrFbk9wdyCP6pqScE5bWMajvQbXhcya+zTJ0jc74z4ZqRwuDUfuOIw2aF5GA+snwHjUUl9JLBj2duCM7F2wfgOlB0a8b1TXJuOyOrMx2j1nK/H1vPqay5/SNeyDCJAg8omY/Sd/hUUvL+SQntMZO5AQDv/zoN3y9zG0D9nISYScDfOnPf7Kmr4Kq640uM5rkg9lSfgXMgggkjfLFd4x13O2nyHfQZXMfGDF+LjOHYbnwBqFu5OST1queRpGLuSWY5JrHNBWDXoNU1WieNB6j478V9E8i88wXVtGJ7hI7mMBJBJIqliBs4yfWzjfzzXzwI891etDjrj4ig+uopFYakYMp6FSCPoqsivk7hvFJ7VtdvO8LeKOQD7R0PvroPDPTHcoqrPBHORsXDMhPmQARn2AUHb6VzDh/pkt3OJraSFcblXVxnwxgGlB1GlKUClKUClKUClKUEWvoNDSLjAO/05qPzs2TsOlTbjMGVDgbrsfZUJuJwNWo4Vc5oIxxHiwgYEoxXO5A2qSJxKIW5n1jslXUT7untqPcw8Utuwb1hqJI7vhUM7N/k2oyGOAkEKx+e4/NHfgdT40FnmHiT3kpdz2cY2RSeg8fae+sG2skc47ZFP8AW2qzlc7gn31ejgRzgSdmT01dKDMk4FKoDRsko8UfJ+FYbTOnqyLnHcy70ltJIvWwQO5lJx7c1U1+7jTIe0A/OG499B66owymQe9SfqNYhTIJHdv7qvyRdn2bZBDjUu/gcFTS8lVnkZV0hu4dN1oMPNUFqoLUFBdAqpWJ276oC1fhTegpSInber3ybHWvHkwcivVLNsPafvoPHQAbDJP21SYsfOBB/VyKzYtKescFvHw9ley8RJwFyTQa8Dzz9FKynGRqlYeQpQfWdKUoFKUoFKUoFKUoNLzRxyKwt5J5twBpVO92PRB/GwBr55vua5pEdHI1sxOpQBsfyfdUg9JfMS3tw66yLeDKQ4GVd/ypD5HGB5CoA6ah50HsKa21MSfbWdf3zSFQdkjUIi9wA+/qfM1hQnC161B43WqSd63/AAXlC9vYzLaw9pGrlCe0iGCFBwQxB6EVrePcInspTBcRmN1AOOoYHvBGzCgogvHQFVchT1XqKpuGTShUESZOsbYx3EVhoe/ejvQXGcnHgPtpn1C3ix/w1ZZu6qnb1FXzJoLKiryira1cXc4oK08TV6IbEnvqwBkgd1XJX7u4bUHjPk+VV9scbDAqqCDvbb66rdxnSooMViT1NXIo2JwuayVhq6hdNkXLHvoC8Jbq7YpRo5Tu8gQ+7PwpQfV1KUoFKUoFKUoFQz0i8dMES2sJJubvKqAdwmcM3lnOB7z3VKOI30dvG80zBI41LMx7h9pPhXzZzFzPLdXkl2rFDnEY2OhF+avhnx8yaDH5isuzcwqdbxgFyOinG61hWkGrGKzODku5DEtIzaiT1OTufOs/iNgLWQYI0SDI/qHvU+R7qCPXsHZtt807j7qshq2t2Bv3g1qXTHTcUHbfQPc5t7uP8yVX/wCdMf8AhUU9KXM0V+saKmie0lljlVuuzaQyn8oHTv3j6at+iTmSGwlu2uZBHE8QYbElmV9lAHUkMfhUL5gvVnubmeMEJNK7qDjIDOSM+dBg5qhmqnNAKBimK9zVajHtoPAKuD1RnvNeIuTXshyQO6gR7DzarikA9MnuH20UdTjONgPtqnQSd9vGgrMhJwNzWVbRAeZPXNWIoyOgz51mRW4J9dseQ2//ACg8aXHTc+AFXE1t89xGv01m26RqNgP4/g1WAh2IHgc/XQa5+wTvMh7yxyPgKVnMka/kqf1gKUH09SlKBSlKBSlanmPjCWdvJM2CQDoUkDU3cvx60HLfTHx1pZVsY2xHAA8m+zOei/2QR728q5ai1lcUvXmd3kbW7sWZvEs2SPMZzWOiUF61ZkdXU4ZTkfdWfc3pkZmffOcg/wAfx9eA76e7pVkT5ZQdhnBOOgz186C44Ow3Kk6V27/zc1jOrKSGGG7wf43rfXEyRP2ONcOQzKRqDEL6r74OT12IGDjfqcCWb5Q5QKketiVGvATvCgsfdud9vbQa0oG6eqfDuqyUxsTV1WwSDuPGrTtQUkUAooq4BQUivc17pqtEoKgNI8zVpOpPhVUz1VbxZ699BciUtsNvE1kxoqjf1j1yTVHkPqqk46E4B7zQZC3GarZFkwM4JOxBrXLG35Oay7a1kc9cDxxQUyQuh9V8+w5qpBOcYyc+Vby04eEByceLN/HnWTqWP2jBGfrx3UGjThEr5LPv5mlZVzfFjhenx91KD6hpSlArylKDRc18zRcNh7aYMxY6Y0Ubs2Pm56D2mvn/AJm5gmvHeSd8s2cAatKKP/TUfb315Sg0QFZSLgV5SgtMdzVO1KUHrXJbQH9ZYwFwMA6dWcZx1896uxg3EuMrAi6iMLkKqjONt22+NKUGFPJqJwSVGdJIGcd2axqUoK1FVg0pQV17nA9tKUFtV1H2VmINq9pQW2kG2Bv1+mr0NuT6zb5r2lBtIbLHX2nFbFcKPVGMefd/BpSgwri+077/AOeK1Ul00h22FKUGfaWoAJbf4V5SlB//2Q=="></img>
                  <p className="SGPL-Bottom-Song-text">Text Go Green</p>
                </div>
              </div>
              <div className="SGPL-Bottom-Artist-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">Drake</p> </div>
              <div className="SGPL-Bottom-Album-Header"> <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">Honestly, Nevermind</p> </div>
              <div className="SGPL-Time">
                <p className="SGPL-Bottom-text" id="SGPL-Bottom-Info-Text">5:37</p>
                <div className="SGPL-icon-menu-div">
                  <i className="fa-solid fa-ellipsis SGPL-icon-menu"></i>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default SinglePlaylist;
