const Admin = require("../model/Admin");
const Guide = require("../model/Guide");
const Posts = require("../model/Posts");
const { badRequest, serverError, everythingOk } = require("../utils/error");
const postValidator = require("../validator/postValidator");
module.exports = {
  createPost(req, res) {
    let { visitingFrom, minimumCost, residence, images, details } = req.body;
    let userId = req.user._id;
    let { placeId } = req.params;
    let validate = postValidator({
      visitingFrom,
      minimumCost,
      residence,
      images,
      details,
    });
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }
    Guide.findOne({ userId })
      .then((user) => {
        if (user) {
          let post = new Posts({
            visitingFrom,
            minimumCost,
            residence,
            coverPhoto,
            images,
            ratedBy: 0,
            ratingCount: 0,
            details,
            creatorGuide: userId,
            place: placeId,
            createdAt: new Date().toISOString(),
          });
          post
            .save()
            .then((pst) => {
              let updatedGuide = { ...req.user._doc };
              updatedGuide.contribution = updatedGuide.contribution + 1;
              updatedGuide.posts.unshift(plc._id);
              Guide.findByOneAndUpdate(
                updatedGuide._id,
                { $set: updatedGuide },
                { new: true }
              )
                .then((result) => {
                  res.status(201).json({
                    message: "Post created successfully",
                    ...place._doc,
                    user: result,
                  });
                })
                .catch((err) => serverError(res, err));
            })
            .catch((error) => serverError(res.error));
        }
      })
      .catch((error) => serverError(res, error));
  },
  getAllPost(req, res) {
    let { placeID } = req.body;
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
