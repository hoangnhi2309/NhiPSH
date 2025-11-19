import * as ActionTypes from './ActionTypes';

export const comments = (
  state = {
    isLoading: true,
    errMess: null,
    comments: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: []
      };

    case ActionTypes.COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        comments: []
      };

    case ActionTypes.ADD_COMMENT:
      const newComment = action.payload;
      // Generate new ID based on max existing ID
      const maxId = state.comments.reduce((max, c) => Math.max(max, c.id), 0);
      newComment.id = maxId + 1;
      return {
        ...state,
        comments: state.comments.concat(newComment)
      };

    default:
      return state;
  }
};