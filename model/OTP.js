const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: Number,
});
const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
