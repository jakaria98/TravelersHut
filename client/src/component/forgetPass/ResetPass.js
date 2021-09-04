import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { resetPass } from "../../store/actions/forgetPass";

import { RiLockPasswordFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";

class ResetPass extends Component {
  state = {
    password: "",
    confirmPassword: "",
    email: "",
    userType: "",
    error: {},
    submit: false,
  };
  componentDidMount() {
    this.setState({
      email: this.props.forgetPass.email,
      userType: this.props.forgetPass.userType,
    });
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.resetPass(this.state, this.props.history);
    this.setState({
      submit: true,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.forgetPass.error) {
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
    let { password, confirmPassword, error, submit } = this.state;
    console.log(this.props.forgetPass.done);
    if (submit && this.props.forgetPass.done) {
      this.props.close();
    }
    return (
      <div
        style={{
          width: "50%",
          height: "auto",
          background: "#cfecec",
          margin: "15% auto",
        }}
      >
        <div className="col-md-6 offset-md-3 py-3 ">
          <div className="div text-center">
            <h2 style={{ margin: "5px" }}>Reset Password</h2>
            <div />
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="mx-1">
                  <label htmlFor="password">New Password:</label>
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    name="password"
                    className={
                      error?.password
                        ? "form-control is-invalid bg-white"
                        : "form-control bg-white"
                    }
                    id="password"
                    value={password}
                    onChange={this.changeHandler}
                  />
                  {error?.password && (
                    <div className="invalid-feedback">{error?.password}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="mx-1">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className={
                      error?.confirmPassword
                        ? "form-control is-invalid bg-white"
                        : "form-control bg-white"
                    }
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={this.changeHandler}
                  />
                  {error?.confirmPassword && (
                    <div className="invalid-feedback">
                      {error?.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="btn btn-success container d-block ">
              submit
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
export default connect(mapStateToProps, { resetPass })(withRouter(ResetPass));
