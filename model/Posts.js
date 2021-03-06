const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
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
  place: {
    type: Schema.Types.ObjectId,
    ref: "Places",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
