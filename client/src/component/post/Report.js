import React, { Component } from "react";
import { VscReport } from "react-icons/vsc";
import Modal from "react-modal";
import { connect } from "react-redux";
import { reportPost } from "../../store/actions/postAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
  },
};

class Report extends Component {
  state = {
    reportProblem: "",
    reportModal: false,
    error: {},
    clicked: false,
  };

  openReportModal = () => {
    this.setState({
      reportModal: true,
    });
  };
  closeReportModal = () => {
    this.setState({
      reportModal: false,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.post.error == null) return null;
    else if (
      JSON.stringify(nextProps.post.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.post.error.message,
      };
    }
    return null;
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.reportPost(this.props.postID, this.state);
    this.setState({ clicked: true });
  };

  render() {
    let { error, reportProblem, clicked } = this.state;
    if (error.length == null && this.state.reportModal && clicked) {
      this.setState({
        reportProblem: "",
        clicked: false,
      });
    }
    return (
      <>
        <div className="container">
          <button
            className="btn btn-warning mt-3 mb-4 d-block container"
            style={{ width: "50%" }}
            onClick={this.openReportModal}
          >
            Report <VscReport size={20} />
          </button>
          <Modal
            isOpen={this.state.reportModal}
            onRequestClose={this.closeReportModal}
            style={customStyles}
          >
            <div className="container">
              <form onSubmit={this.submitHandler}>
                <div className="form-group my-3">
                  <label htmlFor="reportProblem">Issue:</label>
                  <textarea
                    rows="6"
                    name="reportProblem"
                    id="reportProblem"
                    placeholder="Elaborate The Issue"
                    className={
                      error?.reportProblem
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    value={reportProblem}
                    onChange={this.changeHandler}
                  />

                  {error?.reportProblem && (
                    <div className="invalid-feedback">
                      {error?.reportProblem}
                    </div>
                  )}
                </div>
                <button className="btn btn-warning container">
                  Report <VscReport size={20} />
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { reportPost })(Report);
