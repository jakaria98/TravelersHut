const placeValidator = require("../validator/placeValidator");
const fileUpload = require("express-fileupload");
const {
  badRequest,
  serverError,
  everythingOk,
  notFound,
} = require("../utils/error");
const ReportedPlace = require("../model/ReportedPlace");
const Guide = require("../model/Guide");
const Places = require("../model/Places");

module.exports = {
  createPlace(req, res) {
    let { name, division, district, upazila } = req.body;

    let userId = req.user._id;

    let validate = placeValidator({
      name,
      division,
      district,
      upazila,
    });
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

    Guide.findOne(userId)
      .then((user) => {
        if (user) {
          let place = new Places({
            name,
            division,
            district,
            upazila,
            coverPhoto: cover_photo,
            detailsPhoto: details_photo,
            ratedBy: [],
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
                { _id: userId },
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
        } else {
          return notFound(res, "User not found");
        }
      })
      .catch((error) => serverError(res, error));
  },
  getAllPlaces(req, res) {
    Places.find()
      .then((places) => {
        everythingOk(res, places);
      })
      .catch((error) => serverError(res, error));
  },
  getSinglePlace(req, res) {
    let { placeID } = req.params;
    Places.findById(placeID)
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
        ...place._doc,
      });
    }).catch((error) => serverError(res, error));
  },
  deletePlace(req, res) {
    let { placeID } = req.params;
    Places.findById(placeID)
      .then((place) => {
        if (place) {
          // Places.findByIdAndDelete(placeID)
          //   .then((place) => everythingOk(res, place))
          //   .catch((error) => serverError(res, error));
          Guide.findById(place.creatorGuide)
            .then((guide) => {
              if (guide) {
                let updatedGuide = guide;
                updatedGuide.contribution -= 1;
                let index = updatedGuide.places.indexOf(place._id);
                updatedGuide.places.splice(index, 1);
                Guide.findByIdAndUpdate(
                  guide._id,
                  { $set: updatedGuide },
                  { new: true }
                )
                  .then((gd) => {
                    Places.findByIdAndDelete(placeID)
                      .then((place) => everythingOk(res, place))
                      .catch((error) => serverError(res, error));
                  })
                  .catch((error) => serverError(res, error));
              } else {
                Places.findByIdAndDelete(placeID)
                  .then((place) => everythingOk(res, place))
                  .catch((error) => serverError(res, error));
              }
            })
            .catch((error) => serverError(res, error));
        } else {
          notFound(res, "Place doesn't exist");
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },
  ratePlace(req, res) {
    let { PlaceID } = req.params;
    let { rating } = req.body;
    if (rating === 0) {
      return badRequest(res, "invalid rating");
    }
    let userId = req.user._id;
    Places.findOne({ _id: PlaceID })
      .then((place) => {
        let updatedPlace = place;
        let personNotFound = true;
        for (let i = 0; i < updatedPlace.ratedBy.length; i++) {
          if (String(userId) === String(updatedPlace.ratedBy[i].critics)) {
            personNotFound = false;
            let temp = Number(updatedPlace.ratedBy[i].ratings);
            updatedPlace.ratedBy[i].ratings = Number(rating);
            updatedPlace.ratingCount -= temp;
            updatedPlace.ratingCount += Number(rating);
            Places.findOneAndUpdate(
              { _id: PlaceID },
              { $set: updatedPlace },
              { new: true }
            )
              .then((plc) => {
                return everythingOk(res, plc);
              })
              .catch((err) => {
                return serverError(res, err);
              });
          }
        }

        if (personNotFound) {
          updatedPlace.ratedBy.push({ critics: userId, ratings: rating });
          updatedPlace.ratingCount += Number(rating);
          Places.findOneAndUpdate(
            { _id: PlaceID },
            { $set: updatedPlace },
            { new: true }
          )
            .then((plc) => everythingOk(res, plc))
            .catch((err) => serverError(res, err));
        }
      })
      .catch((error) => serverError(res, error));
  },

  reportPlace(req, res) {
    let { PlaceID } = req.params;
    let { reportProblem } = req.body;
    if (!reportProblem) {
      let error = {};
      error.reportProblem = "Please Write The Issue";
      return badRequest(res, error);
    }
    Places.findById(PlaceID)
      .then((place) => {
        let ratedNumber;
        if (place.ratingCount === 0) {
          ratedNumber = 0;
        } else {
          ratedNumber = Math.round(place.ratingCount / place.ratedBy.length);
        }

        let reported_place = new ReportedPlace({
          name: place.name,
          division: place.division,
          district: place.district,
          upazila: place.upazila,
          coverPhoto: place.coverPhoto,
          detailsPhoto: place.detailsPhoto,
          rating: ratedNumber,
          createdAt: place.createdAt,
          placeID: PlaceID,
          reportProblem,
        });
        reported_place
          .save()
          .then((plc) => {
            everythingOk(res, plc._doc);
          })
          .catch((error) => serverError(res, error));
      })
      .catch((error) => serverError(res, error));
  },
};
