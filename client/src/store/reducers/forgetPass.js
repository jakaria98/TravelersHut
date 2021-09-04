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
    case Types.OTP_SUBMIT: {
      return action.payload.pass;
    }
    default:
      return state;
  }
};
export default forgetPassReducer;
