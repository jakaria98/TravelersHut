import Axios from "axios";

const setToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = token;
  } else {
    Axios.defaults.headers.common["Authorization"] = "";
  }
};
export default setToken;
