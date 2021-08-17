const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const adminRegister = require("../validator/adminRegister");
const loginValidator = require("../validator/loginValidator");
const {
  badRequest,
  serverError,
  notFound,
  everythingOk,
} = require("../utils/error");

module.exports = {
  login(req, res) {
    let { email, password } = req.body;
    let validate = loginValidator({ email, password });

    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }

    Admin.findOne({ email })
      .then((user) => {
        if (!user) {
          return notFound(res, "Admin not found");
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return serverError(res, error);
          if (!result) {
            return badRequest(res, " Password Doesn't Match");
          }
          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              mobileNumber: user.mobileNumber,
              profilePhoto: user.profilePhoto,
              nid: user.nid,
            },
            "ADMIN",
            { expiresIn: 60 * 60 * 24 * 7 }
          );
          res.status(200).json({
            message: "Login Successful",
            token: `Bearer ${token}`,
          });
        });
      })
      .catch((error) => serverError(res, error));
  },
  register(req, res) {
    console.log(req.body);
    let { name, email, mobileNumber, password, profilePhoto, nid } = req.body;
    Admin.findOne({ email })
      .then((admin) => {
        if (admin) {
          return badRequest(res, "user already exists");
        }

        let user = new Admin({
          name,
          email,
          mobileNumber,
          password,
          profilePhoto,
          nid,
        });
        user
          .save()
          .then((user) => {
            res.status(201).json({
              message: "user saved",
              user,
            });
          })
          .catch((error) => {
            serverError(res, error);
          });
      })
      .catch((error) => {
        serverError(res, error);
      });
  },
  allAdmin(req, res) {
    Admin.find()
      .then((users) => everythingOk(res, users))
      .catch((error) => serverError(res, error));
  },
  singleAdmin(req, res) {
    let { adminID } = req.params;
    Admin.findById(adminID)
      .then((admin) => {
        if (admin) {
          return everythingOk(res, admin);
        } else {
          notFound(res, "Admin Not Found");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
