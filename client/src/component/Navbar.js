import React, { Component } from "react";
import logo from "../Travelers Hut.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { visitorLogout } from "../store/actions/visitorAction";
import { guideLogout } from "../store/actions/guideAction";
import { adminLogout } from "../store/actions/adminAction";
class Navbar extends Component {
  render() {
    console.log(this.props);
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Travelers HUt" />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            dataToggle="collapse"
            dataTarget="nav-links"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
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
                <Link to="/all-places/reported-places">Reported Places</Link>
              </li>
              <li>
                <Link to="#">Reported Post</Link>
              </li>
              <li>
                <Link to="#">My Profile</Link>
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
            (console.log(
              this.props.visitor.isAuthenticated,
              this.props.guide.isAuthenticated,
              this.props.admin.isAuthenticated
            ),
            (
              <ul className="nav-links" style={{ "margin-left": "870px" }}>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            ))
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
export default connect(mapStateToProps, {
  visitorLogout,
  guideLogout,
  adminLogout,
})(withRouter(Navbar));

// {
//   this.props.visitor.isAuthenticated ? (
//     this.props.guide.isAuthenticated ? (
//       this.props.admin.isAuthenticated ? (
//         <ul className="nav-links">
//           <li>
//             <Link to="/all-places">All Places</Link>
//           </li>
//           <li>
//             <Link to="/admin/action/allGuide">Guide List</Link>
//           </li>
//           <li>
//             <Link to="/all-places" onClick={() => this.props.adminLogout()}>
//               Logout
//             </Link>
//           </li>
//         </ul>
//       ) : (
//         <ul className="nav-links">
//           <li>
//             <Link to="/all-places">All Places</Link>
//           </li>
//           <li>
//             <Link to="/admin/login">Login As Admin</Link>
//           </li>
//           <li>
//             <Link to="/all-places" onClick={() => this.props.guideLogout()}>
//               Logout
//             </Link>
//           </li>
//         </ul>
//       )
//     ) : (
//       <ul className="nav-links">
//         <li>
//           <Link to="/all-places">All Places</Link>
//         </li>
//         <li>
//           <Link to="/guide/login">Login as Guide</Link>
//         </li>
//         <li>
//           <Link to="/guide/register">Register as Guide</Link>
//         </li>
//         <li>
//           <Link to="/" onClick={() => this.props.visitorLogout()}>
//             Logout
//           </Link>
//         </li>
//       </ul>
//     )
//   ) : (
//     <ul className="nav-links nav-none-logged">
//       <li>
//         <Link to="/login">Login</Link>
//       </li>
//       <li>
//         <Link to="/register">Register</Link>
//       </li>
//     </ul>
//   );
// }
