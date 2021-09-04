const router = require("express").Router();

const {
  resetRequest,
  resetPassword,
  otpSubmission,
} = require("../controller/forgetPassword");

router.post("/resetRequest", resetRequest);
router.post("/otpSubmission", otpSubmission);
router.post("/reset", resetPassword);
module.exports = router;
