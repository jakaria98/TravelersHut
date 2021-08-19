import React, { Component } from "react";
import { BiUserPin } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdAddAPhoto } from "react-icons/md";
import { updateProfile } from "../../store/actions/adminAction";
import { connect } from "react-redux";

class UserEdit extends Component {
  state = {
    name: "",
    email: "",
    profilePhoto: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    this.props.updateProfile(this.state);
  };

  render() {
    let { name, email, newPassword, confirmPassword, oldPassword, error } =
      this.state;

    console.log(error);
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
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={this.changeHandler}
                  />
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
            <div className="form-group">
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
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="oldPassword">Old Password:</label>
                  <input
                    type="password"
                    placeholder="Enter Your Previous Password"
                    value={oldPassword}
                    name="oldPassword"
                    className="form-control"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="newPassword"
                    placeholder="Enter Your New Password"
                    value={newPassword}
                    name="newPassword"
                    className="form-control"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <RiLockPasswordFill size={70} className="pt-4" />
                <div className="container mx-1">
                  <label htmlFor="confirmPassword">Confirm New Password:</label>
                  <input
                    type="confirmPassword"
                    placeholder="Enter Your New Password"
                    value={confirmPassword}
                    name="confirmPassword"
                    className="form-control"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-success container mt-3 mb-5 w-75 d-block">
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
export default connect(mapStateToProps, { updateProfile })(UserEdit);
