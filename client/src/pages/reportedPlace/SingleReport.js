import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceInfo from "../../component/place/PlaceInfo";
import { getSingleReport } from "../../store/actions/reportedPlaceAction";
class SingleReport extends Component {
  componentDidMount() {
    let { keyVal } = this.props.location.state;
    this.props.getSingleReport(keyVal);
  }
  render() {
    let { reportedPlace } = this.props;
    console.log(this.props);
    return reportedPlace.length <= 0 ? (
      <h1>Loading</h1>
    ) : (
      <PlaceInfo
        coverPhoto={reportedPlace.coverPhoto}
        name={reportedPlace.name}
        division={reportedPlace.division}
        district={reportedPlace.district}
        upazila={reportedPlace.upazila}
        createdAt={reportedPlace.createdAt}
        detailsPhoto={reportedPlace.detailsPhoto}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportedPlace: state.reportedPlace,
  };
};
export default connect(mapStateToProps, { getSingleReport })(SingleReport);
