import Axios from "axios";
import * as Types from "./types";

export const loadPost = (placeID) => (dispatch) => {
  Axios.get("/api/posts/", placeID)
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

export const addPost = (post, placeId) => (dispatch) => {
  Axios.post(`/api/posts/${placeID}`, post)
    .then((response) => {
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
          id: response.data._id,
        },
      });
    })
    .catch((error) => console.log(error));
};
