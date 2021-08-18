import React, { Component } from "react";
import loading_arrow from "./loading-arrow.gif";
export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={loading_arrow} alt="Data Loading" />
      </div>
    );
  }
}
