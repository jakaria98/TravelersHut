import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { resetRequest } from "../../store/actions/forgetPass";

import { MdEmail, MdSearch } from "react-icons/md";

class EnterEmail extends Component {
  state = {
    email: "",
    error: {},
    invalidAction: "",
    userType: "",
    submit: false,
  };
  componentDidMount() {
    if (this.props.location.state) {
      const { userType } = this.props.location.state;
      this.setState({
        userType,
      });
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let { email, userType } = this.state;
    if (!this.state.userType) {
      this.setState({
        invalidAction: "Invalid Action",
      });
    } else {
      this.props.resetRequest({ email, userType });
      this.setState({
        submit: true,
      });
    }
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
    let { email, error, invalidAction, submit } = this.state;
    if (submit && this.props.forgetPass.email) {
      this.props.close();
    }
    return (
      <div
        style={{
          width: "50%",
          height: `auto`,
          background: "#cfecec",
          margin: "15% auto",
        }}
      >
        <div className="col-md-6 offset-md-3 py-3 ">
          <div className="div text-center">
            <h2 style={{ margin: "5px" }}>Find Your ID</h2>
            <div />
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group my-2">
              <div className="d-flex">
                <MdEmail size={70} className="pt-4" />
                <div className="mx-1">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    placeholder="Search By Email"
                    name="email"
                    className={
                      error?.email
                        ? "form-control is-invalid bg-white"
                        : "form-control bg-white"
                    }
                    id="email"
                    value={email}
                    onChange={this.changeHandler}
                  />
                  {error?.email && (
                    <div className="invalid-feedback">{error?.email}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                className={
                  invalidAction
                    ? "form-control is-invalid d-none"
                    : "form-control d-none"
                }
              />
              {invalidAction && (
                <div className="invalid-feedback text-center my-2">
                  <h6>{invalidAction}</h6>
                </div>
              )}
            </div>
            <button className="btn btn-primary container d-block mb-3 ">
              search
              <MdSearch className="pb-1" size={25} />
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
export default connect(mapStateToProps, { resetRequest })(
  withRouter(EnterEmail)
);
