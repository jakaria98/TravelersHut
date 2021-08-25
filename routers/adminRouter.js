const {
  login,
  register,
  allAdmin,
  singleAdmin,
  updateProfile,
} = require("../controller/adminController");
const passport = require("passport");

const router = require("express").Router();
router.post(
  "/login",
  
  login
);
router.post(
  "/register",
  
  register
);
router.post(
  "/updateProfile",
  passport.authenticate("admin", { session: false }),
  updateProfile
);
router.get(
  "/allAdmin",
  
  allAdmin
);
router.get(
  "/allAdmin/:adminID",
 
  singleAdmin
);
module.exports = router;
