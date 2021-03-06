import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getSinglePlace,
  ratePlace,
  removePlace,
} from "../../store/actions/placeAction";
import PlaceInfo from "../../component/place/PlaceInfo";
import { loadPost } from "../../store/actions/postAction";
import PostCard from "../../component/post/PostCard";
import CreatePost from "../../component/post/CreatePost";
import Loading from "../../component/utils/Loading";
import Dataset from "../../utils/Data";
import { GrMapLocation } from "react-icons/gr";
import { ImLocation, ImLocation2 } from "react-icons/im";
import {
  FaStar,
  FaRegStar,
  FaUser,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { MdRateReview } from "react-icons/md";
import { VscReport } from "react-icons/vsc";
import Report from "../../component/place/Report";
import { GrUpdate } from "react-icons/gr";

class SinglePlace extends Component {
  state = {
    createModalOpen: false,
    reportModalOpen: false,
    placeID: "",
    rating: 0,

    division: "all",
    district: "all",
    upazila: "all",
  };
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "division") {
      this.setState({ district: "all", upazila: "all" });
    } else if (event.target.name === "district") {
      this.setState({ upazila: "all" });
    }
  };

  getDivision = (division) => {
    division = Dataset.division.filter((dvs) => dvs.name === division);
    return division;
  };

  getDistrict = (district, division) => {
    district = division[0].district.filter((dis) => dis.name === district);
    return district;
  };

  postFilter = (post) => {
    if (this.state.division !== "all") {
      post = post.filter((plc) => plc.division === this.state.division);
    }
    if (this.state.district !== "all") {
      post = post.filter((plc) => plc.district === this.state.district);
    }
    if (this.state.upazila !== "all") {
      post = post.filter((plc) => plc.upazila === this.state.upazila);
    }
    return post;
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
    this.props.loadPost(this.state.placeID);
  };

  openReportModal = () => {
    this.setState({
      reportModalOpen: true,
    });
  };
  closeReportModal = () => {
    this.setState({
      reportModalOpen: false,
    });
    this.props.loadPost(this.state.placeID);
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

  personFilter = (obj, id) => {
    let x = 0;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].critics === id) {
        x = obj[i].ratings;
        i = obj.length + 1;
      }
    }
    return x;
  };

  render() {
    console.log(this.props);
    let { place, post, visitor } = this.props;
    post = this.postFilter(post);
    visitor = visitor.visitor;
    let { rating, placeID, division, district,upazila } = this.state;
    let averageRating = 0;
    let remainingRating = 5;
    let previousRating = 0;
    let divisionObject, districtObject;
    if (division !== "all") divisionObject = this.getDivision(division);
    if (district !== "all")
      districtObject = this.getDistrict(district, divisionObject);
    return (
      <>
        {place.length <= 0 ? (
          (this.props.getSinglePlace(placeID),
          this.props.loadPost(placeID),
          (<Loading />))
        ) : (
          <div style={{ marginTop: "109px" }}>
            <PlaceInfo
              coverPhoto={place.coverPhoto}
              name={place.name}
              division={place.division}
              district={place.district}
              upazila={place.upazila}
              createdAt={place.createdAt}
              detailsPhoto={place.detailsPhoto}
              report=""
            />
          </div>
        )}
        {!place
          ? ((<Loading />), this.props.getSinglePlace(placeID))
          : place.ratedBy
          ? place.ratedBy.length > 0
            ? ((remainingRating -= Math.round(
                place.ratingCount / place.ratedBy.length
              )),
              ((previousRating = this.personFilter(place.ratedBy, visitor._id)),
              ((averageRating = Math.round(
                place.ratingCount / place.ratedBy.length
              )),
              previousRating && rating === 0
                ? this.setState({ rating: previousRating })
                : null)))
            : null
          : null}

        <div className=" mt-4 mb-4">
          <div className="container">
            <div className="row d-flex justify-content-center">
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
                                color={rating >= 5 ? "#33ccff" : "#cfcfcf"}
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
                                color={rating >= 4 ? "#33ccff" : "#cfcfcf"}
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
                                color={rating >= 3 ? "#33ccff" : "#cfcfcf"}
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
                                color={rating >= 2 ? "#33ccff" : "#cfcfcf"}
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
                                color={rating >= 1 ? "#33ccff" : "#cfcfcf"}
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
                      <button
                        className="btn btn-warning d-block container mt-2"
                        onClick={this.openReportModal}
                      >
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

        <button
          className="btn btn-primary d-block container mt-2 w-75 mb-2"
          onClick={this.openCreateModal}
        >
          Add A Review <MdRateReview size={22} />
        </button>
        {this.props.guide.guide._id === place.creatorGuide &&
        this.props.guide.isAuthenticated ? (
          <Link
            to={{
              pathname: "/update-place",
              state: {
                placeID: place._id,
                name: place.name,
              },
            }}
            className="btn btn-primary d-block container mt-2 w-75 mb-2"
          >
            Update <GrUpdate size={22} className="pb-1" />
          </Link>
        ) : (
          ""
        )}
        {this.props.admin.isAuthenticated ? (
          <button
            className="container btn btn-danger  w-75 d-block  mb-4"
            onClick={() =>
              this.props.removePlace(place._id, this.props.history)
            }
          >
            Remove This Place <FaTrash size={22} className="pb-1" />
          </button>
        ) : null}
        <div className="info">
          <h1 className="placeName">
            {post.length ? "All Reviews" : "No Reviews"}
          </h1>
        </div>

        <div className="container my-3">
          <div className="div text-center">
            <h1 className="display-4" style={{ margin: "5px" }}>
              Search For A Review
            </h1>
            <div />
          </div>
          <form className="filter-form">
            <div className="form-group">
              <div className="d-flex">
                <GrMapLocation size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="division">Your Division:</label>
                  <select
                    className="form-control"
                    name="division"
                    id="division"
                    onChange={this.changeHandler}
                    value={division}
                  >
                    <option value="all">All</option>
                    {Dataset.division.map((div, i) => (
                      <option key={i} value={div.name}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <ImLocation size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="district">Your District:</label>
                  <select
                    className="form-control"
                    name="district"
                    value={district}
                    id="district"
                    onChange={this.changeHandler}
                  >
                    <option value="all">All</option>
                    {divisionObject
                      ? divisionObject[0].district.map((dis, i) => (
                          <option key={i} value={dis.name}>
                            {dis.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex">
                <ImLocation2 size={70} className="pt-4" />
                <div className="container">
                  <label htmlFor="upazila">Your Upazila:</label>
                  <select
                    className="form-control"
                    name="upazila"
                    id="upazila"
                    value={upazila}
                    onChange={this.changeHandler}
                  >
                    <option value="all">All</option>
                    {districtObject
                      ? districtObject[0].upazila.map((upz, i) => (
                          <option key={i} value={upz}>
                            {upz}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        {post.length
          ? post.map((post, i) => (
              <PostCard
                coverPhoto={post.coverPhoto}
                pathLink="/blog"
                _id={post._id}
                createdAt={post.createdAt}
                key={i}
              />
            ))
          : null}
        <CreatePost
          isOpen={this.state.createModalOpen}
          close={this.closeCreateModal}
          placeID={placeID}
        />
        <Report
          isOpen={this.state.reportModalOpen}
          close={this.closeReportModal}
          placeID={placeID}
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
  removePlace,
})(withRouter(SinglePlace));
