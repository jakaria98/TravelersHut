const validator = require("validator");

module.exports = {
  userValidate(user) {
    let error = {};
    if (!user.email) {
      error.validEmail = "Please Provide an Email";
    } else if (!validator.isEmail(user.email)) {
      error.validEmail = "Please Provide an Valid Email";
    }

    if (!user.name) {
      error.validName = "Please Provide A Name";
    }
    if (!user.currentPassword) {
      error.currentPassword = "Please Provide Your Current Password";
    } else if (user.currentPassword.length < 6) {
      error.currentPassword = "Invalid Password";
    }

    return {
      error,
      isValid: Object.keys(error).length === 0,
    };
  },
  passwordValidator(user) {
    let error = {};
    if (!user.newPassword) {
      error.newPassword = "Please Provide A New Password";
    } else if (user.newPassword.length < 6) {
      error.newPassword = "Password Must be Greater or Equal 6 Character";
    }
    if (!user.confirmNewPassword) {
      error.confirmNewPassword = "Please Provide Confirmation Password";
    } else if (user.newPassword !== user.confirmNewPassword) {
      error.confirmNewPassword = "Password Doesn't match";
    }
    return {
      error,
      isValid: Object.keys(error).length === 0,
    };
  },
};
