const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Visitor = require("../model/Visitor");
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const {
  badRequest,
  serverError,
  notFound,
  createdSuccessfully,
} = require("../utils/error");

module.exports = {
  login(req, res) {
    let { email, password } = req.body;
    let validate = loginValidator({ email, password });

    if (!validate.isValid) {
      return badRequest(res, validate.error);
    }

    Visitor.findOne({ email })
      .then((user) => {
        if (!user) {
          return notFound(res, "User not found");
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
            },
            "VISITOR",
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
    let { name, email, password, confirmPassword } = req.body;
    let validate = registerValidator({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!validate.isValid) {
      return badRequest(res, validate.error);
    } else {
      Visitor.findOne({ email })
        .then((user) => {
          if (user) {
            return badRequest(res, "user already exists");
          }

          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              serverError(res, err);
            }
            let user = new Visitor({
              name,
              email,
              password: hash,
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
