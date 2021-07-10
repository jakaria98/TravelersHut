import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import visitorRegister from "../pages/Visitor/Register";
import visitorLogin from "../pages/Visitor/Login";

import adminRegister from "../pages/Admin/Register";
import adminLogin from "../pages/Admin/Login";

import GuideLogin from "../pages/Guide/Login";
import GuideRegister from "../pages/Guide/Register";
import AllGuide from "../pages/Guide/AllGuide";
import SingleGuide from "../pages/Guide/SingleGuide";

import AllPlaces from "../pages/place/allPlaces";
import SinglePlace from "../pages/place/SinglePlace";

import SinglePost from "../pages/post/SinglePost";

import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={visitorRegister} />
          <Route path="/login" component={visitorLogin} />

          <Route path="/admin/register" component={adminRegister} />
          <Route path="/admin/login" component={adminLogin} />

          <Route path="/all-places" component={AllPlaces} />
          <Route path="/places/:placeName" component={SinglePlace} />
          <Route path="/blog/:_id" component={SinglePost} />

          <Route path="/guide/login" component={GuideLogin} />
          <Route path="/guide/register" component={GuideRegister} />
          <Route path="/guide/allGuide" component={AllGuide} />
          <Route path="/guide/:name" component={SingleGuide} />

          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
