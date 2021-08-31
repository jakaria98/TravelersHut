import React, { Component } from "react";
import { connect } from "react-redux";

import { FaUserEdit } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";

import UserEdit from "../component/User/UserEdit";
import UserInfo from "../component/User/UserInfo";
import MyContribution from "./Guide/MyContribution";

class UserProfile extends Component {
  state = {
    infoReq: false,
    contributionReq: false,
  };

  render() {
    let { admin } = this.props.admin;
    let { guide } = this.props.guide;
    let user;
    if (!this.state.infoReq) {
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
                  profile="My Profile"
                  profilePhoto={admin.profilePhoto}
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
                  profile="My Profile"
                  profilePhoto={guide.profilePhoto}
                  name={guide.name}
                  email={guide.email}
                  mobileNumber={guide.mobileNumber}
                  contribution={guide.contribution}
                />
              </div>
            ))}
        <div className="container">
          <button
            className="container d-block btn btn-info w-75"
            onClick={() => this.setState({ infoReq: !this.state.infoReq })}
          >
            Edit Profile <FaUserEdit size={25} className="pb-1" />
          </button>
        </div>
        {this.state.infoReq ? (
          <UserEdit name={user.name} email={user.email} />
        ) : null}
        {this.props.guide.isAuthenticated ? (
          <div className="container">
            <button
              className="d-block w-75 container btn btn-info my-2"
              onClick={() =>
                this.setState({ contributionReq: !this.state.contributionReq })
              }
            >
              My Contribution <RiUserLocationFill size={25} className="pb-1" />
            </button>
          </div>
        ) : null}
        {this.state.contributionReq ? <MyContribution /> : null}
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
