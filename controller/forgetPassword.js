const nodemailer = require("nodemailer");
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
const hostInfo = require("./hostInfo");
const emailValidator = require("../validator/emailValidator");
const codeValidator = require("../validator/codeValidator");

module.exports = {
  resetRequest(req, res) {
    let { email, userType } = req.body;
    let validate = emailValidator(email);
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    } else {
      let user = {};
      user.email = email;
      let randomNum = Math.floor(Math.random() * 10000 + 1);
      user.otp = randomNum;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: { user: `${hostInfo.email}`, pass: `${hostInfo.password}` },
      });
      var mailOptions = {
        from: "mr.jack3497@gmail.com",
        to: `${email}`,
        subject: "Reset Password",
        text: `Yor OTP is ${randomNum}`,
        html: `<h3>Your OTP is</h3>
              <h1>${randomNum}</h1>`,
      };
      if (userType === "visitor") {
        Visitor.findOne({ email: email })
          .then((profile) => {
            if (!profile) {
              error = {};
              error.email = "User Not Found";
              return badRequest(res, error);
            } else {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return serverError(res, error);
                } else {
                  console.log("email sent");
                }
              });
              return everythingOk(res, user);
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
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return serverError(res, error);
                } else {
                  console.log("email sent");
                }
              });
              return everythingOk(res, user);
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
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return serverError(res, error);
                } else {
                  console.log("email sent");
                }
              });
              return everythingOk(res, user);
            }
          })
          .catch((error) => serverError(res, error));
      }
    }
  },

  otpSubmission(req, res) {
    let { given_otp, stored_otp } = req.body;
    console.log(req.body);
    if (!given_otp) {
      let validate = codeValidator();
      return badRequest(res, validate.error);
    } else {
      if (given_otp === String(stored_otp)) {
        let error = {};
        error.success = "Ok";
        return everythingOk(res, error);
      } else {
        let validate = codeValidator();
        return badRequest(res, validate.error);
      }
    }
  },

  resetPassword(req, res) {},

  // resetRequest(req, res) {
  //   let { email, userType } = req.body;
  //   let validate = emailValidator(email);
  //   if (!validate.isValid) {
  //     return badRequest(res, validate.error);
  //   } else {
  //     let randomNum = Math.floor(Math.random() * 10000 + 1);
  //     var transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       port: 587,
  //       secure: false,
  //       auth: { user: `${hostInfo.email}`, pass: `${hostInfo.password}` },
  //     });
  //     var mailOptions = {
  //       from: "mr.jack3497@gmail.com",
  //       to: `${email}`,
  //       subject: "Reset Password",
  //       text: `Yor OTP is ${randomNum}`,
  //       html: `<h3>Your OTP is</h3>
  //             <h1>${randomNum}</h1>`,
  //     };
  //     OTP.findOne({ email: email })
  //       .then((user) => {
  //         if (user) {
  //           user.otp = randomNum;
  //           OTP.findByIdAndUpdate(user._id, { $set: user }, { new: true })
  //             .then((updatedUser) => {
  //               transporter.sendMail(mailOptions, (error, info) => {
  //                 if (error) {
  //                   return serverError(res, error);
  //                 } else {
  //                   console.log("email sent");
  //                 }
  //               });
  //               return everythingOk(res, updatedUser);
  //             })
  //             .catch((error) => serverError(res, error));
  //         } else {
  //           let user = {};
  //           user.email = email;
  //           user.otp = randomNum;
  //           if (userType === "visitor") {
  //             Visitor.findOne({ email: email })
  //               .then((profile) => {
  //                 if (!profile) {
  //                   error = {};
  //                   error.email = "User Not Found";
  //                   return badRequest(res, error);
  //                 } else {
  //                   let newOTP = new OTP({
  //                     email: user.email,
  //                     otp: user.otp,
  //                   });
  //                   newOTP
  //                     .save()
  //                     .then((code) => {
  //                       transporter.sendMail(mailOptions, (error, info) => {
  //                         if (error) {
  //                           return serverError(res, error);
  //                         } else {
  //                           console.log("email sent");
  //                         }
  //                       });
  //                       everythingOk(res, code);
  //                     })
  //                     .catch((error) => serverError(res, error));
  //                 }
  //               })
  //               .catch((error) => serverError(res, error));
  //           }
  //           if (userType === "guide") {
  //             Guide.findOne({ email: email })
  //               .then((profile) => {
  //                 if (!profile) {
  //                   error = {};
  //                   error.email = "User Not Found";
  //                   return badRequest(res, error);
  //                 } else {
  //                   let newOTP = new OTP({
  //                     email: user.email,
  //                     otp: user.otp,
  //                   });
  //                   newOTP
  //                     .save()
  //                     .then((code) => {
  //                       transporter.sendMail(mailOptions, (error, info) => {
  //                         if (error) {
  //                           return serverError(res, error);
  //                         } else {
  //                           console.log("email sent");
  //                         }
  //                       });
  //                       everythingOk(res, code);
  //                     })
  //                     .catch((error) => serverError(res, error));
  //                 }
  //               })
  //               .catch((error) => serverError(res, error));
  //           }
  //           if (userType === "admin") {
  //             Admin.findOne({ email: email })
  //               .then((profile) => {
  //                 if (!profile) {
  //                   error = {};
  //                   error.email = "User Not Found";
  //                   return badRequest(res, error);
  //                 } else {
  //                   let newOTP = new OTP({
  //                     email: user.email,
  //                     otp: user.otp,
  //                   });
  //                   newOTP
  //                     .save()
  //                     .then((code) => {
  //                       transporter.sendMail(mailOptions, (error, info) => {
  //                         if (error) {
  //                           return serverError(res, error);
  //                         } else {
  //                           console.log("email sent");
  //                         }
  //                       });
  //                       everythingOk(res, code);
  //                     })
  //                     .catch((error) => serverError(res, error));
  //                 }
  //               })
  //               .catch((error) => serverError(res, error));
  //           }
  //         }
  //       })
  //       .catch((error) => serverError(res, error));
  //   }
  // },
};
