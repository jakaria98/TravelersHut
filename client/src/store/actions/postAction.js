import Axios from "axios";
import * as Types from "./types";

export const loadPost = (placeID) => (dispatch) => {
  Axios.get(`/api/posts/post/${placeID}`)
    .then((response) => {
      dispatch({
        type: Types.LOAD_POST,
        payload: {
          posts: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};

export const addPost = (post, placeID) => (dispatch) => {
  Axios.post(`/api/posts/${placeID}`, post)
    .then((response) => {
      console.log("called action");
      dispatch({
        type: Types.ADD_POST,
        payload: {
          post: response.data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.POST_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const getSinglePost = (id) => (dispatch) => {
  Axios.get(`/api/posts/${id}`)
    .then((response) => {
      dispatch({
        type: Types.GET_A_POST,
        payload: {
          post: response.data,
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

export const reportPost = (id, reportProblem) => (dispatch) => {
  Axios.post(`/api/posts/report/${id}`, reportProblem)
    .then((response) => {
      dispatch({
        type: Types.REPORT_POST,
        payload: {
          post: response.data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.POST_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

