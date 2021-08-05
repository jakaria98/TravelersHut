import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import { loadReports } from "../../store/actions/reportedPlaceAction";

class AllReports extends Component {
  componentDidMount() {
    this.props.loadReports();
  }
  render() {
    console.log(this.props);
    return <div>hi</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    reportedPlace: state.reportedPlace,
  };
};
export default connect(mapStateToProps, { loadReports })(AllReports);
