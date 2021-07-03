const validator = require("validator");

const validate = (post) => {
  let error = {};
  if (post.division.length <= 0) {
    error.division = "Please Select a Division";
  }
  if (post.district.length <= 0) {
    error.district = "Please Select a District";
  }
  if (post.upazila.length <= 0) {
    error.upazila = "Please Select a Upazila";
  }
  if (!post.minimumCost) {
    error.minimumCost = "Please Provide Minimum Cost";
  }
  if (post.coverPhoto.length<=0) {
    error.coverPhoto = "Please Select a Cover Photo";
  }
  if (post.detailsPhoto.length <= 0) {
    error.detailsPhoto = "Please Select Some Images";
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
