const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placesSchema = new Schema({
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
  ratedBy: Number,
  ratingCount: Number,
  creatorGuide: {
    type: Schema.Types.ObjectId,
    ref: "Guide",
  },
  posts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Places = mongoose.model("Places", placesSchema);
module.exports = Places;
