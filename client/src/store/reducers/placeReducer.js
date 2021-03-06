import * as Types from "../actions/types";
const init = {
  place: {},
  error: {},
};
const placeReducer = (state = init, action) => {
  switch (action.type) {
    case Types.LOAD_PLACE: {
      return action.payload.places;
    }
    case Types.MY_CONTRIBUTION: {
      return action.payload.places;
    }
    case Types.ADD_PLACE: {
      return action.payload.place;
    }
    case Types.REMOVE_PLACE: {
      return action.payload.place;
    }
    case Types.UPDATE_PLACE: {
      return action.payload.place;
    }
    case Types.REPORT_PLACE: {
      return action.payload.report;
    }
    case Types.PLACE_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case Types.GET_A_PLACE: {
      return action.payload.place;
    }
    case Types.RATINGS: {
      return action.payload.place;
    }
    default:
      return state;
  }
};
export default placeReducer;
