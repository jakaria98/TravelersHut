import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/actions/adminAction";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: {},
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.admin.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.admin.error.message,
      };
    }
    return null;
  }
  submitHandler = (event) => {
    event.preventDefault();
    let { email, password } = this.state;

    this.props.login({ email, password }, this.props.history);
  };

  render() {
    let { email, password, error } = this.state;

    return (
      <div style={{ margin: "130px auto" }}>
        <div className="col-md-6 offset-md-3">
          <div className="div text-center">
            <h1 className="text-center display-4" style={{ margin: "5px" }}>
              Admin Login
            </h1>
            <div />
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <div className="d-flex">
                <MdEmail size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    className={
                      error?.email ? "form-control is-invalid" : "form-control"
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
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    className={
                      error?.password
                        ? "form-control is-invalid"
                        : "form-control"
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
            <div className="form-group mt-2">
              <input
                className={
                  error?.invalidAccess
                    ? "form-control is-invalid d-none"
                    : "form-control d-none"
                }
              />
              {error?.invalidAccess && (
                <div className="invalid-feedback text-center">
                  <h6>{error?.invalidAccess}</h6>
                </div>
              )}
            </div>
            <button className="btn btn-success my-2 container w-75 d-block">
              Login <GiCheckMark size={22} className="pb-1" />
            </button>
          </form>
          <div className="container d-block my-1 text-center">
            <Link
              to={{
                pathname: "/forget-password",
                state: { userType: "admin" },
              }}
            >
              Forgotten Password
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  admin: state.admin,
});
export default connect(mapStateToProps, { login })(withRouter(Login));
