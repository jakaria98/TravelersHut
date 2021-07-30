import * as Types from "./types";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import setToken from "../../utils/setToken";
export const registerRequest = (guide) => (dispatch) => {
  Axios.post("/api/guide/registerRequest", guide)
    .then((res) => {
      dispatch({
        type: Types.GUIDE_ERROR,
        payload: {
          error: {},
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.GUIDE_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};
export const register = (guide, history) => (dispatch) => {
  Axios.post("/api/guide/register", guide)
    .then((res) => {
      dispatch({
        type: Types.GUIDE_ERROR,
        payload: {
          error: {},
        },
      });
      history.push("/guide/login");
    })
    .catch((error) => {
      dispatch({
        type: Types.GUIDE_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const login = (guide, history) => (dispatch) => {
  Axios.post("/api/guide/login", guide)
    .then((res) => {
      let token = res.data.token;
      localStorage.setItem("guide_token", token);
      let decode = jwtDecode(token);
      setToken(token);
      dispatch({
        type: Types.SET_GUIDE,
        payload: {
          guide: decode,
        },
      });
      history.push("/all-places");
    })
    .catch((error) => {
      dispatch({
        type: Types.GUIDE_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const guideLogout = (history) => (dispatch) => {
  localStorage.removeItem("guide_token");
  history.push("/");
  dispatch({
    type: Types.SET_GUIDE,
    payload: {
      guide: {},
    },
  });
};
export const loadGuide = () => (dispatch) => {
  Axios.get("/api/guide/allGuide")
    .then((response) => {
      dispatch({
        type: Types.GET_GUIDE,
        payload: {
          guide: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getAGuide = (id) => (dispatch) => {
  Axios.get(`/api/guide/${id}`)
    .then((response) => {
      dispatch({
        type: Types.SINGLE_GUIDE,
        payload: {
          guide: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};
