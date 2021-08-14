const Posts = require("../model/Posts");
const ReportedPost = require("../model/ReportedPost");
const {
  badRequest,
  serverError,
  everythingOk,
  notFound,
} = require("../utils/error");
const postValidator = require("../validator/postValidator");
module.exports = {
  createPost(req, res) {
    let {
      division,
      district,
      upazila,
      minimumCost,
      residence,
      coverPhoto,
      detailsPhoto,
      details,
    } = req.body;
    let { placeID } = req.params;
    let validate = postValidator({
      division,
      district,
      upazila,
      minimumCost,
      coverPhoto,
      detailsPhoto,
      details,
    });
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }
    let post = new Posts({
      division,
      district,
      upazila,
      minimumCost,
      residence,
      coverPhoto,
      detailsPhoto,
      details,
      place: placeID,
      createdAt: new Date().toISOString(),
    });
    post
      .save()
      .then((pst) => {
        return everythingOk(res, pst);
      })
      .catch((error) => serverError(res, error));
  },
  getAllPost(req, res) {
    let { placeID } = req.params;
    Posts.find({ place: placeID })
      .then((posts) => {
        return everythingOk(res, posts);
      })
      .catch((error) => serverError(res, error));
  },
  getSinglePost(req, res) {
    let { postID } = req.params;
    Posts.findById(postID)
      .then((post) => {
        if (!post) {
          return badRequest(res, "No blog found");
        } else {
          everythingOk(res, post);
        }
      })
      .catch((error) => serverError(res, error));
  },
  deletePost(req, res) {
    let { postID } = req.params;
    Posts.findOneAndDelete(postID)
      .then((post) => everythingOk(res, post))
      .catch((error) => serverError(res, error));
  },

  reportPost(req, res) {
    let { postID } = req.params;
    let { reportProblem } = req.body;
    if (!reportProblem) {
      let error = {};
      error.reportProblem = "Please Write The Issue";
      return badRequest(res, error);
    }
    Posts.findById(postID)
      .then((post) => {
        let reported_post = new ReportedPost({
          division: post.division,
          district: post.district,
          upazila: post.upazila,
          coverPhoto: post.coverPhoto,
          detailsPhoto: post.detailsPhoto,
          details: post.details,
          createdAt: post.createdAt,
          postID,
          reportedProblem,
        });
        reported_post
          .save()
          .then((report) => everythingOk(res, report))
          .catch((error) => serverError(res, error));
      })
      .catch((error) => serverError(res, error));
  },
  deleteReport(req, res) {
    let { reportID } = req.params;
    ReportedPost.findByIdAndDelete(reportID)
      .then((report) => everythingOk(res, report))
      .catch((error) => serverError(res, error));
  },
  getAllReport(req, res) {
    ReportedPost.find()
      .then((reports) => everythingOk(res, reports))
      .catch((error) => serverError(res, error));
  },
  getSingleReport(req, res) {
    let { reportID } = req.params;
    ReportedPost.findById(reportID)
      .then((report) => {
        if (report) {
          return everythingOk(res, report);
        } else {
          return notFound(res, "No Such Report");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
