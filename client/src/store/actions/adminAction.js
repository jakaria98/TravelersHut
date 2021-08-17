import * as Types from "./types";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import setToken from "../../utils/setToken";

export const register = (admin, history) => (dispatch) => {
  Axios.post("/api/admin/register", admin)
    .then((res) => {
      dispatch({
        type: Types.ADMIN_ERROR,
        payload: {
          error: {},
        },
      });
      history.push("/admin/action/allGuide");
    })
    .catch((error) => {
      dispatch({
        type: Types.ADMIN_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const login = (admin, history) => (dispatch) => {
  Axios.post("/api/admin/login", admin)
    .then((res) => {
      let token = res.data.token;
      localStorage.setItem("admin_token", token);
      let decode = jwtDecode(token);
      let time = decode.exp - decode.iat;
      logoutTimer(dispatch, time * 1000, history);
      setToken(token);
      dispatch({
        type: Types.SET_ADMIN,
        payload: {
          admin: decode,
        },
      });
      history.push("/all-places");
    })
    .catch((error) => {
      dispatch({
        type: Types.ADMIN_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const adminLogout = (history) => (dispatch) => {
  localStorage.removeItem("admin_token");
  dispatch({
    type: Types.SET_ADMIN,
    payload: {
      admin: {},
    },
  });
  history.push("/");
};

export const logoutTimer = (dispatch, timer, history) => {
  setTimeout(() => {
    dispatch(adminLogout(history));
  }, timer);
};
