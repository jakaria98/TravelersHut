import React, { Component } from "react";
import { loadPlaces } from "../../store/actions/placeAction";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import AddPlace from "../../component/place/AddPlace";
import Loading from "../../component/Loading";
import { RiMapPinAddFill } from "react-icons/ri";
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
        <div style={{ marginTop: "100px" }}>
          <div className="container div d-block text-center">
            <h1 className="display-4" style={{ margin: "5px" }}>
              ALL PLACES
            </h1>
            <div />
          </div>
          {this.props.guide.isAuthenticated ? (
            <button
              className="btn btn-primary d-block w-75 container"
              onClick={this.openCreateModal}
            >
              Add A Place <RiMapPinAddFill size={22} className="pb-1" />
            </button>
          ) : null}
        </div>
        {place.length > 0
          ? place.map(
              (plc) => (
                (placeRating = Math.round(
                  plc.ratingCount / plc.ratedBy.length
                )),
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
          : ((<Loading />), this.props.loadPlaces())}
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
