// TODO: CONSTANTS
const ALL_PLAYLISTS = 'ALL_PLAYLISTS';
const USER_PLAYLISTS = 'USER_PLAYLISTS';
const SONGS_PLAYLIST = 'SONGS_PLAYLIST';
const SINGLE_PLAYLIST = 'SINGLE_PLAYLIST';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
const DELETE_SONG_PLAYLIST = 'DELETE_SONG_PLAYLIST'
const RESET_PLAYLISTS = 'RESET_PLAYLISTS';
const ADD_TO_PLAYLIST  = 'ADD_TO_PLAYLIST'

// TODO: ACTION CREATORS
export const actionAllPlaylists = (playlists) => {
  return { type: ALL_PLAYLISTS, playlists }
}

export const actionSinglePlaylist = (playlist) => {
  return { type: SINGLE_PLAYLIST, playlist }
}

export const actionUserPlaylists = (playlists) => {
  return { type: USER_PLAYLISTS, playlists }
}

export const actionSongsPlaylist = (songs) => {
  return { type: SONGS_PLAYLIST, songs }
}

export const actionCreatePlaylist = (song) => {
  return { type: CREATE_PLAYLIST, song }
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

export const actionDeleteSongPlaylist = (songId) => {
  return { type: DELETE_SONG_PLAYLIST, songId}
}

export const actionAddToPlaylist  =(songId,playlistId) => {
  return { type: ADD_TO_PLAYLIST, songId, playlistId}
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

export const thunkCreatePlaylist = (songId,userId) => async dispatch => {

  const response = await fetch(`/api/playlists/createPlaylist/${songId}`, {
    method: 'POST'
  })

  if (response.ok) {
    const playlist = await response.json();
    dispatch(thunkSinglePlaylist(playlist.playlist.id))
    dispatch(thunkUserPlaylists(userId))
    dispatch(thunkAllPlaylists())
    return await playlist.playlist.id;
  }
}

export const thunkUpdatePlaylist = ({title,description,coverImage},playlistId,userId) => async dispatch => {
  const response = await fetch(`/api/playlists/update/${playlistId}`, {
    method: 'PUT',
    headers:{'content-type': 'application/json'},
    body:JSON.stringify({ title: title, description: description, coverImage: coverImage })
  })

  if (response.ok) {
    dispatch(thunkUserPlaylists(userId))
    dispatch(thunkSinglePlaylist(playlistId))
    return { message: 'Successfully updated playlist', status: 201 }
  }
}

export const thunkDeletePlaylist = (playlistId, userId) => async dispatch => {
  const response = await fetch(`/api/playlists/singlePlaylist/${playlistId}/delete`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(thunkAllPlaylists())
    dispatch(thunkUserPlaylists(userId))
    return;
  }
}

export const thunkDeleteSongPlaylist = (songId,playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`,{
    method:'DELETE'
  })

  if(response.ok){
    const data = await response.json()
    dispatch(thunkPlaylistSongs(playlistId))
    return
  }

}

export const thunkAddToPlaylist = (songId,playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`,{
    method:'POST'
  })

  if(response.ok){
    dispatch(thunkSinglePlaylist(playlistId))
    return;
  }
}

export const thunkResetPlaylists = () => async dispatch => {
  dispatch(actionResetPlaylists(initialState))
  return;
}

// TODO: INITIAL SLICE STATE
const initialState = {
  allPlaylists: {},
  userPlaylists: {},
  singlePlaylist: {},
  playlistDetails: {}
}


// TODO: REDUCER
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PLAYLISTS:
      return { ...state, allPlaylists: { ...action.playlists } }
    case USER_PLAYLISTS:
      return { ...state, userPlaylists: { ...action.playlists } }
    case SONGS_PLAYLIST:
      return { ...state, singlePlaylist: { ...action.songs } }
    case SINGLE_PLAYLIST:
      return { ...state, playlistDetails: { ...action.playlist } }
    case RESET_PLAYLISTS:
      return {...action.reset}
    default: return { ...state }
  }
}

export default playlistReducer;
