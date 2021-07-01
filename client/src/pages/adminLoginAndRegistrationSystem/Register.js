import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/adminAction";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    mobileNumber: "",
    profilePhoto: "",
    nid: [],
    password: "",
    confirmPassword: "",

    error: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.admin.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.admin.error,
      };
    }
    return null;
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getPhoto = (event) => {
    //console.log(files);
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(URL.createObjectURL(event.target.files[i]));
    }
    this.setState({
      [event.target.name]: selectedFiles,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    let {
      name,
      email,
      mobileNumber,
      profilePhoto,
      nid,
      password,
      confirmPassword,
    } = this.state;

    this.props.register(
      {
        name,
        email,
        mobileNumber,
        profilePhoto,
        nid,
        password,
        confirmPassword,
      },
      this.props.history
    );
  };

  render() {
    let { name, email, mobileNumber, password, confirmPassword, error } =
      this.state;
    error = error?.message;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-4">Apply For Adminship Here</h1>
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
            <div className="form-group my-3">
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
              <label htmlFor="mobileNumber">Mobile Number: </label>
              <input
                type="text"
                placeholder="Enter Your 11 Digit Mobile Number"
                name="mobileNumber"
                className={
                  error?.mobileNumber
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="mobileNumber"
                value={mobileNumber}
                onChange={this.changeHandler}
              />
              {error?.mobileNumber && (
                <div className="invalid-feedback">{error?.mobileNumber}</div>
              )}
            </div>
            <div className="form-group my-3">
              <label htmlFor="profile photo">Profile Photo: </label>

              <input
                type="file"
                name="profilePhoto"
                className={
                  error?.profilePhoto
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.getPhoto}
              />
              {error?.profilePhoto && (
                <div className="invalid-feedback">{error?.profilePhoto}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="nid">NID: </label>
              <input
                type="file"
                name="nid"
                className={
                  error?.nid ? "form-control is-invalid" : "form-control"
                }
                multiple
                onChange={this.getPhoto}
              />
              {error?.nid && (
                <div className="invalid-feedback">{error?.nid}</div>
              )}
            </div>
            <div className="form-group my-3">
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
            <div className="form-group">
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

            <Link to="/admin/login" className="my-1">
              Already Have An Account? Login Here.
            </Link>

            <button className="apply btn btn-primary my-3 d-block center">
              Apply
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  admin: state.admin,
});
export default connect(mapStateToProps, { register })(Register);
