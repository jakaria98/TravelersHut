import React, { Component } from "react";
import Modal from "react-modal";
import Dataset from "../../utils/Data";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/placeAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
  },
};

class AddPlace extends Component {
  state = {
    name: "",
    division: "",
    district: "",
    upazila: "",
    coverPhoto: "",
    detailsPhoto: [],
    error: {},
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getPhoto = (event) => {
    //console.log(files);
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(URL.createObjectURL(event.target.files[i]));
    }
    this.setState({
      [event.target.name]: selectedFiles,
    });
  };

  getDivision = (division) => {
    division = Dataset.division.filter((dvs) => dvs.name === division);
    return division;
  };

  getDistrict = (district, division) => {
    division = Dataset.division.filter((dvs) => dvs.name === division);
    district = division[0].district.filter((dis) => dis.name === district);
    return district;
  };

  submitHandler = (e) => {
    let { name, division, district, upazila, coverPhoto, detailsPhoto } =
      this.state;
    if (
      name.length === 0 ||
      division.length === 0 ||
      district.length === 0 ||
      upazila.length === 0 ||
      coverPhoto.length === 0 ||
      detailsPhoto.length === 0
    )
      e.preventDefault();

    this.props.addPlace(this.state);
  };

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

  render() {
    let { name, division, district, error } = this.state;
    let divisionObject, districtObject;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        style={customStyles}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center display-4">Add A Place</h1>
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder="Enter The Place Name"
                  name="name"
                  className={
                    error?.name ? "form-control is-invalid" : "form-control"
                  }
                  id="name"
                  value={name}
                  onChange={this.changeHandler}
                />
                {error?.name && (
                  <div className="invalid-feedback">{error?.name}</div>
                )}
              </div>
              <div className="form-group my-3">
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
              <div className="form-group">
                <label htmlFor="detailsPhoto">
                  Add Some Additional Photos:{" "}
                </label>

                <input
                  type="file"
                  name="detailsPhoto"
                  className={
                    error?.detailsPhoto
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  multiple
                  onChange={this.getPhoto}
                />
                {error?.detailsPhoto && (
                  <div className="invalid-feedback">{error?.detailsPhoto}</div>
                )}
              </div>
              <div className="form-group my-3">
                <label htmlFor="division">Division:</label>
                <select
                  name="division"
                  className={
                    error?.division ? "form-control is-invalid" : "form-control"
                  }
                  id="division"
                  onChange={this.changeHandler}
                >
                  <option value="">Default</option>
                  {Dataset.division.map((division, i) => (
                    <option key={i} value={division.name}>
                      {division.name}
                    </option>
                  ))}
                </select>
                {error?.division && (
                  <div className="invalid-feedback">{error.division}</div>
                )}
              </div>
              {division.length === 0 ? (
                <div className="form-group">
                  <label htmlFor="district">District:</label>
                  <select
                    disabled
                    className={
                      error?.district
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  >
                    <option>Add Division First</option>
                  </select>
                  {error?.district && (
                    <div className="invalid-feedback">{error?.district}</div>
                  )}
                </div>
              ) : (
                ((divisionObject = this.getDivision(division)),
                (
                  <div className="form-group">
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
                      {divisionObject[0].district.map((dst, i) => (
                        <option key={i} value={dst.name}>
                          {dst.name}
                        </option>
                      ))}
                    </select>
                    {error?.district && (
                      <div className="invalid-feedback">{error?.district}</div>
                    )}
                  </div>
                ))
              )}
              {division.length === 0 || district.length === 0 ? (
                <div className="form-group my-3">
                  <label htmlFor="upazila">Upazila:</label>
                  <select
                    className={
                      error?.upazila
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    disabled
                  >
                    <option>Add Division and District First</option>
                  </select>
                  {error?.upazila && (
                    <div className="invalid-feedback">{error?.upazila}</div>
                  )}
                </div>
              ) : (
                ((districtObject = this.getDistrict(district, division)),
                (
                  <div className="form-group my-3">
                    <label htmlFor="upazila">Upazila:</label>
                    <select
                      name="upazila"
                      id="upazila"
                      className={
                        error?.upazila
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onChange={this.changeHandler}
                    >
                      <option value="">Default</option>
                      {districtObject[0].upazila.map((upz, i) => (
                        <option key={i} value={upz}>
                          {upz}
                        </option>
                      ))}
                    </select>
                    {error?.upazila && (
                      <div className="invalid-feedback">{error?.upazila}</div>
                    )}
                  </div>
                ))
              )}
              <button className="btn btn-primary apply ">ADD</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    place: state.place,
  };
};
export default connect(mapStateToProps, { addPlace })(AddPlace);