import React, { useEffect } from "react";
import './Albums.css'
import { useDispatch, useSelector } from "react-redux";
import { thunkUserPlaylists } from "../../store/playlist";

function Albums() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user?.id)

  useEffect(() => {
    dispatch(thunkUserPlaylists(user));
  }, [dispatch])
  return (
      <div className="AL-Body">
          <h1 className="AL-labels">Albums</h1>
      </div>
  )
}

export default Albums;
