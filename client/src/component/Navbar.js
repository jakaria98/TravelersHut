import React, { Component } from "react";
import logo from "../Travelers Hut.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaBars, FaUserPlus, FaUsers, FaUserShield } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiFillBug, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { visitorLogout } from "../store/actions/visitorAction";
import { guideLogout } from "../store/actions/guideAction";
import { adminLogout } from "../store/actions/adminAction";
class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Travelers Hut" />
          </Link>
        </div>
        <label htmlFor="drop" className="check-btn">
          <FaBars />
        </label>
        <input type="checkbox" id="drop" />
        {this.props.admin.isAuthenticated &&
        this.props.visitor.isAuthenticated ? (
          <ul className="menu">
            <li>
              <Link to="/all-places">
                All Places
                <GoLocation size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link to="/admin/action/allGuide">
                Guide List
                <FaUsers size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link to="/all-admin">
                Admin List
                <FaUserShield size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <label htmlFor="drop-1" class="toggle">
                Reports
                <AiFillBug size={25} className="mx-1" />
              </label>
              <Link to="#">
                Reports
                <AiFillBug size={25} className="mx-1" />
              </Link>
              <input type="checkbox" id="drop-1" />
              <ul>
                <li>
                  <Link to="/all-places/reported-places">
                    Places
                    <AiFillBug size={25} className="mx-1" />
                  </Link>
                </li>
                <li>
                  <Link to="/all-places/reported-posts">
                    Posts
                    <AiFillBug size={25} className="mx-1" />
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/my-profile">
                My Profile
                <CgProfile size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => this.props.adminLogout(this.props.history)}
              >
                Logout
                <AiOutlineLogout size={25} className="mx-1" />
              </Link>
            </li>
          </ul>
        ) : this.props.guide.isAuthenticated &&
          this.props.visitor.isAuthenticated ? (
          <ul className="menu">
            <li>
              <Link to="/all-places">
                All Places
                <GoLocation size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link to="/my-profile">
                My Profile
                <CgProfile size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => this.props.guideLogout(this.props.history)}
              >
                Logout
                <AiOutlineLogout size={25} className="mx-1" />
              </Link>
            </li>
          </ul>
        ) : this.props.visitor.isAuthenticated &&
          !this.props.admin.isAuthenticated &&
          !this.props.guide.isAuthenticated ? (
          <ul className="menu">
            <li>
              <Link to="/all-places">
                All Places
                <GoLocation size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link to="/guide/login">
                Login as Guide
                <AiOutlineLogin size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link to="/guide/register">
                Register as Guide
                <FaUserPlus size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link to="/admin/login">
                Login as Admin
                <AiOutlineLogin size={25} className="mx-1" />
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => this.props.visitorLogout(this.props.history)}
              >
                Logout
                <AiOutlineLogout size={25} className="mx-1" />
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="menu">
            <li>
              <Link to="/login">
                Login
                <AiOutlineLogin size={25} className="mx-1" />
              </Link>
            </li>

            <li>
              <Link to="/register">
                Register
                <FaUserPlus size={25} className="mx-1" />
              </Link>
            </li>
          </ul>
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
  <nav>
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Travelers HUt" />
          </Link>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="check-btn">
          <FaBars />
        </label>
        {this.props.visitor.isAuthenticated &&
        !this.props.guide.isAuthenticated &&
        !this.props.admin.isAuthenticated ? (
          <ul>
            <li>
              <Link to="/all-places">All Places <GoLocation size={25} className="mx-1" /></Link>
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
  */
}
