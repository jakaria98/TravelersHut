const validate = (code) => {
  let error = {};
  if (code.length !== 6) {
    error.code = "Invalid Code";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;