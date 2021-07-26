import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../store/actions/visitorAction";
import { connect } from "react-redux";
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
      JSON.stringify(nextProps.visitor.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.visitor.error,
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
    console.log(error);
    error = error?.message;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-4">Login Here</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
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
            <div className="form-group my-2">
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
            <Link to="/register" className="my-1">
              Don't Have Account? Register Here.
            </Link>
            <button className="btn btn-primary my-2 d-block">Login</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  visitor: state.visitor,
});
export default connect(mapStateToProps, { login })(Login);
