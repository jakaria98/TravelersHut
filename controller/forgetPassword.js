const {
  badRequest,
  serverError,
  notFound,
  createdSuccessfully,
  everythingOk,
} = require("../utils/error");
const Guide = require("../model/Guide");
const Admin = require("../model/Admin");
const Visitor = require("../model/Visitor");
const OTP = require("../model/OTP");

module.exports = {
  resetRequest(req, res) {
    let { email, userType } = req.body;
    let randomNum = Math.floor(Math.random() * 10000 + 1);
    OTP.findOne({ email: email })
      .then((user) => {
        if (user) {
          user.otp = randomNum;
          OTP.findByIdAndUpdate(user._id, { $set: user }, { new: true })
            .then((updatedUser) => {
              return everythingOk(res, updatedUser);
            })
            .catch((error) => serverError(res, error));
        } else {
          let user = {};
          user.email = email;
          user.otp = randomNum;
          if (userType === "visitor") {
            Visitor.findOne({ email: email })
              .then((profile) => {
                if (!profile) {
                  error = {};
                  error.email = "User Not Found";
                  return badRequest(res, error);
                } else {
                  let newOTP = new OTP({
                    email: user.email,
                    otp: user.otp,
                  });
                  newOTP
                    .save()
                    .then((code) => everythingOk(res, code))
                    .catch((error) => serverError(res, error));
                }
              })
              .catch((error) => serverError(res, error));
          }
          if (userType === "guide") {
            Guide.findOne({ email: email })
              .then((profile) => {
                if (!profile) {
                  error = {};
                  error.email = "User Not Found";
                  return badRequest(res, error);
                } else {
                  let newOTP = new OTP({
                    email: user.email,
                    otp: user.otp,
                  });
                  newOTP
                    .save()
                    .then((code) => everythingOk(res, code))
                    .catch((error) => serverError(res, error));
                }
              })
              .catch((error) => serverError(res, error));
          }
          if (userType === "admin") {
            Admin.findOne({ email: email })
              .then((profile) => {
                if (!profile) {
                  error = {};
                  error.email = "User Not Found";
                  return badRequest(res, error);
                } else {
                  let newOTP = new OTP({
                    email: user.email,
                    otp: user.otp,
                  });
                  newOTP
                    .save()
                    .then((code) => everythingOk(res, code))
                    .catch((error) => serverError(res, error));
                }
              })
              .catch((error) => serverError(res, error));
          }
        }
      })
      .catch((error) => serverError(res, error));
  },
  reset(req, res) {},
};
