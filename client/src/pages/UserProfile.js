import React, { Component } from "react";
import UserInfo from "../component/User/UserInfo";
import { connect } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import UserEdit from "../component/User/UserEdit";

class UserProfile extends Component {
  state = {
    clicked: false,
  };

  render() {
    let { admin } = this.props.admin;
    let { guide } = this.props.guide;
    let user;
    if (!this.state.clicked) {
      this.props.admin.error = {};
      this.props.guide.error = {};
    }

    return (
      <>
        {this.props.admin.isAuthenticated
          ? ((user = admin),
            (
              <div className="mt-5">
                <UserInfo
                  name={admin.name}
                  email={admin.email}
                  mobileNumber={admin.mobileNumber}
                />
              </div>
            ))
          : ((user = guide),
            (
              <div className="mt-5">
                <UserInfo
                  name={guide.name}
                  email={guide.email}
                  mobileNumber={guide.mobileNumber}
                  contribution={guide.contribution}
                />
              </div>
            ))}
        <div className="container">
          <button
            className="container d-block btn btn-info w-50"
            onClick={() => this.setState({ clicked: !this.state.clicked })}
          >
            Edit Profile <FaUserEdit size={25} className="pb-1" />
          </button>
        </div>
        {this.state.clicked ? (
          <UserEdit name={user.name} email={user.email} />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guide: state.guide,
    admin: state.admin,
  };
};
export default connect(mapStateToProps)(UserProfile);
