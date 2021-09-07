import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGuide } from "../../store/actions/guideAction";
import UserCard from "../../component/User/UserCard";
import Loading from "../../component/utils/Loading";
class AllGuide extends Component {
  componentDidMount() {
    this.props.loadGuide();
  }
  render() {
    let { guide } = this.props.guide;
    return (
      <div style={{ marginTop: "120px" }}>
        <div className="div text-center">
          <h1 className="display-4" style={{ margin: "5px" }}>
            Guide Panel
          </h1>
          <div />
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { loadGuide })(AllGuide);
