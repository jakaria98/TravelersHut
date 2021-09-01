import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import Loading from "../../component/utils/Loading";

import { myContribution } from "../../store/actions/placeAction";

class MyContribution extends Component {
  componentDidMount() {
    this.props.myContribution(this.props.guide.guide._id);
  }
  render() {
    let { place } = this.props;
    let placeRating = 0;
    return (
      <>
        <div className="mt-4"></div>
        {place.length > 0 ? (
          place.map(
            (plc) => (
              (placeRating = Math.round(plc.ratingCount / plc.ratedBy.length)),
              (
                <PlaceCard
                  name={plc.name}
                  coverPhoto={plc.coverPhoto}
                  placeRating={placeRating}
                  _id={plc._id}
                  pathLink="/places"
                  key={plc._id}
                />
              )
            )
          )
        ) : (
          <div className="info">
            <h1 className="placeName">No Contribution Found</h1>
          </div>
        )}
        {place.length > 0 ? null : <Loading />}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    place: state.place,
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { myContribution })(MyContribution);
