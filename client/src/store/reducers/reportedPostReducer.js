import * as Types from "../actions/types";

const reportedPostReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.ALL_REPORTED_POST: {
      return action.payload.reports;
    }
    case Types.REMOVE_REPORT: {
      return action.payload.report;
    }
    case Types.SINGLE_REPORTED_POST: {
      return action.payload.report;
    }
    default:
      return state;
  }
};
export default reportedPostReducer;
