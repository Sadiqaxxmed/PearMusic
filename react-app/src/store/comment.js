// TODO: CONSTANTS
const GET_COMMENTS = 'GET_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';
const RESET_COMMENTS = 'RESET_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// TODO: ACTION CREATORS
export const actionGetComments = comments => {
  return { type: GET_COMMENTS, comments }
};

export const actionCreateComment = comment => {
  return { type: CREATE_COMMENT, comment}
}

export const actionResetComment = reset => {
  return { type: RESET_COMMENTS, reset}
}

export const actionDeleteComment = comment => {
  return { type: DELETE_COMMENT, comment }
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
    dispatch(thunkGetComments(data.comment.comment_id))
  }
  return;
}

export const thunkDeleteComment = (commentId, playlistId) => async dispatch => {
  const response = await fetch(`/api/playlists/singlePlaylist/deleteComment/${commentId}`, {
    method:'DELETE'
  })

  if (response.ok) {
    dispatch(thunkGetComments(playlistId));
    return { message: 'Comment Successfully Deleted' };
  }
  return { message : 'There was an error deleting the message', status: response.status }
}


export const thunkResetComments = () => async dispatch => {
  dispatch(actionResetComment({ playlistComments: {} }));
  return { message: 'Successfully cleared state'}
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
    case RESET_COMMENTS:
      return { ...action.reset, playlistComments: { ...action.comments } }
    default: return { ...state }
  }
}

export default commentsReducer;
