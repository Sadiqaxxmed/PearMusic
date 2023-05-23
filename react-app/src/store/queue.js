// CONSTANTS
const ADD_SONG = 'ADD_SONG'
const PLAY_NOW = 'PLAY_NOW'
const REMOVE_SONG = 'REMOVE_SONG'
const NEW_QUEUE = 'NEW_QUEUE'

// Action Creators
export const actionAddSong = song => ({
    type: ADD_SONG,
    payload: song,
});

export const actionPlayNow = song => ({
    type: PLAY_NOW,
    payload: song,
});

export const actionRemoveSong = () => ({
    type: REMOVE_SONG,
});

export const actionNewQueue = songs => ({
    type: NEW_QUEUE,
    songs,
});

const normalizePlaylistSongs = (playlists) => {
    let normalize = {};
    playlists.forEach(playlist => {
        normalize[playlist.id] = playlist;
    })
    return normalize;
}

//thunks

//adds song to back of existing queue
export const thunkAddSong = (song) => async dispatch => {
    dispatch(actionAddSong(song))
    return
}
//resets queue so only clicked song is in it
export const thunkPlayNow = (song) => async dispatch => {
    dispatch(actionPlayNow(song))
    return
}

export const thunkRemoveSong = () => async dispatch => {
    dispatch(actionRemoveSong())
    return
}

//makes new queue filled with playlist songs on (play click) for playlists or albums
export const thunkNewQueue = (playlistId) => async dispatch => {
    const response = await fetch(`/api/songs/playlistSongs/${playlistId}`)
    if (response.ok) {
        const songs = await response.json()
        const normalized = normalizePlaylistSongs(songs.playlistSongs)
        dispatch(actionNewQueue(normalized))
        return;
    }
}

export const thunkExploreQueue = (songs) => dispatch => {
    const normalized = normalizePlaylistSongs(songs)
    dispatch(actionNewQueue(normalized))
}

// Reducer
const initialState = {
    queue: [],
};

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SONG:
            return {
                ...state,
                queue: [...state.queue, action.payload],
            };

        case PLAY_NOW:
            return {
                ...state,
                queue: [action.payload],
            };

        case REMOVE_SONG:
            return {
                ...state,
                queue: state.queue.slice(1),
            };

        case NEW_QUEUE:
            return {
                ...state,
                queue: action.songs,
            };

        default:
            return state;
    }
};

export default queueReducer;