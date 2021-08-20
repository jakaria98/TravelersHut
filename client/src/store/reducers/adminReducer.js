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
    case Types.ALL_ADMIN: {
      return {
        admin: action.payload.admins,
        isAuthenticated: Object.keys(action.payload.admins).length !== 0,
      };
    }
    case Types.SINGLE_ADMIN: {
      return {
        admin: action.payload.admin,
        isAuthenticated: Object.keys(action.payload.admin).length !== 0,
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
