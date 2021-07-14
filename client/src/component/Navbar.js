import React, { Component } from "react";
import logo from "../Travelers Hut.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
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
  };
};
export default connect(mapStateToProps)(Navbar);
