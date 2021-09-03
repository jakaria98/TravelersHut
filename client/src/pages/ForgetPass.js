import React, { Component } from "react";
import EnterEmail from "../component/forgetPass/EnterEmail";

class ForgetPass extends Component {
  state = {
    email: true,
    otp: false,
  };
  render() {
    let { email, otp } = this.state;

    return (
      <div style={{ marginTop: "120px" }}>{email ? <EnterEmail /> : ""}</div>
    );
  }
}
export default ForgetPass;
