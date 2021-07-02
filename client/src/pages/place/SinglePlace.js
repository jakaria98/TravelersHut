import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePlace } from "../../store/actions/placeAction";
import PlaceInfo from "../../component/place/PlaceInfo";
import { loadPost } from "../../store/actions/postAction";

class SinglePlace extends Component {
  componentDidMount() {
    const { keyVal } = this.props.location.state;

    this.props.getSinglePlace(keyVal);
    this.props.loadPost();
  }
  render() {
    let { place, post } = this.props;
    console.log(post.length);

    return place.length <= 0 ? <h1>Loading</h1> : <PlaceInfo place={place} />;
  }
}

const mapStateToProps = (state) => {
  return {
    place: state.place,
    post: state.post,
  };
};
export default connect(mapStateToProps, { getSinglePlace, loadPost })(
  SinglePlace
);
