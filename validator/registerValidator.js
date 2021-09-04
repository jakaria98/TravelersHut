const validator = require("validator");

const validate = (visitor) => {
  let error = {};

  if (!visitor.name) {
    error.name = "Please Provide Your Name";
  }

  if (!visitor.email) {
    error.R_email = "Please Provide Your Email";
  } else if (!validator.isEmail(visitor.email)) {
    error.R_email = "Please Provide a Valid Email";
  }

  if (!visitor.password) {
    error.R_password = "Please Provide a Password";
  } else if (visitor.password.length < 6) {
    error.R_password = "Password Must be Greater or Equal 6 Character";
  }

  if (!visitor.confirmPassword) {
    error.confirmPassword = "Please Provide Confirmation Password";
  } else if (visitor.password !== visitor.confirmPassword) {
    error.confirmPassword = "Password Doesn't Match";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
