const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = new Schema({
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
  minimumCost: {
    type: Number,
    required: true,
  },
  residence: Boolean,
  coverPhoto: [String],
  detailsPhoto: [String],
  details: {
    type: String,
    required: true,
  },
  createdAt: Date,
  postID: String,
  reportProblem: {
    type: String,
    required: true,
  },
});

const ReportedPost = mongoose.model("ReportedPosts", report);
module.exports = ReportedPost;
