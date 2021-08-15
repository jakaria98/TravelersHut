import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import guideReducer from "./guideReducer";
import placeReducer from "./placeReducer";
import postReducer from "./postReducer";
import visitorReducer from "./visitorReducer";
import reportedPlaceReducer from "./reportedPlaceReducer";
import reportedPostReducer from "./reportedPostReducer";

const rootReducer = combineReducers({
  visitor: visitorReducer,
  guide: guideReducer,
  admin: adminReducer,
  place: placeReducer,
  post: postReducer,
  reportedPlace: reportedPlaceReducer,
  reportedPost: reportedPostReducer,
});

export default rootReducer;
