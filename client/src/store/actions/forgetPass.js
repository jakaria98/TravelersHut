import * as Types from "./types";
import Axios from "axios";

export const resetRequest = (email) => (dispatch) => {
  Axios.post("/api/forgetPassword/resetRequest", email)
    .then((response) => {
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

export const otpSubmit = (otp) => (dispatch) => {
  Axios.post("/api/forgetPassword/otpSubmission", otp)
    .then((response) => {
      console.log(response);
      dispatch({
        type: Types.OTP_SUBMIT,
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
