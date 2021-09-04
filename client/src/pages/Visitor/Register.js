import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/visitorAction";
import { BiUserPin } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: {},
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.visitor.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.visitor.error,
      };
    }
    return null;
  }
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    let { name, email, password, confirmPassword } = this.state;

    this.props.register(
      { name, email, password, confirmPassword },
      this.props.history
    );
  };

  render() {
    let { name, email, password, confirmPassword, error } = this.state;
    error = error?.message;
    return (
      <div style={{ margin: "10% auto" }}>
        <div className="col-md-6 offset-md-3">
          <div className="div text-center">
            <h1 className="text-center display-4" style={{ margin: "5px" }}>
              Tourist Register
            </h1>
            <div />
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <div className="d-flex">
                <BiUserPin size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    className={
                      error?.name ? "form-control is-invalid" : "form-control"
                    }
                    id="name"
                    value={name}
                    onChange={this.changeHandler}
                  />
                  {error?.name && (
                    <div className="invalid-feedback">{error?.name}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <MdEmail size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    className={
                      error?.R_email
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="email"
                    value={email}
                    onChange={this.changeHandler}
                  />
                  {error?.R_email && (
                    <div className="invalid-feedback">{error?.R_email}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    className={
                      error?.R_password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="password"
                    value={password}
                    onChange={this.changeHandler}
                  />
                  {error?.password && (
                    <div className="invalid-feedback">{error?.R_password}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="confirmPassword">Confirm Password: </label>
                  <input
                    type="password"
                    placeholder="Confirm Your Password"
                    name="confirmPassword"
                    className={
                      error?.confirmPassword
                        ? "form-control is-invalid"
                        : "form-control"
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
            <div className="form-group mt-2">
              <input
                className={
                  error?.userExists
                    ? "form-control is-invalid d-none"
                    : "form-control d-none"
                }
              />
              {error?.userExists && (
                <div className="invalid-feedback text-center">
                  <h6>{error?.userExists}</h6>
                </div>
              )}
            </div>
            <button className="btn btn-success my-3 d-block container w-75">
              Register <GiCheckMark size={22} className="pb-1" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  visitor: state.visitor,
});
export default connect(mapStateToProps, { register })(Register);
