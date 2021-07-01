import React, { Component } from "react";

class CreatePost extends Component {
  state = {
    visitingFrom: "",
    minimumCost: "",
    residence: false,
    coverPhoto: "",
    images: [],
    details: "",
    error: {},
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

  render() {
    let { visitingFrom, minimumCost, residence, details, error } = this.state;

    console.log(residence);

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center font-monospace">Create A Post</h1>
          <form>
            <div className="form-group">
              <label htmlFor="visitingFrom">From:</label>
              <input
                type="text"
                placeholder="Visiting From"
                name="visitingFrom"
                id="visitingFrom"
                className={
                  error?.visitingFrom
                    ? "form-control is-invalid"
                    : "form-control"
                }
                value={visitingFrom}
                onChange={this.changeHandler}
              />
              {error?.visitingFrom && (
                <div className="invalid-feedback">{error?.visitingFrom}</div>
              )}
            </div>

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
                  error?.coverPhoto ? "form-control is-invalid" : "form-control"
                }
                onChange={this.getPhoto}
              />
              {error?.coverPhoto && (
                <div className="invalid-feedback">{error?.coverPhoto}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="images">Add Some Additional Photos: </label>

              <input
                type="file"
                name="images"
                className={
                  error?.images ? "form-control is-invalid" : "form-control"
                }
                onChange={this.getPhoto}
                multiple
              />
              {error?.images && (
                <div className="invalid-feedback">{error?.images}</div>
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
            <button className="btn btn-primary mb-5 apply">Create</button>
          </form>
        </div>
      </div>
    );
  }
}
export default CreatePost;
