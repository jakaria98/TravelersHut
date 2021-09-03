import React, { Component } from "react";
import { connect } from "react-redux";

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

import AllReports from "../pages/reportedPlace/AllReports";
import SingleReport from "../pages/reportedPlace/SingleReport";

import Navbar from "./Navbar";
import AllReportedPosts from "../pages/reportedPost/AllReportedPosts";
import SingleReportedPost from "../pages/reportedPost/SingleReportedPost";
import { ProtectedRoute } from "./utils/ProtectedRouter";
import AllAdmin from "../pages/Admin/AllAdmin";
import SingleAdmin from "../pages/Admin/SingleAdmin";
import UserProfile from "../pages/UserProfile";
import ForgetPass from "../pages/ForgetPass";

import UpdatePlace from "./place/UpdatePlace";
class App extends Component {
  render() {
    let anyone, onlyAdmin, onlyGuide, onlyVisitor, adminOrGuide;
    anyone =
      this.props.visitor.isAuthenticated ||
      this.props.guide.isAuthenticated ||
      this.props.admin.isAuthenticated;
    onlyAdmin = this.props.admin.isAuthenticated;
    onlyGuide = this.props.guide.isAuthenticated;
    onlyVisitor =
      this.props.visitor.isAuthenticated &&
      !this.props.admin.isAuthenticated &&
      !this.props.guide.isAuthenticated;
    adminOrGuide =
      this.props.guide.isAuthenticated || this.props.admin.isAuthenticated;
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <ProtectedRoute
            path="/my-profile"
            component={UserProfile}
            isAuth={adminOrGuide}
          />
          <Route path="/register" component={visitorRegister} />
          <Route path="/login" component={visitorLogin} />
           <Route path="/forget-password" component={ForgetPass} />
          {/* <Route path="/admin/register" component={adminRegister} /> */}
          <ProtectedRoute
            path="/admin/login"
            component={adminLogin}
            isAuth={onlyVisitor}
          />
          <ProtectedRoute
            path="/places/:placeName"
            component={SinglePlace}
            isAuth={anyone}
          />
          <ProtectedRoute
            path="/update-place"
            component={UpdatePlace}
            isAuth={onlyGuide}
          />
          <ProtectedRoute
            path="/blog/:_id"
            component={SinglePost}
            isAuth={anyone}
          />
          <ProtectedRoute
            path="/all-places/reported-places/:name"
            component={SingleReport}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            path="/all-places/reported-posts/:name"
            component={SingleReportedPost}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            path="/guide/login"
            component={GuideLogin}
            isAuth={onlyVisitor}
          />
          <ProtectedRoute
            path="/guide/register"
            component={GuideRegister}
            isAuth={onlyVisitor}
          />
          <ProtectedRoute
            path="/admin/action/allGuide"
            component={AllGuide}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            path="/admin/action/guide/:name"
            component={SingleGuide}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            exact
            path="/all-admin"
            component={AllAdmin}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            path="/all-admin/details/:name"
            component={SingleAdmin}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            exact
            path="/all-places/reported-posts"
            component={AllReportedPosts}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            exact
            path="/all-places/reported-places"
            component={AllReports}
            isAuth={onlyAdmin}
          />
          <ProtectedRoute
            exact
            path="/all-places"
            component={AllPlaces}
            isAuth={anyone}
          />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    visitor: state.visitor,
    guide: state.guide,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(App);
