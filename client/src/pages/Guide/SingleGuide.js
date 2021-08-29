import React, { Component } from "react";
import { connect } from "react-redux";
import { getAGuide } from "../../store/actions/guideAction";
import UserInfo from "../../component/User/UserInfo";
import { IoPersonRemove } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { deleteGuide } from "../../store/actions/guideAction";
import { register } from "../../store/actions/adminAction";
import Loading from "../../component/Loading";
class SingleGuide extends Component {
  componentDidMount() {
    let { userID } = this.props.location.state;
    this.props.getAGuide(userID);
  }
  render() {
    let { guide } = this.props.guide;
    return (
      <>
        {guide ? (
          <UserInfo
            profile="Guide Profile"
            profilePhoto={guide.profilePhoto}
            name={guide.name}
            email={guide.email}
            mobileNumber={guide.mobileNumber}
            contribution={guide.contribution}
          />
        ) : (
          (this.props.getAGuide(this.props.location.state.userID),
          (<Loading />))
        )}
        {guide && this.props.admin.isAuthenticated ? (
          <div className="container">
            <button
              className="d-block btn btn-danger container w-50 my-2"
              onClick={() =>
                this.props.deleteGuide(guide._id, this.props.history)
              }
            >
              Remove <IoPersonRemove size={25} className="pb-1" />
            </button>
            <button
              className="d-block btn btn-success container w-50 my-2"
              onClick={() =>
                this.props.register(
                  {
                    name: guide.name,
                    email: guide.email,
                    mobileNumber: guide.mobileNumber,
                    password: guide.password,
                    profilePhoto: guide.profilePhoto,
                    nid: guide.nid,
                  },
                  this.props.history
                )
              }
            >
              Promote <RiAdminFill size={25} className="pb-1" />
            </button>
          </div>
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
export default connect(mapStateToProps, { getAGuide, deleteGuide, register })(
  SingleGuide
);
