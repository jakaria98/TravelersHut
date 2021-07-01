import * as Types from "../actions/types";

const init = {
  isAuthenticated: false,
  guide: {},
  error: {},
};

const guideReducer = (state = init, action) => {
  switch (action.type) {
    case Types.SET_GUIDE: {
      return {
        guide: action.payload.guide,
        isAuthenticated: Object.keys(action.payload.guide).length !== 0,
        error: {},
      };
    }
    case Types.GUIDE_ERROR: {
      console.log(action.payload.error);
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default guideReducer;
