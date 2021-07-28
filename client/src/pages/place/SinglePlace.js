import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePlace } from "../../store/actions/placeAction";
import PlaceInfo from "../../component/place/PlaceInfo";
import { loadPost } from "../../store/actions/postAction";
import PostCard from "../../component/post/PostCard";
import CreatePost from "../../component/post/CreatePost";
import { FaStar, FaRegStar, FaUser } from "react-icons/fa";

class SinglePlace extends Component {
  state = {
    createModalOpen: false,
    placeID: "",
    rating: 0,
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

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  postFilter = (post) => {
    post.filter((pst) => pst.place == this.state.placeId);
  };
  render() {
    let { place, post } = this.props;
    let { rating } = this.state;
    //  post = this.postFilter(post);
    return (
      <>
        {place.length <= 0 ? <h1>Loading</h1> : <PlaceInfo place={place} />}
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="well well-sm">
                <div className="row">
                  <div className="col-xs-12 col-md-6 text-center">
                    <h1 className="rating-num">4.0</h1>
                    <div className="rating">
                      <FaStar />
                      <FaRegStar />
                      <div className="rating-box">
                        <FaUser className="mt-1" />
                        <p className="rating-number">1,050,008 total</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <div className="row rating-desc">
                      <div className="col-xs-3 col-md-3 text-right">
                        <div className="rating-box">
                          <FaStar className="mt-1" />
                          <div className="rating-number">5</div>
                        </div>
                      </div>
                      <div className="col-xs-8 col-md-9">
                        <div className="progress progress-striped mt-1">
                          <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "100%" }}
                          >
                            <span className="sr-only">Excellent</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-xs-3 col-md-3 text-right">
                        <div className="rating-box">
                          <FaStar className="mt-1" />
                          <div className="rating-number">4</div>
                        </div>
                      </div>
                      <div className="col-xs-8 col-md-9">
                        <div className="progress progress-striped mt-1">
                          <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "70%" }}
                          >
                            <span className="sr-only">Good</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-xs-3 col-md-3 text-right">
                        <div className="rating-box">
                          <FaStar className="mt-1" />
                          <div className="rating-number">3</div>
                        </div>
                      </div>
                      <div className="col-xs-8 col-md-9">
                        <div className="progress progress-striped mt-1">
                          <div
                            className="progress-bar progress-bar-info"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "50%" }}
                          >
                            <span className="sr-only">Average</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-xs-3 col-md-3 text-right">
                        <div className="rating-box">
                          <FaStar className="mt-1" />
                          <div className="rating-number">2</div>
                        </div>
                      </div>
                      <div className="col-xs-8 col-md-9">
                        <div className="progress progress-striped mt-1">
                          <div
                            className="progress-bar progress-bar-warning"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "40%" }}
                          >
                            <span className="sr-only">Ordinary</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-xs-3 col-md-3 text-right">
                        <div className="rating-box">
                          <FaStar className="mt-1" />
                          <div className="rating-number">1</div>
                        </div>
                      </div>
                      <div className="col-xs-8 col-md-9">
                        <div className="progress progress-striped mt-1">
                          <div
                            className="progress-bar progress-bar-danger"
                            role="progressbar"
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "20%" }}
                          >
                            <span className="sr-only">Poor</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
