const validate = (location) => {
  let error = {};
  if (!location.division) error.division = "Select A Division";
  if (!location.district) error.district = "Please Select A District";
  if (!location.upazila) error.upazila = "Please Select A Upazila";
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
