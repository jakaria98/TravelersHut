import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/visitorAction";
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
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-4">Register Here</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
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
            <div className="form-group my-2">
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
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                className={
                  error?.password ? "form-control is-invalid" : "form-control"
                }
                id="password"
                value={password}
                onChange={this.changeHandler}
              />
              {error?.password && (
                <div className="invalid-feedback">{error?.password}</div>
              )}
            </div>
            <div className="form-group my-2">
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
                <div className="invalid-feedback">{error?.confirmPassword}</div>
              )}
            </div>
            <Link to="/login" className="my-1">
              Already Have An Account? Login Here.
            </Link>
            <button className="btn btn-primary my-2 d-block">Register</button>
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
