const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config");
const client = require("twilio")(config.accountSID, config.authToken);

const Guide = require("../model/Guide");
const guideRegister = require("../validator/guideRegister");
const loginValidator = require("../validator/loginValidator");
const codeValidator = require("../validator/codeValidator");

const {
  userValidate,
  newPassCheck,
  currentPassCheck,
} = require("../validator/userValidator");
const {
  badRequest,
  serverError,
  notFound,
  createdSuccessfully,
  everythingOk,
} = require("../utils/error");

module.exports = {
  login(req, res) {
    let { email, password } = req.body;
    let validate = loginValidator({ email, password });

    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }

    Guide.findOne({ email })
      .then((user) => {
        if (!user) {
          return notFound(res, "Guide not found");
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
              contribution: user.contribution,
              places: user.places,
              posts: user.posts,
            },
            "GUIDE",
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
  registerRequest(req, res) {
    let {
      name,
      email,
      mobileNumber,
      password,
      confirmPassword,
      profilePhoto,
      nid,
    } = req.body;
    let validate = guideRegister({
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
      client.verify
        .services(config.serviceID)
        .verifications.create({
          to: `+88${mobileNumber}`,
          channel: "sms",
        })
        .then((data) => {
          everythingOk(res, data);
        })
        .catch((error) => serverError(res, error));
    }
  },
  register(req, res) {
    let { name, email, mobileNumber, password, profilePhoto, nid, code } =
      req.body;
    if (code.length !== 6) {
      let validate = codeValidator();
      return badRequest(res, validate.error);
    }

    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+88${mobileNumber}`,
        code: code,
      })
      .then((data) => {
        if (data.valid) {
          Guide.findOne({ email })
            .then((user) => {
              if (user) {
                return badRequest(res, "guide already exists");
              }

              bcrypt.hash(password, 11, (err, hash) => {
                if (err) {
                  return serverError(res, err);
                }
                let user = new Guide({
                  name,
                  email,
                  mobileNumber,
                  password: hash,
                  profilePhoto,
                  nid,
                  contribution: 0,
                  places: [],
                  posts: [],
                });
                user
                  .save()
                  .then((user) => {
                    res.status(201).json({
                      message: "guide saved",
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
        } else {
          let mismatch = codeValidator();
          return badRequest(res, mismatch.error);
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  },
  allGuide(req, res) {
    Guide.find()
      .then((users) => everythingOk(res, users))
      .catch((error) => serverError(res, error));
  },
  getSingleGuide(req, res) {
    let { guideID } = req.params;
    Guide.findById(guideID)
      .then((guide) => {
        if (!guide) {
          return badRequest(res, "No Guide Found");
        } else {
          return everythingOk(res, guide);
        }
      })
      .catch((error) => serverError(res, error));
  },
  deleteGuide(req, res) {
    let { guideID } = req.params;
    Guide.findByIdAndDelete(guideID)
      .then((guide) => {
        if (guide) {
          return everythingOk(res, guide);
        } else {
          return notFound(res, "Guide Not Found");
        }
      })
      .catch((error) => serverError(res, error));
  },

  updateProfile(req, res) {
    let updatedGuide = req.user;
    let {
      name,
      email,
      profilePhoto,
      currentPassword,
      confirmNewPassword,
      newPassword,
    } = req.body;
    let password = req.user.password;
    if (profilePhoto) updatedGuide.profilePhoto = profilePhoto;
    let userCheck = userValidate({ name, email });
    if (!userCheck.isValid) {
      return badRequest(res, userCheck.error);
    } else {
      updatedGuide.name = name;
      updatedGuide.email = email;
    }
    if (newPassword || confirmNewPassword) {
      let passCheck = newPassCheck({ newPassword, confirmNewPassword });
      if (!passCheck.isValid) {
        return badRequest(res, passCheck.error);
      } else {
        bcrypt.hash(newPassword, 11, (err, hash) => {
          if (err) return serverError(res, err);
          else {
            updatedGuide.password = hash;

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
                Guide.findByIdAndUpdate(
                  req.user._id,
                  { $set: updatedGuide },
                  { new: true }
                )
                  .then((guide) => {
                    if (guide) {
                      let token = jwt.sign(
                        {
                          _id: guide._id,
                          name: guide.name,
                          email: guide.email,
                          mobileNumber: guide.mobileNumber,
                          profilePhoto: guide.profilePhoto,
                          nid: guide.nid,
                        },
                        "GUIDE",
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
          Guide.findByIdAndUpdate(
            req.user._id,
            { $set: updatedGuide },
            { new: true }
          )
            .then((guide) => {
              if (guide) {
                let token = jwt.sign(
                  {
                    _id: guide._id,
                    name: guide.name,
                    email: guide.email,
                    mobileNumber: guide.mobileNumber,
                    profilePhoto: guide.profilePhoto,
                    nid: guide.nid,
                  },
                  "GUIDE",
                  { expiresIn: 60 * 60 * 24 * 7 }
                );
                token = `Bearer ${token}`;
                console.log(token);
                return everythingOk(res, token);
              } else {
                return badRequest(res, "GUIDE Not updated");
              }
            })
            .catch((error) => serverError(res, error));
        });
      }
    }
  },
};
