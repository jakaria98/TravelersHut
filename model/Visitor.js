const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Visitor = mongoose.model("Visitors", visitorSchema);
module.exports = Visitor;
