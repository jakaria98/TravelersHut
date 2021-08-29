const validator = require("validator");

const validate = (guide) => {
  let error = {};

  if (!guide.name) {
    error.name = "Please Provide Your Name";
  }

  if (!guide.email) {
    error.email = "Please Provide Your Email";
  } else if (!validator.isEmail(guide.email)) {
    error.email = "Please Provide a Valid Email";
  }

  if (!guide.password) {
    error.password = "Please Provide a Password";
  } else if (guide.password.length < 6) {
    error.password = "Password Must be Greater or Equal 6 Character";
  }

  if (!guide.confirmPassword) {
    error.confirmPassword = "Please Provide Confirmation Password";
  } else if (guide.password !== guide.confirmPassword) {
    error.confirmPassword = "Password Doesn't Match";
  }
  if (!guide.mobileNumber) {
    error.mobileNumber = "Please Provide a Mobile Number";
  } else if (guide.mobileNumber < 11) {
    error.mobileNumber = "Mobile Number Must be Equal to 11 Character";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
