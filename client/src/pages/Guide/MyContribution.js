import React, { Component } from "react";
import { connect } from "react-redux";

import { myContribution } from "../../store/actions/placeAction";

class MyContribution extends Component {
  componentDidMount() {
    this.props.myContribution(this.props.guide.guide._id);
  }
  render() {
    console.log(this.props);
    return (
      <>
        <div className="mt-4"></div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    place: state.place,
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { myContribution })(MyContribution);
