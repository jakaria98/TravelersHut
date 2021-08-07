import * as Types from "../actions/types";

const reportedPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.LOAD_REPORTED_PLACE: {
      return action.payload.reports;
    }
    case Types.DELETE_REPORT: {
      return action.payload.report;
    }
    case Types.GET_A_REPORT: {
      return action.payload.report;
    }
    default:
      return state;
  }
};
export default reportedPlaceReducer;
