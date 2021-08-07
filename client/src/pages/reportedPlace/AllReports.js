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
            placeRating={report.rating}
            _id={report._id}
            pathLink="/all-places/reported-places"
            key={report._id}
          />
        ))
      : (this.props.loadReports(), (<h1>Loading</h1>));
  }
}
const mapStateToProps = (state) => {
  return {
    reportedPlace: state.reportedPlace,
  };
};
export default connect(mapStateToProps, { loadReports })(AllReports);
