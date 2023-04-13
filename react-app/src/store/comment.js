// TODO: CONSTANTS
const GET_COMMENTS = 'GET_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';

// TODO: ACTION CREATORS
export const actionGetComments = comments => {
  return { type: GET_COMMENTS, comments }
};

export const actionCreateComment = comment => {
  return { type:CREATE_COMMENT, comment}
}

// TODO: NORMALIZE
const normalizeComments = comments => {
  const normalized = {}
  comments.forEach(comment => {
    normalized[comment.id] = comment
  })
  return normalized
}

// TODO: THUNK AC'S
export const thunkGetComments = (playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/singlePlaylist/${playlistId}/comments`)

  if (response.ok) {
    const data = await response.json()
    let res = normalizeComments(data.comments)
    dispatch(actionGetComments(res));
    return;
  }
}

export const thunkCreateComment = (comment, userId, playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/singlePlaylist/${playlistId}/newComment/${userId}`, {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      comment
    })
  })

  if (response.ok) {
    const data = await response.json()
    console.log(data)
    dispatch(thunkGetComments(data.comment.comment_id))
  }
  return;
}

// TODO: INITIAL SLICE STATE
const initialState = {
  playlistComments: {}
}


// TODO: REDUCER
const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, playlistComments: { ...action.comments }}
    default: return { ...state }
  }
}

export default commentsReducer;
