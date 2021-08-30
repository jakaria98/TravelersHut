import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register, registerRequest } from "../../store/actions/guideAction";
import Modal from "react-modal";
import { BiUserPin } from "react-icons/bi";
import { MdAddAPhoto, MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { GrContact } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
};

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    mobileNumber: "",
    profilePhoto: "",
    // nid: [],
    password: "",
    confirmPassword: "",
    createModalOpen: true,
    code: "",
    error: {},
    codeRequested: false,
    codeGet: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.guide.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.guide.error,
      };
    }
    return null;
  }

  closeCreateModal = () => {
    this.setState({
      createModalOpen: false,
    });
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getPhoto = (event) => {
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(event.target.files[i]);
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

      password,
      confirmPassword,
    } = this.state;
    const formData = new FormData();
    const singlePhoto = Object.values(profilePhoto);
    singlePhoto.map((f) => {
      formData.append("profilePhoto", f);
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    this.props.registerRequest(formData);
    this.setState({
      codeRequested: true,
    });
  };

  codeSubmit = (e) => {
    e.preventDefault();
    let { name, email, mobileNumber, profilePhoto, password, code } =
      this.state;
    const formData = new FormData();
    const singlePhoto = Object.values(profilePhoto);
    singlePhoto.map((f) => {
      formData.append("profilePhoto", f);
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("password", password);
    formData.append("code", code);
    this.props.register(formData, this.props.history);
    this.setState({
      codeGet: true,
    });
  };

  render() {
    let { name, email, mobileNumber, password, confirmPassword, code, error } =
      this.state;
    error = error?.message;
    console.log(this.props);
    return (
      <div style={{ marginTop: "100px" }}>
        <div className="col-md-6 offset-md-3">
          <div className="div text-center">
            <h1 className="text-center display-4" style={{ margin: "5px" }}>
              Guide Register
            </h1>
            <div />
          </div>
          <div className="container">
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
                        error?.email
                          ? "form-control is-invalid"
                          : "form-control"
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
                <div className="d-flex">
                  <FiPhoneCall size={70} className="pt-4" />
                  <div className="container mx-1">
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
                      <div className="invalid-feedback">
                        {error?.mobileNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="d-flex">
                  <BiUserPin size={70} className="pt-4" />
                  <div className="container mx-1">
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
                      <div className="invalid-feedback">
                        {error?.profilePhoto}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="form-group">
                <div className="d-flex">
                  <MdAddAPhoto size={70} className="pt-4" />
                  <div className="container mx-1">
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
                </div>
              </div> */}
              <div className="form-group ">
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
              <div className="form-group">
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
              <button className="container btn btn-success my-3 d-block center w-75">
                Apply <GiCheckMark size={22} className="pb-1" />
              </button>
            </form>
          </div>
          {this.state.codeRequested ? (
            this.state.codeGet ? (
              <div className="container">
                <Modal
                  isOpen={this.state.createModalOpen}
                  onRequestClose={this.closeCreateModal}
                  style={customStyles}
                >
                  <div className="row">
                    <div className="col-md-6 offset-md-3">
                      <form onSubmit={this.codeSubmit}>
                        <div className="form-group">
                          <div className="d-flex">
                            <GrContact size={70} className="pt-4" />
                            <div className="container mx-1">
                              <label htmlFor="code">Code:</label>
                              <input
                                type="number"
                                placeholder="Enter The Code From Message"
                                name="code"
                                className={
                                  error?.code
                                    ? "form-control is-invalid"
                                    : "form-control mb-3"
                                }
                                id="code"
                                value={code}
                                onChange={this.changeHandler}
                              />
                              {error?.code && (
                                <div className="invalid-feedback mb-3">
                                  {error?.code}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-success container">
                          Submit <GiCheckMark size={22} className="pb-1" />
                        </button>
                      </form>
                    </div>
                  </div>
                </Modal>
              </div>
            ) : error ? (
              ""
            ) : (
              <div className="container">
                <Modal
                  isOpen={this.state.createModalOpen}
                  onRequestClose={this.closeCreateModal}
                  style={customStyles}
                >
                  <div className="row">
                    <div className="col-md-6 offset-md-3">
                      <form onSubmit={this.codeSubmit}>
                        <div className="form-group">
                          <label htmlFor="code">Code:</label>
                          <input
                            type="number"
                            placeholder="Enter The Code From Message"
                            name="code"
                            className={
                              error?.code
                                ? "form-control is-invalid"
                                : "form-control mb-3"
                            }
                            id="code"
                            value={code}
                            onChange={this.changeHandler}
                          />
                          {error?.code && (
                            <div className="invalid-feedback mb-3">
                              {error?.code}
                            </div>
                          )}
                        </div>

                        <button className="btn btn-primary container">
                          Register
                        </button>
                      </form>
                    </div>
                  </div>
                </Modal>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  guide: state.guide,
});
export default connect(mapStateToProps, { register, registerRequest })(
  withRouter(Register)
);
