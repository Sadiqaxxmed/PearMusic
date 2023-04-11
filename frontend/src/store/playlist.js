// TODO: CONSTANTS
const ALL_PLAYLISTS = 'ALL_PLAYLISTS';
const USER_PLAYLISTS = 'USER_PLAYLISTS';
const RESET_PLAYLISTS = 'RESET_PLAYLISTS';

// TODO: ACTION CREATORS
export const actionAllPlaylists = (playlists) => {
  return { type: ALL_PLAYLISTS, playlists }
}

export const actionUserPlaylists = (playlists) => {
  return { type: USER_PLAYLISTS, playlists}
}

export const actionResetPlaylists = (reset) => {
  return { type: RESET_PLAYLISTS, reset}
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
  const response = await fetch('/api/playlists/allPlaylists')

  if (response.ok) {
    const allPlaylists = await response.json();
    const normalized = normalizePlaylistSongs(allPlaylists.playlists);
    dispatch(actionAllPlaylists(normalized));
    return;
  }
}

export const thunkUserPlaylists = (userId) => async dispatch => {
  const response = await fetch(`/api/playlists/allPlaylists/${userId}`)
  if (response.ok) {
    const allUserPlaylists = await response.json();
    const normalized = normalizePlaylistSongs(allUserPlaylists.playlists)
    dispatch(actionUserPlaylists(normalized))
    return;
  }
}

export const thunkResetPlaylists = () => async dispatch => {
  dispatch(actionResetPlaylists)
  return;
}

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
    case USER_PLAYLISTS:
      return{ ...state, allPlaylists: { ...action.playlists }}
    default: return { ...state }
  }
}

export default playlistReducer;
