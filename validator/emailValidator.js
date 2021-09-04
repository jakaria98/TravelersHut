const validator = require("validator");

const validate = (email) => {
  let error = {};

  if (!email) {
    error.email = "Please Provide Your Email";
  } else if (!validator.isEmail(email)) {
    error.email = "Please Provide a Valid Email";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
