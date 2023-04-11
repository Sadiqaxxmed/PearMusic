// TODO: CONSTANTS
const ALL_PLAYLISTS = 'ALL_PLAYLISTS';
const USER_PLAYLISTS = 'USER_PLAYLISTS';

// TODO: ACTION CREATORS
export const actionAllPlaylists = (playlists) => {
  return { type: ALL_PLAYLISTS, playlists }
}


// TODO: NORMALIZE DATA
const normalizePlaylistSongs = (playlists) => {
  let normalize = {};
  playlists.forEach(playlist => {
    normalize[playlist.id] = playlist;
  })
  return normalize;
}


// TODO: THUNK AC'S
export const thunkAllPlaylists = () => async dispatch => {
  const response = await fetch('/playlists/allPlaylists')

  if (response.ok) {
    const allPlaylists = await response.json();
    const normalized = normalizePlaylistSongs(allPlaylists.playlists);
    dispatch(actionAllPlaylists(normalized));
    return;
  }
}

// export const thunkUserSongs = (userId) => async dispatch => {
//   const response = await fetch(`/songs/allSongs/${userId}`)
//   if (response.ok) {
//     const allUserSongs = await response.json();
//     const normalized = normalizeAllSongs(allUserSongs.songs)
//     dispatch(actionUserSongs(normalized))
//     return;
//   }
// }

// TODO: INITIAL SLICE STATE
const initialState = {
  allPlaylists: {},
  singlePlaylist: {}
}


// TODO: REDUCER
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PLAYLISTS:
      return { ...state, allPlaylists: { ...action.playlists }}
    default: return { ...state }
  }
}

export default playlistReducer;
