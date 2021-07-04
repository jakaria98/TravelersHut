const Admin = require("../model/Admin");
const Guide = require("../model/Guide");
const Posts = require("../model/Posts");
const { badRequest, serverError, everythingOk } = require("../utils/error");
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

    let userId = req.user._id;
    console.log(req.params);
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
    Guide.findOne(userId)
      .then((user) => {
        if (user) {
          console.log("user found");
          let post = new Posts({
            division,
            district,
            upazila,
            minimumCost,
            residence,
            coverPhoto,
            detailsPhoto,
            ratedBy: 0,
            ratingCount: 0,
            details,
            creatorGuide: userId,
            place: placeID,
            createdAt: new Date().toISOString(),
          });
          post
            .save()
            .then((pst) => {
              console.log("post saved");
              let updatedGuide = { ...req.user._doc };
              updatedGuide.contribution = updatedGuide.contribution + 1;
              updatedGuide.posts.unshift(pst._id);
              Guide.findOneAndUpdate(
                updatedGuide._id,
                { $set: updatedGuide },
                { new: true }
              )
                .then((result) => {
                  res.status(201).json({
                    message: "Post created successfully",
                    ...pst._doc,
                    user: result,
                  });
                })
                .catch((err) => serverError(res, err));
            })
            .catch((error) => serverError(res, error));
        }
      })
      .catch((error) => serverError(res, error));
  },
  getAllPost(req, res) {
    let { placeID } = req.params;
    Posts.find({ place: placeID })
      .then((posts) => everythingOk(res, posts))
      .catch((error) => serverError(res, error));
  },
  getSinglePost(req, res) {
    let { _id } = req.params;
    Posts.findOne(_id)
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
    let { _id } = req.params;
    Posts.findOneAndDelete(_id)
      .then((post) => everythingOk(res, post))
      .catch((error) => serverError(res, error));
  },
  ratePost(req, res) {
    let { _id, rating } = req.params;
    Posts.findOne(_id)
      .then((post) => {
        Posts.findOneAndUpdate(
          _id,
          {
            ratedBy: post.ratedBy + 1,
            ratingCount: post.ratingCount + rating,
          },
          { new: true }
        )
          .then((pst) => everythingOk(res, pst))
          .catch((err) => serverError(res, err));
      })
      .catch((error) => serverError(res, error));
  },
};
