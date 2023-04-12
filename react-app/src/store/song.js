// ? DO WE NEED CSRF FETCH ?


// TODO: CONSTANTS
const ALL_SONGS = 'ALL_SONGS';
const USER_SONGS = 'USER_SONGS';
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
  return { type: SINGLE_SONG, song}
}

export const actionUserSongs = (songs) => {
  return { type: USER_SONGS, songs}
}

export const actionUpdateSong = (song) => {
  return { type: UPDATE_SONG, song}
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

export const thunkResetSongs = () => async dispatch => {
  dispatch(actionResetSongs(initialState));
  return;
};

export const thunkSingleSong = (song) => async dispatch => {
  dispatch(actionSingleSong(song))
  return;
}


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
    default: return { ...state }
  }
}

export default songsReducer;
