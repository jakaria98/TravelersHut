import React, { Component } from "react";
import logo from "../Travelers Hut.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaBars } from "react-icons/fa";

import { visitorLogout } from "../store/actions/visitorAction";
import { guideLogout } from "../store/actions/guideAction";
import { adminLogout } from "../store/actions/adminAction";
class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Travelers HUt" />
          </Link>
        </div>
        <input type="checkbox" id="check" />
        <label for="check" className="check-btn">
          <FaBars />
        </label>
        {this.props.visitor.isAuthenticated &&
        !this.props.guide.isAuthenticated &&
        !this.props.admin.isAuthenticated ? (
          <ul>
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
              <Link to="/admin/login">Login as Admin</Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => this.props.visitorLogout(this.props.history)}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : this.props.visitor.isAuthenticated &&
          this.props.guide.isAuthenticated ? (
          <ul>
            <li>
              <Link to="/all-places">All Places</Link>
            </li>
            <li>
              <Link to="/my-profile">My Profile</Link>
            </li>
            <li>
              <Link
                to="3"
                onClick={() => this.props.guideLogout(this.props.history)}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : this.props.visitor.isAuthenticated &&
          this.props.admin.isAuthenticated ? (
          <ul>
            <li>
              <Link to="/all-places">All Places</Link>
            </li>

            <li>
              <Link to="/admin/action/allGuide">Guide List</Link>
            </li>
            <li>
              <Link to="/all-admin">Admin List</Link>
            </li>
            <li>
              <Link to="#">Reports</Link>
              <ul className="dropdown">
                <li>
                  <Link to="/all-places/reported-places">Places</Link>
                </li>
                <li>
                  <Link to="/all-places/reported-posts">Posts</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/my-profile">My Profile</Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => this.props.adminLogout(this.props.history)}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <uL>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </uL>
        )}
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
export default connect(mapStateToProps, {
  visitorLogout,
  guideLogout,
  adminLogout,
})(withRouter(Navbar));

{
  /* 
<nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Travelers HUt" />
            </Link>
          </div>

          {this.props.visitor.isAuthenticated &&
          this.props.guide.isAuthenticated &&
          this.props.admin.isAuthenticated ? (
            <ul className="nav-links">
              <li>
                <Link to="/all-places">All Places</Link>
              </li>

              <li>
                <Link to="/admin/action/allGuide">Guide List</Link>
              </li>
              <li>
                <Link to="/all-admin">Admin List</Link>
              </li>

              <li>
                <Link to="/all-places/reported-places">Reported Places</Link>
              </li>
              <li>
                <Link to="/all-places/reported-posts">Reported Posts</Link>
              </li>
              <li>
                <Link to="/my-profile">My Profile</Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => this.props.adminLogout(this.props.history)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : this.props.visitor.isAuthenticated &&
            this.props.guide.isAuthenticated &&
            !this.props.admin.isAuthenticated ? (
            <ul className="nav-links">
              <li>
                <Link to="/all-places">All Places</Link>
              </li>
              <li>
                <Link to="/admin/login">Login As Admin</Link>
              </li>
              <li>
                <Link to="/my-profile">My Profile</Link>
              </li>
              <li>
                <Link
                  to="3"
                  onClick={() => this.props.guideLogout(this.props.history)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : this.props.visitor.isAuthenticated &&
            !this.props.guide.isAuthenticated &&
            !this.props.admin.isAuthenticated ? (
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
                <Link
                  to="#"
                  onClick={() => this.props.visitorLogout(this.props.history)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-links" style={{ "margin-left": "870px" }}>
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
*/
}
