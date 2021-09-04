const validate = (pass) => {
  let error = {};

  if (!pass.password) {
    error.password = "Provide A Password";
  } else if (pass.password.length < 6) {
    error.password = "Provide At Least 6 character";
  }
  if (!pass.confirmPassword) {
    error.confirmPassword = "Provide A Confirmation Password";
  }
  if (pass.password !== pass.confirmPassword) {
    error.confirmPassword = "Password doesn't match";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
