// ? DO WE NEED CSRF FETCH ?


// TODO: CONSTANTS
const ALL_ALBUMS = 'ALL_ALBUMS';
const RESET_ALBUMS = 'RESET_ALBUMS';

// TODO: ACTION CREATORS
export const actionAllAlbums = (albums) => {
  return { type: ALL_ALBUMS, albums }
}

export const actionresetAlbums = (reset) => {
  return { type: RESET_ALBUMS, reset }
};


// TODO: NORMALIZE DATA
const normalizeAllAlbums = (albums) => {
  let normalize = {};
  albums.forEach(album => {
    normalize[album.id] = album;
  })
  return normalize;
}


// TODO: THUNK AC'S
export const thunkAllAlbums = () => async dispatch => {
  const response = await fetch('/albums/allAlbums')

  if (response.ok) {
    // ! PROBABLY SHOULD FIX REPETITIVE KEYS (albums: albums)
    // ! allAlbums = {albums: albums: [album, album, album]}
    const allAlbums = await response.json();
    const normalized = normalizeAllAlbums(allAlbums.albums)
    dispatch(actionAllAlbums(normalized))
    return;
  }
}

export const thunkResetAlbums = () => async dispatch => {
  dispatch(actionresetAlbums(initialState));
  return;
};


// TODO: INITIAL SLICE STATE
const initialState = {
  allAlbums: {},
  singleAlbum: {}
}


// TODO: REDUCER
const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ALBUMS:
      return { ...state, allAlbums: { ...action.albums } }
    case RESET_ALBUMS:
      return action.reset
    default: return { ...state }
  }
}

export default albumsReducer;
