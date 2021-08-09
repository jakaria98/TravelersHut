import * as Types from "../actions/types";
const init = {
  post: {},
  error: {},
};
const postReducer = (state = init, action) => {
  switch (action.type) {
    case Types.LOAD_POST: {
      return action.payload.posts;
    }
    case Types.ADD_POST: {
      let post = [...state];
      post.unshift(action.payload.post);
      return { post, error: {} };
    }
    case Types.REMOVE_POST: {
      return action.payload.post;
    }
    case Types.REMOVE_REPORT: {
      return action.payload.post;
    }
    case Types.GET_A_POST: {
      return action.payload.post;
    }
    case Types.REPORT_POST: {
      return action.payload.post;
    }
    case Types.POST_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
export default postReducer;
