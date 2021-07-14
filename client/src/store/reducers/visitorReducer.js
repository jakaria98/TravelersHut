import * as Types from "../actions/types";

const init = {
  isAuthenticated: false,
  visitor: {},
  error: {},
};

const visitorReducer = (state = init, action) => {
  switch (action.type) {
    case Types.SET_VISITOR: {
      return {
        visitor: action.payload.visitor,
        isAuthenticated: Object.keys(action.payload.visitor).length !== 0,
        error: {},
      };
    }
    
    case Types.VISITOR_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default visitorReducer;
