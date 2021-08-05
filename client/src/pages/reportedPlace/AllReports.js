import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import { loadReports } from "../../store/actions/reportedPlaceAction";

class AllReports extends Component {
  componentDidMount() {
    this.props.loadReports();
  }
  render() {
    let { reportedPlace } = this.props;
    return reportedPlace.length > 0
      ? reportedPlace.map((report) => (
          <PlaceCard
            name={report.name}
            coverPhoto={report.coverPhoto}
            placeRating={null}
            _id={report._id}
            pathLink="/all-places/reported-places"
            key={report._id}
          />
        ))
      : null;
  }
}
const mapStateToProps = (state) => {
  return {
    reportedPlace: state.reportedPlace,
  };
};
export default connect(mapStateToProps, { loadReports })(AllReports);
