const validator = require("validator");

const validate = (visitor) => {
  let error = {};

  if (!visitor.name) {
    error.name = "Please Provide Your Name";
  }

  if (!visitor.email) {
    error.email = "Please Provide Your Email";
  } else if (!validator.isEmail(visitor.email)) {
    error.email = "Please Provide a Valid Email";
  }

  if (!visitor.password) {
    error.password = "Please Provide a Password";
  } else if (visitor.password.length < 6) {
    error.password = "Password Must be Greater or Equal 6 Character";
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
