import React, { Component } from "react";
import { connect } from "react-redux";
import PostInfo from "../../component/post/PostInfo";
import { getSinglePost } from "../../store/actions/postAction";
class SinglePost extends Component {
  componentDidMount() {
    const { postId } = this.props.location.state;
    console.log(postId);
    this.props.getSinglePost(postId);
  }
  render() {
    let { post } = this.props;
    console.log(post._id);
    return <PostInfo post={post} />;
  }
}
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { getSinglePost })(SinglePost);
