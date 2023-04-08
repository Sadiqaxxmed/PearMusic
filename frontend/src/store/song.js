// ? DO WE NEED CSRF FETCH ?


// TODO: CONSTANTS
const ALL_SONGS = 'ALL_SONGS';

// TODO: ACTION CREATORS
export const actionAllSongs = (songs) => {
  return { type: ALL_SONGS, songs }
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
  const response = await fetch('/songs/allSongs')

  if (response.ok) {
    const allSongs = await response.json();
    const normalized = normalizeAllSongs(allSongs.songs);
    dispatch(actionAllSongs(normalized));
    return;
  }
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
    default: return { ...initialState }
  }
}

export default songsReducer;
