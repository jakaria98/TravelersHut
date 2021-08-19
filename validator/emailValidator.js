const validator = require("validator");
const validate = (email) => {
  let error = {};
  if (!email) {
    error.validEmail = "Please Provide an Email";
  } else if (!validator.isEmail(email)) {
    error.validEmail = "Please Provide an Valid Email";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
