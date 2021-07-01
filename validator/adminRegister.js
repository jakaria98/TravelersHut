const validator = require("validator");

const validate = (admin) => {
  let error = {};

  if (!admin.name) {
    error.name = "Please Provide Your Name";
  }

  if (!admin.email) {
    error.email = "Please Provide Your Email";
  } else if (!validator.isEmail(admin.email)) {
    error.email = "Please Provide a Valid Email";
  }

  if (!admin.password) {
    error.password = "Please Provide a Password";
  } else if (admin.password.length < 6) {
    error.password = "Password Must be Greater or Equal 6 Character";
  }

  if (!admin.confirmPassword) {
    error.confirmPassword = "Please Provide Confirmation Password";
  } else if (admin.password !== admin.confirmPassword) {
    error.confirmPassword = "Password Doesn't Match";
  }
  if (!admin.mobileNumber) {
    error.mobileNumber = "Please Provide a Mobile Number";
  } else if (admin.mobileNumber < 11) {
    error.mobileNumber = "Mobile Number Must be Equal to 11 Character";
  }
  if (admin.profilePhoto <= 0) {
    error.profilePhoto = "Please Select a Profile Photo";
  }
  if (admin.nid <= 0) {
    error.nid = "Please Upload the Both side of Your NID Card";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
