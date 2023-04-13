import { actionSingleSong } from "./song";

// CONSTANTS
const ADD_SONG = 'ADD_SONG'
const PLAY_NOW = 'PLAY_NOW'
// const REMOVE_SONG = 'REMOVE_SONG'
// const MOVE_SONG = 'MOVE_SONG'
const NEW_QUEUE = 'NEW_QUEUE'

// ACTION CREATORS
export const actionAddSong = (song) => ({
    type: ADD_SONG,
    payload: song,
});

export const actionPlayNow = (song) => ({
    type:PLAY_NOW,
    payload:song
})

// export const actionRemoveSong = (songId) => ({
//     type: REMOVE_SONG,
//     payload: songId,
// });

// export const actionMoveSong = (songId, newIndex) => ({
//     type: MOVE_SONG,
//     payload: { songId, newIndex },
// });

export const actionNewQueue = (songs) => ({
    type: NEW_QUEUE,
    songs
})

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
    // console.log('///////////////////' , song)
    dispatch(actionAddSong(song))
    return
}
//resets queue so only clicked song is in it
export const thunkPlayNow = (song) => async dispatch => {
    console.log(song)
    dispatch(actionPlayNow(song))
    return
}

//makes new queue filled with playlist songs on (play click) for playlists or albums
export const thunkNewQueue = (playlistId) => async dispatch => {
    const response = await fetch(`/api/songs/playlistSongs/${playlistId}`)
    console.log(response)
    if (response.ok) {
        const songs = await response.json()
        const normalized = normalizePlaylistSongs(songs.playlistSongs)
        dispatch(actionNewQueue(normalized))
        return;
    }
}

// reducers
const initialState = {
    queue: [],
};

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SONG':
            return {
                ...state,
                queue: [...state.queue, action.payload],
            };
        case 'PLAY_NOW':
            return{
                ...state,
                queue:[{...action.payload}]
            }
        // case 'REMOVE_SONG':
        //     return {
        //         ...state,
        //         queue: state.queue.filter((song) => song.id !== action.payload),
        //     };
        case 'NEW_QUEUE':
            return { ...state, queue: {...action.songs}}
        // case 'MOVE_SONG': {
        //     const { songId, newIndex } = action.payload;
        //     const song = state.queue.find((song) => song.id === songId);
        //     const newQueue = state.queue.filter((song) => song.id !== songId);
        //     newQueue.splice(newIndex, 0, song);
        //     return {
        //         ...state,
        //         queue: newQueue,
        //     };
        // }
        default:
            return state;
    }
};

export default queueReducer;