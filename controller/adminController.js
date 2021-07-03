const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const adminRegister = require("../validator/adminRegister");
const loginValidator = require("../validator/loginValidator");
const { badRequest, serverError, notFound } = require("../utils/error");

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
    let {
      name,
      email,
      mobileNumber,
      password,
      confirmPassword,
      profilePhoto,
      nid,
    } = req.body;
    let validate = adminRegister({
      name,
      email,
      mobileNumber,
      password,
      confirmPassword,
      profilePhoto,
      nid,
    });
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    } else {
      Admin.findOne({ email })
        .then((user) => {
          if (user) {
            return badRequest(res, "user already exists");
          }

          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              serverError(res, err);
            }
            let user = new Admin({
              name,
              email,
              mobileNumber,
              password: hash,
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
          });
        })
        .catch((error) => {
          serverError(res, error);
        });
    }
  },
};
