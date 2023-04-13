// TODO: CONSTANTS
const ALL_PLAYLISTS = 'ALL_PLAYLISTS';
const USER_PLAYLISTS = 'USER_PLAYLISTS';
const SONGS_PLAYLIST = 'SONGS_PLAYLIST';
const SINGLE_PLAYLIST = 'SINGLE_PLAYLIST';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
const RESET_PLAYLISTS = 'RESET_PLAYLISTS';

// TODO: ACTION CREATORS
export const actionAllPlaylists = (playlists) => {
  return { type: ALL_PLAYLISTS, playlists }
}

export const actionSinglePlaylist = (playlist) => {
  return { type: SINGLE_PLAYLIST, playlist }
}

export const actionUserPlaylists = (playlists) => {
  return { type: USER_PLAYLISTS, playlists}
}

export const actionSongsPlaylist = (songs) => {
  return { type: SONGS_PLAYLIST, songs }
}

export const actionCreatePlaylist = (song) => {
  return { type: CREATE_PLAYLIST, song}
}

export const actionUpdatePlaylist = (update) => {
  return { type: UPDATE_PLAYLIST, update }
}

export const actionDeletePlaylist = (playlistId) => {
  return { type: DELETE_PLAYLIST, playlistId }
}

export const actionResetPlaylists = (reset) => {
  return { type: RESET_PLAYLISTS, reset }
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

export const thunkPlaylistSongs = (playlistId) => async dispatch => {
  const response = await fetch(`/api/songs/playlistSongs/${playlistId}`)

  if (response.ok) {
    const songs = await response.json();
    const normalize = normalizePlaylistSongs(songs.playlistSongs)
    dispatch(actionSongsPlaylist(normalize))
    return;
  }
}

export const thunkSinglePlaylist = (playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/singlePlaylist/${playlistId}`);

  if (response.ok) {
    const playlist = await response.json();
    dispatch(actionSinglePlaylist(playlist));
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
  singlePlaylist: {},
  playlistDetails: {}
}


// TODO: REDUCER
const playlistReducer = (state = initialState, action) => {
  console.log('INSIDE REDUCER ',action.songs)
  switch (action.type) {
    case ALL_PLAYLISTS:
      return { ...state, allPlaylists: { ...action.playlists }}
    case USER_PLAYLISTS:
      return { ...state, allPlaylists: { ...action.playlists }}
    case SONGS_PLAYLIST:
      return { ...state, singlePlaylist: { ...action.songs }}
    case SINGLE_PLAYLIST:
      return { ...state, playlistDetails: { ...action.playlist }}
    default: return { ...state }
  }
}

export default playlistReducer;
