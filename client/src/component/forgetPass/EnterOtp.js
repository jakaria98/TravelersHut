import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { RiLockPasswordLine } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";

import { otpSubmit } from "../../store/actions/forgetPass";
class EnterOtp extends Component {
  state = {
    given_otp: "",
    stored_otp: "",
    error: {},
    submit: false,
  };
  componentDidMount() {
    this.setState({ stored_otp: this.props.forgetPass.otp });
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.otpSubmit(this.state);
    this.setState({
      submit: true,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.forgetPass.error) {
      console.log(nextProps.forgetPass);
      if (
        JSON.stringify(nextProps.forgetPass.error) !==
        JSON.stringify(prevState.error)
      ) {
        return {
          error: nextProps.forgetPass.error.message,
        };
      }
    }
    return null;
  }
  render() {
    let { given_otp, submit, error } = this.state;
    console.log(this.state);
    if (submit && this.props.forgetPass.success) {
      this.props.close();
    }
    return (
      <div
        style={{
          width: "50%",
          height: "280px",
          background: "#cfecec",
          margin: "15% auto",
        }}
      >
        <div className="col-md-6 offset-md-3 pt-3 ">
          <div className="div text-center">
            <h2 style={{ margin: "5px" }}>Enter OTP</h2>
            <div />
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordLine size={70} className="pt-4" />
                <div className="mx-1">
                  <label htmlFor="given_otp">OTP:</label>
                  <input
                    type="number"
                    placeholder="Enter The OTP"
                    name="given_otp"
                    className={
                      error?.code
                        ? "form-control is-invalid bg-white"
                        : "form-control bg-white"
                    }
                    id="given_otp"
                    value={given_otp}
                    onChange={this.changeHandler}
                  />
                  {error?.code && (
                    <div className="invalid-feedback">{error?.code}</div>
                  )}
                </div>
              </div>
            </div>
            <button className="btn btn-primary container d-block ">
              Match
              <GiCheckMark className="pb-1" size={22} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forgetPass: state.forgetPass,
  };
};
export default connect(mapStateToProps, { otpSubmit })(withRouter(EnterOtp));
