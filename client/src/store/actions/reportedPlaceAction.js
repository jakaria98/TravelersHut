import Axios from "axios";
import * as Types from "./types";

export const loadReports = () => (dispatch) => {
  Axios.get("/api/reportedPlaces/")
    .then((response) => {
      dispatch({
        type: Types.LOAD_REPORTED_PLACE,
        payload: {
          reports: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};
export const getSingleReport = (id) => (dispatch) => {
  Axios.get(`/api/reportedPlaces/${id}`)
    .then((response) => {
      dispatch({
        type: Types.GET_A_REPORT,
        payload: {
          report: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};

export const removeReport = (id, history) => (dispatch) => {
  Axios.delete(`/api/reportedPlaces/${id}`)
    .then((response) => {
      dispatch({
        type: Types.DELETE_REPORT,
        payload: {
          report: response.data,
        },
      });
      history.push("/all-places/reported-places");
    })
    .catch((error) => console.log(error));
};

export const removePlace = (id) => (dispatch) => {
  Axios.delete(`/api/places/delete/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_PLACE,
        payload: {
          place: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
