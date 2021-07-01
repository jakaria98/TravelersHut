import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import visitorRegister from "../pages/visitorLoginAndRegisterSystem/Register";
import visitorLogin from "../pages/visitorLoginAndRegisterSystem/Login";

import adminRegister from "../pages/adminLoginAndRegistrationSystem/Register";
import adminLogin from "../pages/adminLoginAndRegistrationSystem/Login";

import GuideLogin from "../pages/guideLoginAndRegisterSystem/Login";
import GuideRegister from "../pages/guideLoginAndRegisterSystem/Register";

import AddPlace from "../pages/addPlace";
import AllPlaces from "../pages/allPlaces";
import CreatePost from "../pages/createPost";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={visitorRegister} />
          <Route path="/login" component={visitorLogin} />

          <Route path="/admin/register" component={adminRegister} />
          <Route path="/admin/login" component={adminLogin} />

          <Route path="/all-places" component={AllPlaces} />

          <Route path="/guide/add-a-place" component={AddPlace} />
          <Route path="/guide/login" component={GuideLogin} />
          <Route path="/guide/register" component={GuideRegister} />
          <Route path="/guide/create-post" component={CreatePost} />

          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
