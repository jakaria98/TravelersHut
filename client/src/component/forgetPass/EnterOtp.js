import React, { Component } from "react";
import { connect } from "react-redux";
import { RiLockPasswordLine } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
class EnterOtp extends Component {
  state = {
    otp: "",
    error: {},
    submit: false,
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();

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
    let { otp, submit, error } = this.state;
    console.log(this.props);
    return (
      <div
        className="container"
        style={{
          width: "50%",
          height: "280px",
          background: "#cfecec",
          marginTop: "15%",
        }}
      >
        <div className="col-md-6 offset-md-3 pt-3 ">
          <div className="div text-center">
            <h2 style={{ margin: "5px" }}>Enter OTP</h2>
            <div />
          </div>
          <form>
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordLine size={70} className="pt-4" />
                <div className="mx-1">
                  <label htmlFor="otp">OTP:</label>
                  <input
                    type="number"
                    placeholder="Enter The OTP"
                    name="otp"
                    className={
                      error?.otp
                        ? "form-control is-invalid bg-white"
                        : "form-control bg-white"
                    }
                    id="otp"
                    value={otp}
                    onChange={this.changeHandler}
                  />
                  {error?.otp && (
                    <div className="invalid-feedback">{error?.otp}</div>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary container d-block "
            >
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
export default connect(mapStateToProps)(EnterOtp);
