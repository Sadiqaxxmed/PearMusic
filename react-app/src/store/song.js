// ? DO WE NEED CSRF FETCH ?


// TODO: CONSTANTS
const ALL_SONGS = 'ALL_SONGS';
const USER_SONGS = 'USER_SONGS';
const LIKED_SONGS = 'LIKED_SONGS';
const DELETE_LIKED_SONG = 'DELETE_LIKED_SONG';
const SINGLE_SONG = 'SINGLE_SONG';
const UPDATE_SONG = 'UPDATE_SONG';
const DELETE_SONG = 'DELETE_SONG';
const RESET_SONGS = 'RESET_SONGS';

// TODO: ACTION CREATORS
export const actionAllSongs = (songs) => {
  return { type: ALL_SONGS, songs }
}

export const actionResetSongs = (reset) => {
  return { type: RESET_SONGS, reset }
};

export const actionSingleSong = (song) => {
  return { type: SINGLE_SONG, song }
}

export const actionUserSongs = (songs) => {
  return { type: USER_SONGS, songs }
}

export const actionLikedSongs = (songs) => {
  return { type: LIKED_SONGS, songs }
}

export const actionDeleteLikedSongs = (songs) => {
  return { type: DELETE_LIKED_SONG, songs }
}

export const actionUpdateSong = (song) => {
  return { type: UPDATE_SONG, song }
}

export const actionDeleteSong = (song) => {
  return { type: DELETE_SONG, song }
}

// TODO: NORMALIZE DATA
const normalizeAllSongs = (songs) => {
  let normalize = {};
  songs.forEach(song => {
    normalize[song.id] = song;
  })
  return normalize;
}


// TODO: THUNK AC'S
export const thunkAllSongs = () => async dispatch => {
  const response = await fetch('/api/songs/allSongs')

  if (response.ok) {
    const allSongs = await response.json();
    const normalized = normalizeAllSongs(allSongs.songs);
    dispatch(actionAllSongs(normalized));
    return;
  }
}

export const thunkUserSongs = (userId) => async dispatch => {
  const response = await fetch(`/api/songs/allSongs/${userId}`)
  if (response.ok) {
    const allUserSongs = await response.json();
    const normalized = normalizeAllSongs(allUserSongs.songs)
    dispatch(actionUserSongs(normalized))
    return;
  }
}

export const thunkLikedSongs = (userId) => async dispatch => {
  const response = await fetch(`/api/songs/likedSongs/${userId}`)

  if (response.ok) {
    const allUserSongs = await response.json();
    console.log('THUNNNNKKKKK :    ', allUserSongs)
    const normalized = normalizeAllSongs(allUserSongs.likedSongs)
    dispatch(actionLikedSongs(normalized))
    return;
  }
}

export const thunkDeleteLikedSongs = (songId, userId) => async dispatch => {
  const response = await fetch(`/api/songs/likedSongs/${songId}/${userId}`, {method:'PUT'})

  if (response.ok) {
    const allUserSongs = await response.json();
    console.log('THUNNNNKKKKK :    ', allUserSongs)
    // const normalized = normalizeAllSongs(allUserSongs.likedSongs)
    // dispatch(actionLikedSongs(normalized))
    return;
  }
}

export const thunkSingleSong = (song) => async dispatch => {
  dispatch(actionSingleSong(song))
  return;
}

export const thunkUpdateSong = (song) => async dispatch => {
  const response = fetch('<whatever path sadiq sets up>')

  if (response.ok) {
    const updatedSong = await response.json();
    // TODO: ADD NORMALIZATION IF NEEDED
    return;
  }
  return { error: 'There was a problem updating the song', statusCode: response.status}
}

export const thunkDeleteSong = (songId, userId) => async dispatch => {
  const response = fetch('<whatever path sadiq sets up>')

  if (response.ok) {
    const deletedSong = await response.json();
    // TODO: FINISH THE REST OF ROUTE
    dispatch(thunkUserSongs(userId))
    return deletedSong;
  }

  return { error: 'There was a problem deleting the song', statusCode: response.status };
}


export const thunkResetSongs = () => async dispatch => {
  dispatch(actionResetSongs(initialState));
  return;
};


// TODO: INITIAL SLICE STATE
const initialState = {
  allSongs: {},
  singleSong: {}
}


// TODO: REDUCER
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SONGS:
      return { ...state, allSongs: { ...action.songs } }
    case SINGLE_SONG:
      return { ...state, singleSong: { ...action.song } }
    case RESET_SONGS:
      return action.reset
    case USER_SONGS:
      return { ...state, allSongs: { ...action.songs }}
    case LIKED_SONGS:
      return { ...state, allSongs: { ...action.songs }}
    default: return { ...state }
  }
}

export default songsReducer;
