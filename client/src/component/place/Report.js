import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { reportPlace } from "../../store/actions/placeAction";
import { VscReport } from "react-icons/vsc";

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
    error: {},
    clicked: false,
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.place.error == null) return null;
    else if (
      JSON.stringify(nextProps.place.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.place.error.message,
      };
    }
    return null;
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.reportPlace(this.props.placeID, this.state);
    this.setState({ clicked: true });
  };
  render() {
    let { reportProblem, error, clicked } = this.state;
    if (error.length == null && clicked) {
      this.setState({
        reportProblem: "",
        clicked: false,
      });
    }
    return (
      <div className="container">
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.close}
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
                  <div className="invalid-feedback">{error?.reportProblem}</div>
                )}
              </div>
              <button className="btn btn-warning container">
                Report <VscReport size={20} />
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    place: state.place,
  };
};
export default connect(mapStateToProps, { reportPlace })(Report);
