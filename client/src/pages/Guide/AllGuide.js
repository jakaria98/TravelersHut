import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGuide } from "../../store/actions/guideAction";
import GuideCard from "../../component/Guide/GuideCard";
class AllGuide extends Component {
  componentDidMount() {
    this.props.loadGuide();
  }
  render() {
    let { guide } = this.props.guide;
    console.log(this.props);
    return (
      <>
        <div className="info">
          <h1 className="placeName">All Guides</h1>
        </div>
        {guide.length > 0 ? (
          guide.map((gd) => <GuideCard guide={gd} key={gd._id} />)
        ) : (
          <h1>Loading</h1>
        )}
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
