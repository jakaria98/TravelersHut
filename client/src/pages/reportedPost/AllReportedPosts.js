import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllReportedPost } from "../../store/actions/reportedPostAction";
import PostCard from "../../component/post/PostCard";
import Loading from "../../component/utils/Loading";
class AllReportedPosts extends Component {
  componentDidMount() {
    this.props.getAllReportedPost();
  }
  render() {
    let { reportedPost } = this.props;
    return (
      <>
        <div style={{marginTop:"120px"}}>
          {reportedPost.length ? (
            reportedPost.map((post) => (
              <PostCard
                coverPhoto={post.coverPhoto}
                pathLink="/all-places/reported-posts"
                _id={post._id}
                createdAt={post.createdAt}
                key={post._id}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
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
