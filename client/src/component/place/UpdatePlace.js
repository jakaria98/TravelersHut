import React, { Component } from "react";

import Dataset from "../../utils/Data";

import { CgRename } from "react-icons/cg";
import { MdAddAPhoto, MdPhoto } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { ImLocation, ImLocation2 } from "react-icons/im";
import { FiEdit } from "react-icons/fi";

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
  };

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

  render() {
    let { name, division, district, upazila } = this.state;
    let divisionObject, districtObject;
    if (division.length > 0) {
      divisionObject = this.getDivision(division);
    }
    if (district.length > 0) {
      districtObject = this.getDistrict(district, divisionObject);
    }
    console.log(this.state);

    return (
      <div style={{ marginTop: "110px" }}>
        <div className="col-md-6 offset-md-3">
          <div className="div text-center">
            <h1 className=" display-4" style={{ margin: "5px" }}>
              Update Place
            </h1>
            <div />
          </div>
          <form>
            <div className="form-group">
              <div className="d-flex">
                <CgRename size={70} className="pt-4" />
                <div className="container ">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    placeholder="Rename The Place"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={this.changeHandler}
                  />
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
                    className="form-control"
                    onChange={this.getPhoto}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <MdPhoto size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="detailsPhoto">Details Photo: </label>

                  <input
                    type="file"
                    name="detailsPhoto"
                    className="form-control"
                    onChange={this.getPhoto}
                  />
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
                    className="form-control"
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
                    className="form-control"
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
                </div>
              </div>
            </div>
            <div className="form-group my-2">
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
                    <option value="all">Default</option>
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
            <div className="container">
              <button className="container d-block w-75 my-3 btn btn-info">
                Update <FiEdit size={22} className="pb-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default UpdatePlace;
