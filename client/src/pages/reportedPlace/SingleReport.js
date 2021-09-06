import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceInfo from "../../component/place/PlaceInfo";
import {
  getSingleReport,
  removeReport,
  removePlace,
} from "../../store/actions/reportedPlaceAction";
import { GiCheckMark } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import Loading from "../../component/utils/Loading";
import { withRouter } from "react-router-dom";
class SingleReport extends Component {
  componentDidMount() {
    let { keyVal } = this.props.location.state;
    this.props.getSingleReport(keyVal);
  }
  render() {
    let { reportedPlace } = this.props;
    return (
      <>
        {!reportedPlace ? (
          (this.props.getSingleReport(this.props.location.state.keyVal),
          (<Loading />))
        ) : (
          <div style={{ marginTop: "109px" }}>
            <PlaceInfo
              coverPhoto={reportedPlace.coverPhoto}
              name={reportedPlace.name}
              division={reportedPlace.division}
              district={reportedPlace.district}
              upazila={reportedPlace.upazila}
              createdAt={reportedPlace.createdAt}
              detailsPhoto={reportedPlace.detailsPhoto}
              report={reportedPlace.reportProblem}
            />
          </div>
        )}
        {reportedPlace ? (
          <div className="container mb-5 mt-3">
            <button
              className="btn btn-success d-block w-75 container my-1"
              onClick={() =>
                this.props.removeReport(reportedPlace._id, this.props.history)
              }
            >
              Everything OK <GiCheckMark size={22} className="pb-1" />
            </button>
            <button
              className="btn btn-danger w-75 d-block container my-1"
              onClick={() => {
                this.props.removePlace(reportedPlace.placeID);
                this.props.removeReport(reportedPlace._id, this.props.history);
              }}
            >
              Remove The Place <FaTrash size={22} className="pb-1" />
            </button>
          </div>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportedPlace: state.reportedPlace,
    place: state.place,
  };
};
export default connect(mapStateToProps, {
  getSingleReport,
  removeReport,
  removePlace,
})(withRouter(SingleReport));
