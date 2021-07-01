import * as Types from "../actions/types";

const init = {
  isAuthenticated: false,
  admin: {},
  error: {},
};

const adminReducer = (state = init, action) => {
  switch (action.type) {
    case Types.SET_ADMIN: {
      return {
        admin: action.payload.admin,
        isAuthenticated: Object.keys(action.payload.admin).length !== 0,
        error: {},
      };
    }
    case Types.ADMIN_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
