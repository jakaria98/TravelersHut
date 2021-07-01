import React, { Component } from "react";
import { loadPlaces } from "../store/actions/placeAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PlaceCard from "../component/place/PlaceCard";
class AllPlaces extends Component {
  componentDidMount() {
    this.props.loadPlaces();
  }
  render() {
    let { place } = this.props;
    console.log(place);
    return place.length > 0 ? (
      place.map((plc) => <PlaceCard place={plc} key={plc._id} />)
    ) : (
      <h1>LOADING</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    place: state.place,
  };
};

export default connect(mapStateToProps, { loadPlaces })(AllPlaces);
