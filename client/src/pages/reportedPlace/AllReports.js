import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import { loadReports } from "../../store/actions/reportedPlaceAction";
import Loading from "../../component/utils/Loading";
class AllReports extends Component {
  componentDidMount() {
    this.props.loadReports();
  }
  render() {
    let { reportedPlace } = this.props;
    return (
      <>
        <div style={{ marginTop: "120px" }}>
          <div className="div text-center">
            <h1 className="display-4" style={{ margin: "5px" }}>
              Reported Places
            </h1>
            <div />
          </div>
          {reportedPlace.length
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
            : (this.props.loadReports(), (<Loading />))}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportedPlace: state.reportedPlace,
  };
};
export default connect(mapStateToProps, { loadReports })(AllReports);
