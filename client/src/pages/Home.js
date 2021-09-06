import React, { Component } from "react";

import cover_photo from "./home.jpg";

import { FaImages, FaMoon, FaRoad } from "react-icons/fa";
import { GiFootsteps } from "react-icons/gi";
import { DiDigitalOcean } from "react-icons/di";
import { WiSunrise } from "react-icons/wi";
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
      <div style={{ margin: "110px auto" }}>
        <div className="home-img-container">
          <img src={cover_photo} style={{ width: "100%" }} alt="cover photo" />
          <div className="text-top container ">
            <h3>" Travel Is The Only Thing You Buy That Makes You Richer "</h3>
            <h2>" To Travel Is To Live "</h2>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <FaRoad size={150} className="px-4" />
              <h4>
                “Do not follow where the path may lead. Go instead where there
                is no path and leave a trail” – Ralph Waldo Emerson
              </h4>
            </div>
            <div className="col">
              <WiSunrise size={150} className="px-4" />
              <h4>
                “There’s a sunrise and a sunset every single day, and they’re
                absolutely free. Don’t miss so many of them” – Jo Walton
              </h4>
            </div>

            <div className="col">
              <FaImages size={150} className="px-4" />
              <h4>
                “We take photos as a return ticket to a moment otherwise gone” –
                Katie Thurmes
              </h4>
            </div>
            <div className="col">
              <GiFootsteps size={150} className="px-4" />
              <h4>
                “A journey of a thousand miles begins with a single step” – Lao
                Tzu
              </h4>
            </div>
            <div className="col">
              <DiDigitalOcean size={150} className="px-4" />
              <h4>
                “Man cannot discover new oceans unless he has the courage to
                lose sight of the shore” – Andre Gide
              </h4>
            </div>
            <div className="col">
              <FaMoon size={150} className="px-4" />
              <h4>
                “I am not the same, having seen the moon shine on the other side
                of the world” – Mary Anne Radmacher
              </h4>
            </div>
          </div>
          <hr />
          <div className="div text-center">
            <h1 style={{ margin: "5px", fontWeight: 600 }}>Thank You</h1>
            <div />
          </div>
          <p className="text-center my-0">
            &copy;All Rights Reserved By JAKARIA & SALMAN
          </p>
          <hr />
        </div>
      </div>
    );
  }
}
export default Home;
