import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGuide } from "../../store/actions/guideAction";
import UserCard from "../../component/User/UserCard";
import Loading from "../../component/Loading";
class AllGuide extends Component {
  componentDidMount() {
    this.props.loadGuide();
  }
  render() {
    let { guide } = this.props.guide;
    return (
      <>
        <div className="info">
          <h1 className="placeName">All Guides</h1>
        </div>
        {guide.length > 0
          ? guide.map((gd) => (
              <UserCard
                profilePhoto={gd.profilePhoto}
                _id={gd._id}
                name={gd.name}
                linkPath="/admin/action/guide"
                key={gd._id}
              />
            ))
          : (this.props.loadGuide(), (<Loading />))}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { loadGuide })(AllGuide);
