const validator = require("validator");

const validate = (place) => {
  let error = {};
  if (!place.name) {
    error.name = "Please Provide a Name";
  }
  if (place.district.length <= 0) {
    error.district = "Please Select a District";
  }
  if (place.division.length <= 0) {
    error.division = "Please Select a Division";
  }
  if (place.upazila.length <= 0) {
    error.upazila = "Please Enter Upazila";
  }
  if (place.coverPhoto.length <= 0) {
    error.coverPhoto = "Please Select a Cover Photo";
  }
  if (place.detailsPhoto.length <= 0) {
    error.detailsPhoto = "Please Select Some Feature Photos";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
