import React, { Component } from "react";
import { BiUserPin } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdAddAPhoto } from "react-icons/md";
import { updateProfile } from "../../store/actions/adminAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class UserEdit extends Component {
  state = {
    name: "",
    email: "",
    profilePhoto: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    error: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.admin.isAuthenticated) {
      if (
        JSON.stringify(nextProps.admin.error) !==
        JSON.stringify(prevState.error)
      ) {
        return {
          error: nextProps.admin.error.message,
        };
      }
    } else {
      if (
        JSON.stringify(nextProps.guide.error) !==
        JSON.stringify(prevState.error)
      ) {
        return {
          error: nextProps.guide.error.message,
        };
      }
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email,
    });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  submitHandler = (e) => {
    e.preventDefault();

    if (this.props.admin.isAuthenticated)
      this.props.updateProfile(this.state, this.props.history);
    else console.log("guide");
  };

  render() {
    let {
      name,
      email,
      newPassword,
      confirmNewPassword,
      currentPassword,
      error,
    } = this.state;
    return (
      <div className="my-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-4">EDIT PROFILE</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <div className="d-flex">
                <BiUserPin size={70} className="pt-4" />
                <div className="mx-1 container">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className={
                      error?.validName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="name"
                    value={name}
                    onChange={this.changeHandler}
                  />
                  {error?.validName && (
                    <div className="invalid-feedback">{error?.validName}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <MdEmail size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    name="email"
                    className={
                      error?.validEmail
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={this.changeHandler}
                  />
                  {error?.validEmail && (
                    <div className="invalid-feedback">{error?.validEmail}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group ">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type="password"
                    placeholder="Enter Your Current Password"
                    value={currentPassword}
                    name="currentPassword"
                    className={
                      error?.currentPassword
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={this.changeHandler}
                  />
                  {error?.currentPassword && (
                    <div className="invalid-feedback">
                      {error?.currentPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="my-4 container d-block text-center bg-light ">
              <hr />
              FIll The Field Below If You Want To Change Your Profile Photo
              <hr />
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <MdAddAPhoto size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="profilePhoto">Profile Photo:</label>
                  <input
                    type="file"
                    name="profilePhoto"
                    className="form-control"
                    onChange={this.getPhoto}
                  />
                </div>
              </div>
            </div>
            <div className="my-4 container d-block text-center bg-light ">
              <hr />
              FIll All The Fields Below If You Want To Change Your Password
              <hr />
            </div>
            <div className="form-group">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    placeholder="Enter Your New Password"
                    value={newPassword}
                    name="newPassword"
                    className={
                      error?.newPassword
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={this.changeHandler}
                  />
                  {error?.newPassword && (
                    <div className="invalid-feedback">{error?.newPassword}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Your New Password"
                    value={confirmNewPassword}
                    name="confirmNewPassword"
                    className={
                      error?.confirmNewPassword
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={this.changeHandler}
                  />
                  {error?.confirmNewPassword && (
                    <div className="invalid-feedback">
                      {error?.confirmNewPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
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
            </div>
            <button className="btn btn-success container mb-5 w-75 d-block">
              Submit <GiCheckMark size={22} className="pb-1" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guide: state.guide,
    admin: state.admin,
  };
};
export default connect(mapStateToProps, { updateProfile })(
  withRouter(UserEdit)
);
