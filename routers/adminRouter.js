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
  passport.authenticate("guide", { session: false }),
  login
);
router.post(
  "/register",
  passport.authenticate("admin", { session: false }),
  register
);
router.post(
  "/updateProfile",
  passport.authenticate("admin", { session: false }),
  updateProfile
);
router.get(
  "/allAdmin",
  passport.authenticate("admin", { session: false }),
  allAdmin
);
router.get(
  "/allAdmin/:adminID",
  passport.authenticate("admin", { session: false }),
  singleAdmin
);
module.exports = router;
