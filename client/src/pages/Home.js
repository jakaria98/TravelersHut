import React, { Component } from "react";
class Home extends Component {
  state = {
    singleFile: [],
  };
  fileUpload = (event) => {
    console.log(event.target.files);
    let selectedFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      selectedFiles.push(URL.createObjectURL(event.target.files[i]));
    }
    this.setState({
      singleFile: selectedFiles,
    });
  };
  render() {
    console.log(this.state);
    return (
      <div className="container">
        <h1>
          Home 
        </h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
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
