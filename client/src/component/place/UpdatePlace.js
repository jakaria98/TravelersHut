import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Dataset from "../../utils/Data";
import { updatePlace } from "../../store/actions/placeAction";

import { CgRename } from "react-icons/cg";
import { MdAddAPhoto, MdPhoto } from "react-icons/md";
import { GrMapLocation, GrUpdate } from "react-icons/gr";
import { ImLocation, ImLocation2 } from "react-icons/im";

class UpdatePlace extends Component {
  state = {
    name: "",
    division: "",
    district: "",
    upazila: "",
    coverPhoto: "",
    detailsPhoto: [],
    placeID: "",
    error: {},
    invalidAction: "",
  };

  componentDidMount() {
    if (this.props.location.state) {
      const { placeID, name, division, district, upazila } =
        this.props.location.state;
      this.setState({
        name,
        placeID,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.place.error == null) return null;
    else if (
      JSON.stringify(nextProps.place.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.place.error.message,
      };
    }
    return null;
  }

  getPhoto = (event) => {
    //console.log(files);
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(event.target.files[i]);
    }
    this.setState({
      [event.target.name]: selectedFiles,
    });
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "division" && event.target.value.length === 0) {
      this.setState({ district: "", upazila: "" });
    } else if (
      event.target.name === "district" &&
      event.target.value.length === 0
    ) {
      this.setState({ upazila: "" });
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

  submitHandler = (e) => {
    e.preventDefault();

    let {
      name,
      division,
      district,
      upazila,
      coverPhoto,
      detailsPhoto,
      placeID,
    } = this.state;
    if (!placeID) {
      let invalidAction = "Invalid Action";
      this.setState({ invalidAction });
    } else {
      const formData = new FormData();
      const multiplePhoto = Object.values(detailsPhoto);
      const singlePhoto = Object.values(coverPhoto);

      for (let i = 0; i < multiplePhoto.length; i++) {
        formData.append("detailsPhoto", multiplePhoto[i]);
      }
      singlePhoto.map((f) => {
        formData.append("coverPhoto", f);
      });
      formData.append("name", name);
      formData.append("division", division);
      formData.append("district", district);
      formData.append("upazila", upazila);
      this.props.updatePlace(placeID, formData, this.props.history);
    }
  };
  render() {
    let { name, division, district, error, invalidAction } = this.state;
    let divisionObject, districtObject;
    if (division.length > 0) {
      divisionObject = this.getDivision(division);
    }
    if (district.length > 0) {
      districtObject = this.getDistrict(district, divisionObject);
    }
    return (
      <div style={{ marginTop: "110px" }}>
        <div className="col-md-6 offset-md-3">
          <div className="div text-center">
            <h1 className=" display-4" style={{ margin: "5px" }}>
              Update Place
            </h1>
            <div />
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <div className="d-flex">
                <CgRename size={70} className="pt-4" />
                <div className="container ">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    placeholder="Rename The Place"
                    className={
                      error?.name ? "form-control is-invalid" : "form-control"
                    }
                    name="name"
                    value={name}
                    onChange={this.changeHandler}
                  />
                  {error?.name && (
                    <div className="invalid-feedback">{error?.name}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <MdAddAPhoto size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="coverPhoto">Cover Photo: </label>

                  <input
                    type="file"
                    name="coverPhoto"
                    className={
                      error?.coverPhoto
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={this.getPhoto}
                  />
                  {error?.coverPhoto && (
                    <div className="invalid-feedback">{error?.coverPhoto}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <MdPhoto size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="detailsPhoto">Additional Photos: </label>

                  <input
                    type="file"
                    name="detailsPhoto"
                    className={
                      error?.detailsPhoto
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={this.getPhoto}
                    multiple
                  />
                  {error?.detailsPhoto && (
                    <div className="invalid-feedback">
                      {error?.detailsPhoto}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <GrMapLocation size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="division">Division:</label>
                  <select
                    name="division"
                    className={
                      error?.division
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="division"
                    onChange={this.changeHandler}
                  >
                    <option value="">Default</option>
                    {Dataset.division.map((div, i) => (
                      <option key={i} value={div.name}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                  {error?.division && (
                    <div className="invalid-feedback">{error.division}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group ">
              <div className="d-flex">
                <ImLocation size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="district">District:</label>
                  <select
                    name="district"
                    className={
                      error?.district
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="district"
                    onChange={this.changeHandler}
                  >
                    <option value="">Default</option>
                    {divisionObject
                      ? divisionObject[0].district.map((dis, i) => (
                          <option key={i} value={dis.name}>
                            {dis.name}
                          </option>
                        ))
                      : null}
                  </select>
                  {error?.district && (
                    <div className="invalid-feedback">{error?.district}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group my-2">
              <div className="d-flex">
                <ImLocation2 size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="upazila">Upazila:</label>
                  <select
                    className={
                      error?.upazila
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="upazila"
                    id="upazila"
                    onChange={this.changeHandler}
                  >
                    <option value="all">Default</option>
                    {districtObject
                      ? districtObject[0].upazila.map((upz, i) => (
                          <option key={i} value={upz}>
                            {upz}
                          </option>
                        ))
                      : null}
                  </select>
                  {error?.upazila && (
                    <div className="invalid-feedback">{error?.upazila}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                className={
                  invalidAction
                    ? "form-control is-invalid d-none"
                    : "form-control d-none"
                }
              />
              {invalidAction && (
                <div className="invalid-feedback text-center my-2">
                  <h6>{invalidAction}</h6>
                </div>
              )}
            </div>
            <div className="container">
              <button className="container d-block w-75 my-3 btn btn-info">
                Update <GrUpdate size={22} className="pb-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    place: state.place,
  };
};
export default connect(mapStateToProps, { updatePlace })(
  withRouter(UpdatePlace)
);
