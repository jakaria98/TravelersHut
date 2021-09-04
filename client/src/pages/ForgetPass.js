import React, { Component } from "react";
import EnterEmail from "../component/forgetPass/EnterEmail";
import EnterOtp from "../component/forgetPass/EnterOtp";
import ResetPass from "../component/forgetPass/ResetPass";

class ForgetPass extends Component {
  state = {
    email: true,
    otp: false,
    password: false,
  };
  emailClose = () => {
    this.setState({ email: false, otp: true });
  };
  otpClose = () => {
    this.setState({ otp: false, password: true });
  };
  passClose = () => {
    this.setState({ password: false, email: true });
  };
  render() {
    let { email, otp, password } = this.state;

    return (
      <div style={{ marginTop: "120px" }}>
        {email ? <EnterEmail close={this.emailClose} /> : ""}
        {otp ? <EnterOtp close={this.otpClose} /> : ""}
        {password ? <ResetPass close={this.passClose} /> : ""}
      </div>
    );
  }
}
export default ForgetPass;
