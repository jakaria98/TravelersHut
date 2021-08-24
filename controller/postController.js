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
    let { division, district, upazila, minimumCost, residence, details } =
      req.body;
    let { placeID } = req.params;
    let validate = postValidator({
      division,
      district,
      upazila,
      minimumCost,
      details,
    });
    // console.log(Object.keys(req.files).length);
    if (!validate.isValid) {
      if (!req.files) {
        validate.error.coverPhoto = "Please Select A Cover Photo";
        validate.error.detailsPhoto = "Please Select Some Additional Photos";
      } else if (Object.keys(req.files).length === 1) {
        if (req.files.coverPhoto) {
          validate.error.detailsPhoto = "Please Select Some Additional Photos";
        } else {
          validate.error.coverPhoto = "Please Select A Cover Photo";
        }
      }
      return badRequest(res, validate.error);
    }
    let error = {};
    if (!req.files) {
      error.coverPhoto = "Please Select A Cover Photo";
      error.detailsPhoto = "Please Select Some Additional Photos";
      return badRequest(res, error);
    } else if (Object.keys(req.files).length === 1) {
      if (req.files.coverPhoto) {
        error.detailsPhoto = "Please Select Some Additional Photos";
      } else {
        error.coverPhoto = "Please Select A Cover Photo";
      }
      return badRequest(res, error);
    }
    let { detailsPhoto, coverPhoto } = req.files;
    let cover_photo = coverPhoto.name;
    let details_photo = [];
    detailsPhoto.map((photo) => {
      details_photo.push(photo.name);
    });
    coverPhoto.mv(
      `${__dirname.replace("controller", "")}images/${cover_photo}`,
      (err) => {
        if (err) return serverError(res, err);
      }
    );
    for (let i = 0; i < detailsPhoto.length; i++) {
      let photo = detailsPhoto[i];
      photo.mv(
        `${__dirname.replace("controller", "")}images/${details_photo[i]}`,
        (err) => {
          if (err) return serverError(res, err);
        }
      );
    }
    let post = new Posts({
      division,
      district,
      upazila,
      minimumCost,
      residence,
      coverPhoto: cover_photo,
      detailsPhoto: details_photo,
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
        if (post) {
          console.log(post);
          let reported_post = new ReportedPost({
            division: post.division,
            district: post.district,
            upazila: post.upazila,
            minimumCost: post.minimumCost,
            coverPhoto: post.coverPhoto,
            detailsPhoto: post.detailsPhoto,
            details: post.details,
            createdAt: post.createdAt,
            postID,
            reportProblem,
          });
          reported_post
            .save()
            .then((report) => everythingOk(res, report))
            .catch((error) => serverError(res, error));
        } else {
          notFound(res, "no post found");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
