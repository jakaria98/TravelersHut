import React, { Component } from "react";
import { connect } from "react-redux";

import { loadPlaces } from "../../store/actions/placeAction";

import PlaceCard from "../../component/place/PlaceCard";
import AddPlace from "../../component/place/AddPlace";
import Loading from "../../component/utils/Loading";
import Dataset from "../../utils/Data";

import { RiMapPinAddFill } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { ImLocation, ImLocation2 } from "react-icons/im";
class AllPlaces extends Component {
  state = {
    createModalOpen: false,
    division: "all",
    district: "all",
    upazila: "all",
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

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "division" && event.target.value === "all") {
      this.setState({ district: "all", upazila: "all" });
    } else if (
      event.target.name === "district" &&
      event.target.value === "all"
    ) {
      this.setState({ upazila: "all" });
    }
  };

  getDivision = (division) => {
    division = Dataset.division.filter((dvs) => dvs.name === division);
    return division;
  };

  getDistrict = (district, division) => {
    district = division[0].district.filter((dis) => dis.name === district);
    return district;
  };

  placeFilter = (place) => {
    if (this.state.division !== "all") {
      place = place.filter((plc) => plc.division === this.state.division);
    }
    if (this.state.district !== "all") {
      place = place.filter((plc) => plc.district === this.state.district);
    }
    if (this.state.upazila !== "all") {
      place = place.filter((plc) => plc.upazila === this.state.upazila);
    }
    return place;
  };
  render() {
    let { place } = this.props;
    place = this.placeFilter(place);
    console.log(place);
    let placeRating = 0;
    let divisionObject, districtObject;
    let { division, district } = this.state;
    if (division !== "all") divisionObject = this.getDivision(division);
    if (district !== "all")
      districtObject = this.getDistrict(district, divisionObject);
    return (
      <>
        <div style={{ marginTop: "120px" }}>
          <div className="container ">
            <div className="div text-center">
              <h1 className="display-4" style={{ margin: "5px" }}>
                Search For A Place
              </h1>
              <div />
            </div>
            <form className="filter-form">
              <div className="form-group">
                <div className="d-flex">
                  <GrMapLocation size={70} className="pt-4" />
                  <div className="container">
                    <label htmlFor="division">Division:</label>
                    <select
                      className="form-control"
                      name="division"
                      id="division"
                      onChange={this.changeHandler}
                    >
                      <option value="all">All</option>
                      {Dataset.division.map((div, i) => (
                        <option key={i} value={div.name}>
                          {div.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <ImLocation size={70} className="pt-4" />
                  <div className="container">
                    <label htmlFor="district">District:</label>
                    <select
                      className="form-control"
                      name="district"
                      id="district"
                      onChange={this.changeHandler}
                    >
                      <option value="all">All</option>
                      {divisionObject
                        ? divisionObject[0].district.map((dis, i) => (
                            <option key={i} value={dis.name}>
                              {dis.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <ImLocation2 size={70} className="pt-4" />
                  <div className="container">
                    <label htmlFor="upazila">Upazila:</label>
                    <select
                      className="form-control"
                      name="upazila"
                      id="upazila"
                      onChange={this.changeHandler}
                    >
                      <option value="all">All</option>
                      {districtObject
                        ? districtObject[0].upazila.map((upz, i) => (
                            <option key={i} value={upz}>
                              {upz}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-4"></div>
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
          : (this.props.loadPlaces(), (<Loading />))}
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
