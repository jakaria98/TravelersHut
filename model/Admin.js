const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
  nid: [String],
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
