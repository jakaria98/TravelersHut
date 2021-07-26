const validate = () => {
  let error = {};

  error.code = "Invalid Code";

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
