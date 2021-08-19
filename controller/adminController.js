const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const loginValidator = require("../validator/loginValidator");
const {
  userValidate,
  passwordValidator,
} = require("../validator/userValidator");
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
  updateProfile(req, res) {
    let updatedAdmin = req.user;
    let {
      name,
      email,
      profilePhoto,
      currentPassword,
      confirmNewPassword,
      newPassword,
    } = req.body;
    if (profilePhoto) updatedAdmin.profilePhoto = profilePhoto;
    if (newPassword.length > 0 || confirmNewPassword.length > 0) {
      let passwordValidate = passwordValidator({
        newPassword,
        confirmNewPassword,
      });
      if (!passwordValidate.isValid) {
        return badRequest(res, passwordValidate.error);
      } else {
        bcrypt.hash(newPassword, 11, (err, hash) => {
          if (err) {
            return serverError(res, err);
          } else {
            updatedAdmin.password = hash;
          }
        });
      }
    }
    let validate = userValidate({ name, email, currentPassword });
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }

    bcrypt.compare(currentPassword, updatedAdmin.password, (err, result) => {
      if (err) return serverError(res, error);
      let error = {};
      if (!result) {
        error.currentPassword = "Invalid Credential";
        return badRequest(res, error);
      }
    });
    Admin.findByIdAndUpdate(
      updatedAdmin._id,
      { $set: updatedAdmin },
      { new: true }
    )
      .then((admin) => {
        everythingOk(res, admin);
      })
      .catch((error) => serverError(res, error));
  },
};
