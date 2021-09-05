const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const loginValidator = require("../validator/loginValidator");
const {
  userValidate,
  newPassCheck,
  currentPassCheck,
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
          let error = {};
          error.invalidAccess = "Invalid Credential";
          return notFound(res, error);
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return serverError(res, error);
          if (!result) {
            let error = {};
            error.invalidAccess = "Invalid Credential";
            return badRequest(res, error);
          }
          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              mobileNumber: user.mobileNumber,
              profilePhoto: user.profilePhoto,
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
    let { name, email, mobileNumber, password, profilePhoto } = req.body;
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
    let { name, email, currentPassword, confirmNewPassword, newPassword } =
      req.body;
    let password = req.user.password;
    if (req.files) {
      let { profilePhoto } = req.files;

      updatedAdmin.profilePhoto = profilePhoto.name;
      profilePhoto.mv(
        `${__dirname.replace("controller", "")}images/${profilePhoto.name}`,
        (err) => {
          if (err) return serverError(res, err);
        }
      );
    }
    let userCheck = userValidate({ name, email });
    if (!userCheck.isValid) {
      return badRequest(res, userCheck.error);
    } else {
      updatedAdmin.name = name;
      updatedAdmin.email = email;
    }
    if (newPassword || confirmNewPassword) {
      let passCheck = newPassCheck({ newPassword, confirmNewPassword });
      if (!passCheck.isValid) {
        return badRequest(res, passCheck.error);
      } else {
        bcrypt.hash(newPassword, 11, (err, hash) => {
          if (err) return serverError(res, err);
          else {
            updatedAdmin.password = hash;

            let currentPass = currentPassCheck({ currentPassword });
            if (!currentPass.isValid) {
              return badRequest(res, currentPass.error);
            } else {
              bcrypt.compare(currentPassword, password, (err, result) => {
                if (err) {
                  return badRequest(res, err);
                }

                if (!result) {
                  let invalidUser = {};
                  invalidUser.invalidAccess = "Invalid Credential";
                  return badRequest(res, invalidUser);
                }
                Admin.findByIdAndUpdate(
                  req.user._id,
                  { $set: updatedAdmin },
                  { new: true }
                )
                  .then((admin) => {
                    if (admin) {
                      let token = jwt.sign(
                        {
                          _id: admin._id,
                          name: admin.name,
                          email: admin.email,
                          mobileNumber: admin.mobileNumber,
                          profilePhoto: admin.profilePhoto,
                        },
                        "ADMIN",
                        { expiresIn: 60 * 60 * 24 * 7 }
                      );
                      token = `Bearer ${token}`;
                      return everythingOk(res, token);
                    } else {
                      return badRequest(res, "User Not Updated");
                    }
                  })
                  .catch((error) => serverError(res, error));
              });
            }
          }
        });
      }
    } else {
      let currentPass = currentPassCheck({ currentPassword });
      if (!currentPass.isValid) {
        return badRequest(res, currentPass.error);
      } else {
        bcrypt.compare(currentPassword, password, (err, result) => {
          if (err) return badRequest(res, err);
          if (!result) {
            let error = {};
            error.invalidAccess = "Invalid Credential";
            return badRequest(res, error);
          }
          Admin.findByIdAndUpdate(
            req.user._id,
            { $set: updatedAdmin },
            { new: true }
          )
            .then((admin) => {
              if (admin) {
                let token = jwt.sign(
                  {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    mobileNumber: admin.mobileNumber,
                    profilePhoto: admin.profilePhoto,
                  },
                  "ADMIN",
                  { expiresIn: 60 * 60 * 24 * 7 }
                );
                token = `Bearer ${token}`;
                return everythingOk(res, token);
              } else {
                return badRequest(res, "Admin Not updated");
              }
            })
            .catch((error) => serverError(res, error));
        });
      }
    }
  },
};
