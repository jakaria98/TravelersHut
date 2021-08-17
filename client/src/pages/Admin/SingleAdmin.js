import React, { Component } from "react";
import { connect } from "react-redux";
import UserInfo from "../../component/User/UserInfo";
import { singleAdmin } from "../../store/actions/adminAction";
class SingleAdmin extends Component {
  componentDidMount() {
    let { userID } = this.props.location.state;
    this.props.singleAdmin(userID);
  }
  render() {
    let { admin } = this.props.admin;
    console.log(this.props);
    return (
      <>
        {admin ? (
          <UserInfo
            profilePhoto={admin.profilePhoto}
            name={admin.name}
            email={admin.email}
            mobileNumber={admin.mobileNumber}
          />
        ) : (
          this.props.singleAdmin(this.props.location.state.userID)
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};
export default connect(mapStateToProps, { singleAdmin })(SingleAdmin);
