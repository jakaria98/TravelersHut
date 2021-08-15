import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllReportedPost } from "../../store/actions/reportedPostAction";
import PostCard from "../../component/post/PostCard";

class AllReportedPosts extends Component {
  componentDidMount() {
    this.props.getAllReportedPost();
  }
  render() {
    let { reportedPost } = this.props;
    return (
      <>
        {reportedPost.length
          ? reportedPost.map((post) => (
              <PostCard
                coverPhoto={post.coverPhoto}
                pathLink="/all-places/reported-posts"
                _id={post._id}
                createdAt={post.createdAt}
                key={post._id}
              />
            ))
          : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reportedPost: state.reportedPost,
  };
};
export default connect(mapStateToProps, { getAllReportedPost })(
  AllReportedPosts
);
