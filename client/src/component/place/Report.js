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
    width: "800px",
  },
};
class Report extends Component {
  state = {
    reportProblem: "",
    error: {},
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
  };
  render() {
    let { reportProblem, error } = this.state;
    return (
      <div className="container">
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.close}
          style={customStyles}
        >
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={this.submitHandler}>
                <div className="form-group my-3">
                  <label htmlFor="reportProblem">Problem:</label>
                  <textarea
                    rows="6"
                    name="reportProblem"
                    id="reportProblem"
                    placeholder="Elaborate The Problem"
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
                <button className="btn btn-danger container">
                  Report <VscReport size={20} />
                </button>
              </form>
            </div>
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
