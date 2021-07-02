import React, { Component } from "react";
import { loadPlaces } from "../../store/actions/placeAction";
import { connect } from "react-redux";
import PlaceCard from "../../component/place/PlaceCard";
import AddPlace from "../../component/place/AddPlace";
class AllPlaces extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.loadPlaces();
  }
  state = {
    createModalOpen: false,
  };
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
    console.log(place);
    return (
      <>
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
          place.map((plc) => <PlaceCard place={plc} key={plc._id} />)
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
