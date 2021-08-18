import React, { Component } from "react";
import { connect } from "react-redux";
import UserInfo from "../../component/User/UserInfo";
import { singleAdmin } from "../../store/actions/adminAction";
import Loading from "../../component/Loading";
class SingleAdmin extends Component {
  componentDidMount() {
    let { userID } = this.props.location.state;
    this.props.singleAdmin(userID);
  }
  render() {
    let { admin } = this.props.admin;
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
          (this.props.singleAdmin(this.props.location.state.userID),
          (<Loading />))
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
