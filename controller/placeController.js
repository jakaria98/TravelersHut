const placeValidator = require("../validator/placeValidator");
const { badRequest, serverError, everythingOk } = require("../utils/error");
const Admin = require("../model/Admin");
const Guide = require("../model/Guide");
const Places = require("../model/Places");
module.exports = {
  createPlace(req, res) {
    let { name, division, district, upazila, coverPhoto, detailsPhoto } =
      req.body;

    let userId = req.user._id;

    let validate = placeValidator({
      name,
      division,
      district,
      upazila,
      coverPhoto,
      detailsPhoto,
    });
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }
    Guide.findOne(userId)
      .then((user) => {
        if (user) {
          let place = new Places({
            name,
            division,
            district,
            upazila,
            coverPhoto,
            detailsPhoto,
            ratedBy: 0,
            ratingCount: 0,
            creatorGuide: userId,
            posts: [],
            createdAt: new Date().toISOString(),
          });
          place
            .save()
            .then((plc) => {
              let updatedGuide = { ...req.user._doc };
              updatedGuide.contribution = updatedGuide.contribution + 1;
              updatedGuide.places.unshift(plc._id);
              Guide.findOneAndUpdate(
                updatedGuide._id,
                { $set: updatedGuide },
                { new: true }
              )
                .then((result) => {
                  res.status(201).json({
                    message: "Place Created Successfully",
                    ...plc._doc,
                    user: result,
                  });
                })
                .catch((error) => serverError(res, error));
            })
            .catch((error) => {
              serverError(res, error);
            });
        }
      })
      .catch((error) => serverError(res, error));
  },
  getAllPlaces(req, res) {
    Places.find()
      .then((places) => everythingOk(res, places))
      .catch((error) => serverError(res, error));
  },
  getSinglePlace(req, res) {
    let { _id } = req.params;
    Places.findOne(_id)
      .then((place) => {
        if (!place) {
          badRequest(res, "No Place Found");
        } else {
          everythingOk(res, place);
        }
      })
      .catch((error) => serverError(res, error));
  },
  updatePlace(req, res) {
    let { _id } = req.params;
    Places.findOneAndUpdate(_id, { $set: req.body }, { new: true });
    then((place) => {
      res.status(200).json({
        message: "Updated Successfully",
        ...place,
      });
    }).catch((error) => serverError(res, error));
  },
  deletePlace(req, res) {
    let { _id } = req.params;
    Places.findOneAndDelete(_id)
      .then((place) => everythingOk(res, place))
      .catch((error) => serverError(res, error));
  },
  ratePlace(req, res) {
    let { _id } = req.params;
    let { rating } = req.params;
    Places.findOne(_id)
      .then((place) => {
        Places.findOneAndUpdate(
          _id,
          {
            ratedBy: place.ratedBy + 1,
            ratingCount: place.ratingCount + rating,
          },
          { new: true }
        )
          .then((plc) => everythingOk(res, plc))
          .catch((err) => serverError(res, err));
      })
      .catch((error) => serverError(res, error));
  },
};
