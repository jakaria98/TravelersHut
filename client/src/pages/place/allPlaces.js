import React, { Component } from "react";
import { loadPlaces } from "../../store/actions/placeAction";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import AddPlace from "../../component/place/AddPlace";
class AllPlaces extends Component {
  state = {
    createModalOpen: false,
  };
  componentDidMount() {
    this.props.loadPlaces();
  }
  openCreateModal = () => {
    this.setState({
      createModalOpen: true,
    });
  };
  closeCreateModal = () => {
    this.setState({
      createModalOpen: false,
    });
  };

  render() {
    let { place } = this.props;
    let placeRating = 0;
    return (
      <>
        <div className="my-5"></div>
        {this.props.guide.isAuthenticated ? (
          <button
            className="btn btn-primary d-block center container"
            onClick={this.openCreateModal}
          >
            Add A Place
          </button>
        ) : (
          ""
        )}
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
          <h1>LOADING</h1>
        )}
        <AddPlace
          isOpen={this.state.createModalOpen}
          close={this.closeCreateModal}
        />
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

export default connect(mapStateToProps, { loadPlaces })(AllPlaces);
