import React, { Component } from "react";
import { connect } from "react-redux";
import { getAGuide } from "../../store/actions/guideAction";
import GuideInfo from "../../component/Guide/GuideInfo";
class SingleGuide extends Component {
  componentDidMount() {
    let { guideID } = this.props.location.state;
    this.props.getAGuide(guideID);
  }
  render() {
    let { guide } = this.props.guide;
    console.log(this.props);
    return guide.length <= 0 ? <h1>Loading</h1> : <GuideInfo guide={guide} />;
  }
}
const mapStateToProps = (state) => {
  return {
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { getAGuide })(SingleGuide);
