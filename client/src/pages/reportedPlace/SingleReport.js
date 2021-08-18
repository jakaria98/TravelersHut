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
import Loading from "../../component/Loading";
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
        )}
        {reportedPlace ? (
          <div className="container mb-5 mt-3">
            <button
              className="btn btn-success w-100 my-1"
              onClick={() =>
                this.props.removeReport(reportedPlace._id, this.props.history)
              }
            >
              Everything OK <GiCheckMark size={22} className="pb-1" />
            </button>
            <button
              className="btn btn-danger w-100 my-1"
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
})(SingleReport);
