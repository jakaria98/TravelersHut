const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = new Schema({
  name: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  upazila: {
    type: String,
    required: true,
  },
  coverPhoto: [String],
  detailsPhoto: [String],
  rating: Number,
  createdAt: Date,
  placeID: String,
  reportProblem: {
    type: String,
    required: true,
  },
});

const ReportedPlace = mongoose.model("ReportedPlaces", report);
module.exports = ReportedPlace;
