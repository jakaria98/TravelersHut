const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guideSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePhoto: [String],
  contribution: Number,
  places: {
    type: [{ type: Schema.Types.ObjectId, ref: "Places" }],
  },
  posts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
});

const Guide = mongoose.model("Guide", guideSchema);
module.exports = Guide;
