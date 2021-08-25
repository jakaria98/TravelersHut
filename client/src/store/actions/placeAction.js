import Axios from "axios";
import * as Types from "./types";

export const loadPlaces = () => (dispatch) => {
  Axios.get("/api/places/")
    .then((response) => {
      dispatch({
        type: Types.LOAD_PLACE,
        payload: {
          places: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const addPlace = (place) => (dispatch) => {
  Axios.post("/api/places/add_place", place)
    .then((response) => {
      dispatch({
        type: Types.ADD_PLACE,
        payload: {
          place: response.data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.PLACE_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};
export const getSinglePlace = (_id) => (dispatch) => {
  Axios.get(`/api/places/${_id}`)
    .then((response) => {
      console.log(_id);
      dispatch({
        type: Types.GET_A_PLACE,
        payload: {
          place: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removePlace = (id, history) => (dispatch) => {
  Axios.delete(`/api/places/delete/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_PLACE,
        payload: {
          place: response.data,
        },
      });
      history.push("/all-places");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updatePlace = (id, place) => (dispatch) => {
  Axios.put(`/api/places/update/${id}`, place)
    .then((response) => {
      dispatch({
        type: Types.UPDATE_PLACE,
        payload: {
          place: response.data.place,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.PLACE_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const ratePlace = (id, rating) => (dispatch) => {
  Axios.put(`/api/places/${id}`, rating)
    .then((response) => {
      dispatch({
        type: Types.RATINGS,
        payload: {
          place: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const reportPlace = (id, reportProblem) => (dispatch) => {
  Axios.post(`/api/places/${id}`, reportProblem)
    .then((response) => {
      dispatch({
        type: Types.REPORT_PLACE,
        payload: {
          report: response.data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.PLACE_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};
