import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePlace, ratePlace } from "../../store/actions/placeAction";
import PlaceInfo from "../../component/place/PlaceInfo";
import { loadPost } from "../../store/actions/postAction";
import PostCard from "../../component/post/PostCard";
import CreatePost from "../../component/post/CreatePost";
import { FaStar, FaRegStar, FaUser, FaCheckCircle } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { VscReport } from "react-icons/vsc";

class SinglePlace extends Component {
  state = {
    createModalOpen: false,
    placeID: "",
    rating: 0,
    previousRating: 0,
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

  ratingChange = (event) => {
    this.setState({
      rating: event.target.value,
      previousRating: 0,
    });
  };

  ratingSubmit = (e) => {
    e.preventDefault();
    this.props.ratePlace(this.state.placeID, this.state);
  };
  pushStar = (num1, num2) => {
    let elements = [];
    for (let i = 0; i < num1; i++) elements.push(<FaStar />);
    for (let i = 0; i < num2; i++) elements.push(<FaRegStar />);
    return elements;
  };

  postFilter = (post) => {
    post.filter((pst) => pst.place == this.state.placeId);
  };
  personFilter = (obj, id) => {
    obj.filter((info) => {
      if (info.critics === id) return info.ratings;
      return 0;
    });
  };

  render() {
    let { place, post, visitor } = this.props;
    visitor = visitor.visitor;
    let { rating, previousRating, error } = this.state;
    let averageRating = 0;
    let remainingRating = 5;
    // let previousRating = 0;
    let ratedPerson;
    return (
      <>
        {place.length <= 0 ? (
          <h1>Loading</h1>
        ) : (
          <PlaceInfo
            coverPhoto={place.coverPhoto}
            name={place.name}
            division={place.division}
            district={place.district}
            upazila={place.upazila}
            createdAt={place.upazila}
            detailsPhoto={place.detailsPhoto}
          />
        )}
        {
          (place.length <= 0 ? (
            <h1>Load</h1>
          ) : place.ratedBy ? (
            place.ratedBy.length > 0 ? (
              ((ratedPerson = place.ratedBy.filter(
                (info) => info.critics === visitor._id
              )),
              ((averageRating = Math.round(
                place.ratingCount / place.ratedBy.length
              )),
              (remainingRating =
                5 - Math.round(place.ratingCount / place.ratedBy.length))))
            ) : null
          ) : null,
          ratedPerson ? (previousRating = ratedPerson[0].ratings) : null,
          previousRating && rating == 0 ? (rating = previousRating) : null)
        }
        <div className="display-center mt-4 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="well well-sm">
                  <div className="row">
                    <div className="col-xs-12 col-md-6 text-center mt-5">
                      <h1 className="rating-num">
                        {!place.ratedBy
                          ? 0
                          : place.ratedBy.length > 0
                          ? Math.round(place.ratingCount / place.ratedBy.length)
                          : 0}
                      </h1>
                      <div className="rating">
                        {place.ratedBy
                          ? this.pushStar(averageRating, remainingRating)
                          : this.pushStar(averageRating, remainingRating)}
                      </div>
                      <div>
                        <FaUser className="mx-1 mb-1" />
                        {place.ratedBy ? place.ratedBy.length : 0} total
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h6 className="mt-4 mb-2 mx-5">
                        Rate The Place <FcRating size="20px" />
                      </h6>
                      <div className="row rating-desc">
                        <div className="col-xs-3 col-md-3 text-right">
                          <label>
                            <div className="rating-box">
                              <FaStar
                                className="mt-1"
                                color={rating >= 5 ? "#ffc107" : "#cfcfcf"}
                              />
                              <div className="rating-number">5</div>
                            </div>
                            <input
                              type="radio"
                              name="rating"
                              value={5}
                              className="d-none"
                              onClick={
                                this.props.visitor.isAuthenticated &&
                                !this.props.guide.isAuthenticated &&
                                !this.props.admin.isAuthenticated
                                  ? this.ratingChange
                                  : null
                              }
                            />
                          </label>
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
                          <label>
                            <div className="rating-box">
                              <FaStar
                                className="mt-1"
                                color={rating >= 4 ? "#ffc107" : "#cfcfcf"}
                              />
                              <div className="rating-number">4</div>
                            </div>
                            <input
                              type="radio"
                              name="rating"
                              value={4}
                              className="d-none"
                              onClick={
                                this.props.visitor.isAuthenticated &&
                                !this.props.guide.isAuthenticated &&
                                !this.props.admin.isAuthenticated
                                  ? this.ratingChange
                                  : null
                              }
                            />
                          </label>
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
                          <label>
                            <div className="rating-box">
                              <FaStar
                                className="mt-1"
                                color={rating >= 3 ? "#ffc107" : "#cfcfcf"}
                              />
                              <div className="rating-number">3</div>
                            </div>
                            <input
                              type="radio"
                              name="rating"
                              value={3}
                              className="d-none"
                              onClick={
                                this.props.visitor.isAuthenticated &&
                                !this.props.guide.isAuthenticated &&
                                !this.props.admin.isAuthenticated
                                  ? this.ratingChange
                                  : null
                              }
                            />
                          </label>
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
                          <label>
                            <div className="rating-box">
                              <FaStar
                                className="mt-1"
                                color={rating >= 2 ? "#ffc107" : "#cfcfcf"}
                              />
                              <div className="rating-number">2</div>
                            </div>
                            <input
                              type="radio"
                              name="rating"
                              value={2}
                              className="d-none"
                              onClick={
                                this.props.visitor.isAuthenticated &&
                                !this.props.guide.isAuthenticated &&
                                !this.props.admin.isAuthenticated
                                  ? this.ratingChange
                                  : null
                              }
                            />
                          </label>
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
                          <label>
                            <div className="rating-box">
                              <FaStar
                                className="mt-1"
                                color={rating >= 1 ? "#ffc107" : "#cfcfcf"}
                              />
                              <div className="rating-number">1</div>
                            </div>
                            <input
                              type="radio"
                              name="rating"
                              value={1}
                              className="d-none"
                              onClick={
                                this.props.visitor.isAuthenticated &&
                                !this.props.guide.isAuthenticated &&
                                !this.props.admin.isAuthenticated
                                  ? this.ratingChange
                                  : null
                              }
                            />
                          </label>
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

                    <button
                      className="btn btn-success mt-2"
                      onClick={
                        this.props.visitor.isAuthenticated &&
                        !this.props.guide.isAuthenticated &&
                        !this.props.admin.isAuthenticated
                          ? this.ratingSubmit
                          : null
                      }
                    >
                      Submit <FaCheckCircle size={20} />
                    </button>
                    {this.props.visitor.isAuthenticated ||
                    this.props.guide.isAuthenticated ? (
                      <button className="btn btn-danger d-block center container mt-2">
                        Report <VscReport size={20} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.props.visitor.isAuthenticated ? (
          <button
            className="btn btn-primary d-block center container my-4"
            onClick={this.openCreateModal}
          >
            Add A Review
          </button>
        ) : (
          ""
        )}
        <div className="info">
          <h1 className="placeName">
            {post.length ? "All Reviews" : "No Reviews"}
          </h1>
        </div>
        {post.length ? post.map((post, i) => <PostCard post={post} />) : ""}
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
    admin: state.admin,
    visitor: state.visitor,
  };
};
export default connect(mapStateToProps, {
  getSinglePlace,
  loadPost,
  ratePlace,
})(SinglePlace);
