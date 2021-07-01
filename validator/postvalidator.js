const validator = require("validator");

const validate = (post) => {
  let error = {};
  if (!post.visitingFrom) {
    error.visitingFrom = "Please Provide a Place Name";
  }
  if (!post.minimumCost) {
    error.minimumCost = "Please Provide Minimum Cost";
  }
  if (!post.coverPhoto) {
    error.coverPhoto = "Please Select a Cover Photo";
  }
  if (!post.images) {
    error.images = "Please Select Some Images";
  }
  if (!post.residence) {
    error.residence = "Please Select Yes or No";
  }
  if (!post.details) {
    error.details = "Please Write Something About The Place";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
