import Axios from "axios";
import * as Types from "./types";

export const deleteReport = (id, history) => (dispatch) => {
  Axios.delete(`/api/reportedPost/report/${id}`)
    .then((response) => {
      dispatch({
        type: Types.DELETE_POST_REPORT,
        payload: {
          report: response.data,
        },
      });
      history.push("/all-places/reported-posts");
    })
    .catch((error) => console.log(error));
};
export const getAllReportedPost = () => (dispatch) => {
  Axios.get("/api/reportedPost/report")
    .then((response) => {
      dispatch({
        type: Types.ALL_REPORTED_POST,
        payload: {
          reports: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};
export const getSingleReportedPost = (id) => (dispatch) => {
  Axios.get(`/api/reportedPost/report/${id}`)
    .then((response) => {
      dispatch({
        type: Types.SINGLE_REPORTED_POST,
        payload: {
          report: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};

export const removePost = (id) => (dispatch) => {
  Axios.delete(`/api/posts/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_POST,
        payload: {
          post: response.data.post,
        },
      });
    })
    .catch((error) => console.log(error));
};
