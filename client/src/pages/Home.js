import React, { Component } from "react";
class Home extends Component {
  state = {
    singleFile: [],
  };
  fileUpload = (event) => {
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(URL.createObjectURL(event.target.files[i]));
    }
    this.setState({
      singleFile: selectedFiles,
    });
  };
  render() {
    return (
      <div className="container">
        <i className="bi bi-star"></i>
        <h1>Home</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <i className="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <form>
              <div className="form-group">
                <label htmlFor="file">File:</label>
                <input
                  type="file"
                  name="singleFile"
                  className="form-control"
                  onChange={this.fileUpload}
                  multiple
                />
              </div>
            </form>
          </div>
        </div>
        {this.state.singleFile.map((file, i) => (
          <div key={i} className="test">
            <img src={file} alt="" className="test" />
          </div>
        ))}
      </div>
    );
  }
}
export default Home;
