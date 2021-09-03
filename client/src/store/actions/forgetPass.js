import * as Types from "./types";
import Axios from "axios";

export const resetRequest = (email) => (dispatch) => {
  Axios.post("/api/forgetPassword/resetRequest", email)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: Types.RESET_REQUEST,
        payload: {
          pass: response.data,
        },
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: Types.PASS_ERROR,
          payload: {
            error: error.response.data,
          },
        });
      }
    });
};
