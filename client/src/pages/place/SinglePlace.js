import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePlace } from "../../store/actions/placeAction";
import PlaceInfo from "../../component/place/PlaceInfo";
import { loadPost } from "../../store/actions/postAction";
import PostCard from "../../component/post/PostCard";
import CreatePost from "../../component/post/CreatePost";

class SinglePlace extends Component {
  state = {
    createModalOpen: false,
    placeID: "",
  };
  openCreateModal = () => {
    this.setState({
      createModalOpen: true,
    });
  };
  closeCreateModal = () => {
    this.setState({
      createModalOpen: false,
    });
  };
  componentDidMount() {
    const { keyVal } = this.props.location.state;
    
    this.setState({
      placeID: keyVal,
    });
    this.props.getSinglePlace(keyVal);
    this.props.loadPost(keyVal);
  }

  postFilter = (post) => {
    post.filter((pst) => pst.place == this.state.placeId);
  };
  render() {
    let { place, post } = this.props;
    //  post = this.postFilter(post);
    return (
      <>
        {place.length <= 0 ? <h1>Loading</h1> : <PlaceInfo place={place} />}
        {this.props.guide.isAuthenticated ? (
          <button
            className="btn btn-primary d-block center container my-4"
            onClick={this.openCreateModal}
          >
            Add A Post
          </button>
        ) : (
          ""
        )}
        <div className="info">
          <h1 className="placeName">All Posts</h1>
        </div>
        {post.length == null ? (
          <div className="info">
            <h1 className="placeName">Loading</h1>
          </div>
        ) : (
          post.map((post, i) => <PostCard post={post} />)
        )}
        <CreatePost
          isOpen={this.state.createModalOpen}
          close={this.closeCreateModal}
          placeID={this.state.placeID}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    place: state.place,
    post: state.post,
    guide: state.guide,
  };
};
export default connect(mapStateToProps, { getSinglePlace, loadPost })(
  SinglePlace
);
