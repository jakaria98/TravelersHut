import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./component/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import * as Types from "./store/actions/types";
import jwtDecode from "jwt-decode";
import setToken from "./utils/setToken";

const visitorToken = localStorage.getItem("visitor_token");
if (visitorToken) {
  let decode = jwtDecode(visitorToken);
  setToken(visitorToken);
  store.dispatch({
    type: Types.SET_VISITOR,
    payload: {
      visitor: decode,
    },
  });
}

const guideToken = localStorage.getItem("guide_token");
if (guideToken) {
  let decode = jwtDecode(guideToken);
  setToken(guideToken);
  store.dispatch({
    type: Types.SET_GUIDE,
    payload: {
      guide: decode,
    },
  });
}

const adminToken = localStorage.getItem("admin_token");
if (adminToken) {
  let decode = jwtDecode(adminToken);
  setToken(adminToken);
  store.dispatch({
    type: Types.SET_ADMIN,
    payload: {
      admin: decode,
    },
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
