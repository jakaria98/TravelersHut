import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import Dataset from "../../utils/Data";
import { addPost } from "../../store/actions/postAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "100%",
  },
};
class CreatePost extends Component {
  state = {
    division: "",
    district: "",
    upazila: "",
    minimumCost: "",
    residence: false,
    coverPhoto: [],
    detailsPhoto: [],
    details: "",
    error: {},
  };

  getPhotos = (event) => {
    //console.log(files);
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(URL.createObjectURL(event.target.files[i]));
    }
    this.setState({
      [event.target.name]: selectedFiles,
    });
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  checkHandler = (key) => {
    this.setState({
      [key]: !this.state[key],
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.post.error == null) return null;
    else if (
      JSON.stringify(nextProps.post.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.post.error.message,
      };
    }
    return null;
  }

  submitHandler = (e) => {
    let {
      division,
      district,
      upazila,
      minimumCost,
      residence,
      coverPhoto,
      detailsPhoto,
      details,
    } = this.state;
    let { placeID } = this.props;

    if (
      division.length === 0 ||
      district.length === 0 ||
      upazila.length === 0 ||
      minimumCost.length === 0 ||
      coverPhoto.length === 0 ||
      detailsPhoto.length === 0 ||
      details.length === 0
    )
    e.preventDefault();
    this.props.addPost(
      {
        division,
        district,
        upazila,
        minimumCost,
        residence,
        coverPhoto,
        detailsPhoto,
        details,
      },
      placeID
    );
  };
  render() {
    let {
      division,
      district,
      upazila,
      minimumCost,
      residence,
      details,
      error,
    } = this.state;

    let divisionObject, districtObject;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        style={customStyles}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center display-4">Create A Post</h1>
            <form onSubmit={this.submitHandler}>
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

              <div className="form-group my-3">
                <label htmlFor="minimumCost">Minimum Cost:</label>
                <input
                  type="Number"
                  placeholder="Enter Minimum Cost"
                  name="minimumCost"
                  id="minimumCost"
                  className={
                    error?.minimumCost
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={minimumCost}
                  onChange={this.changeHandler}
                />
                {error?.minimumCost && (
                  <div className="invalid-feedback">{error?.minimumCost}</div>
                )}
              </div>
              <div className="form-group my-3">
                <label htmlFor="coverPhoto">Cover Photo:</label>

                <input
                  type="file"
                  name="coverPhoto"
                  className={
                    error?.coverPhoto
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={this.getPhotos}
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
                  onChange={this.getPhotos}
                  multiple
                />
                {error?.detailsPhoto && (
                  <div className="invalid-feedback">{error?.detailsPhoto}</div>
                )}
              </div>
              <div className="form-group my-3">
                <label htmlFor="residence">Residence Facility:</label>
                <input
                  type="checkbox"
                  name="residence"
                  id="residence"
                  className={
                    error?.residence
                      ? "form-check-input is-invalid"
                      : "form-check-input"
                  }
                  checked={residence}
                  onChange={() => this.checkHandler("residence")}
                />

                {error?.residence && (
                  <div className="invalid-feedback">{error?.residence}</div>
                )}
              </div>
              <div className="form-group my-3">
                <label htmlFor="details">Blog:</label>
                <textarea
                  rows="6"
                  name="details"
                  id="details"
                  placeholder="Write Details Note"
                  className={
                    error?.details ? "form-control is-invalid" : "form-control"
                  }
                  value={details}
                  onChange={this.changeHandler}
                />

                {error?.details && (
                  <div className="invalid-feedback">{error?.details}</div>
                )}
              </div>
              <button className="btn btn-primary  apply">Create</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { addPost })(CreatePost);
