import React, { Component } from "react";
import { connect } from "react-redux";
import { allAdmin } from "../../store/actions/adminAction";
import UserCard from "../../component/User/UserCard";
import Loading from "../../component/Loading";
class AllAdmin extends Component {
  componentDidMount() {
    this.props.allAdmin();
  }
  render() {
    let { admin } = this.props.admin;
    return (
      <>
        <div className="info">
          <h1 className="placeName">All Admins</h1>
        </div>
        {admin.length > 0
          ? admin.map((admin) => (
              <UserCard
                profilePhoto={admin.profilePhoto}
                _id={admin._id}
                name={admin.name}
                linkPath="/all-admin/details"
                key={admin._id}
              />
            ))
          : (this.props.allAdmin(), (<Loading />))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};
export default connect(mapStateToProps, { allAdmin })(AllAdmin);
