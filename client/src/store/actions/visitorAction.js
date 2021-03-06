import * as Types from "./types";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import setToken from "../../utils/setToken";

export const register = (visitor, history) => (dispatch) => {
  Axios.post("/api/visitors/register", visitor)
    .then((res) => {
      dispatch({
        type: Types.VISITOR_ERROR,
        payload: {
          error: {},
        },
      });
      console.log(res);
      history.push("/login");
    })
    .catch((error) => {
      dispatch({
        type: Types.VISITOR_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const login = (visitor, history) => (dispatch) => {
  Axios.post("/api/visitors/login", visitor)
    .then((res) => {
      let token = res.data.token;
      localStorage.setItem("visitor_token", token);
      let decode = jwtDecode(token);
      setToken(token);
      let time = decode.exp - decode.iat;
      logoutTimer(dispatch, time * 1000, history);
      dispatch({
        type: Types.SET_VISITOR,
        payload: {
          visitor: decode,
        },
      });
      history.push("/all-places");
    })
    .catch((error) => {
      dispatch({
        type: Types.VISITOR_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const visitorLogout = (history) => (dispatch) => {
  localStorage.removeItem("visitor_token");
  dispatch({
    type: Types.SET_VISITOR,
    payload: {
      visitor: {},
    },
  });
  history.push("/");
};

export const logoutTimer = (dispatch, timer, history) => {
  setTimeout(() => {
    dispatch(visitorLogout(history));
  }, timer);
};
