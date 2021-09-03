import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { GiCheckMark } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import {
  getSingleReportedPost,
  deleteReport,
} from "../../store/actions/reportedPostAction";

import { removePost } from "../../store/actions/postAction";
import PostInfo from "../../component/post/PostInfo";

class SingleReportedPost extends Component {
  componentDidMount() {
    const { postId } = this.props.location.state;
    this.props.getSingleReportedPost(postId);
  }
  render() {
    let { reportedPost } = this.props;
    return (
      <>
        <PostInfo
          coverPhoto={reportedPost.coverPhoto}
          detailsPhoto={reportedPost.detailsPhoto}
          residence={reportedPost.residence}
          details={reportedPost.details}
          minimumCost={reportedPost.minimumCost}
          report={reportedPost.reportProblem}
          id={reportedPost._id}
        />

        <div className="container mb-5 mt-3">
          <button
            className="btn btn-success w-100 position-relative my-1"
            onClick={() =>
              this.props.deleteReport(reportedPost._id, this.props.history)
            }
          >
            Everything OK <GiCheckMark className="pb-1" size={22} />
          </button>
          <button
            className="btn btn-danger w-100 float-left my-1"
            onClick={() => {
              this.props.removePost(reportedPost.postID);
              this.props.deleteReport(reportedPost._id, this.props.history);
            }}
          >
            Remove The Post <FaTrash size={22} className="pb-1" />
          </button>
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
export default connect(mapStateToProps, {
  deleteReport,
  removePost,
  getSingleReportedPost,
})(withRouter(SingleReportedPost));
