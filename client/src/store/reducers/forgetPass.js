import * as Types from "../actions/types";
const init = {
  error: {},
};
const forgetPassReducer = (state = init, action) => {
  
  switch (action.type) {
    case Types.RESET_REQUEST: {
      return action.payload.pass;
    }
    case Types.PASS_ERROR: {
      return { error: action.payload.error };
    }
    default:
      return state;
  }
};
export default forgetPassReducer;
