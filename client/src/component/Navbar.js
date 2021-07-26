import React, { Component } from "react";
import logo from "../Travelers Hut.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { visitorLogout } from "../store/actions/visitorAction";
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Travelers HUt" />
            </Link>
          </div>
          {this.props.visitor.isAuthenticated ? (
            <ul className="nav-links">
              <li>
                <Link to="/all-places">All Places</Link>
              </li>
              <li>
                <Link to="/guide/login">Login as Guide</Link>
              </li>
              <li>
                <Link to="/guide/register">Register as Guide</Link>
              </li>
              <li>
                <Link to="/" onClick={() => this.props.visitorLogout()}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-links nav-none-logged">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
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
export default connect(mapStateToProps, { visitorLogout })(Navbar);
