import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGuide } from "../../store/actions/guideAction";
import GuideCard from "../../component/Guide/GuideCard";
class AllGuide extends Component {
  componentDidMount() {
    this.props.loadGuide();
  }
  render() {
    let { guide } = this.props;
    return <GuideCard guide={guide} />;
  }
}
const mapStateToProps = (state) => {
  return {
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { loadGuide })(AllGuide);
