import * as Types from "../actions/types";

const reportedPostReducer = (state = [], action) => {
  switch (action.type) {
    case Types.ALL_REPORTED_POST: {
      return action.payload.reports;
    }
    case Types.DELETE_POST_REPORT: {
      console.log(action.payload.report);
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
