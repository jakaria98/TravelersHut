const { login, register, allAdmin } = require("../controller/adminController");
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
router.get(
  "/allAdmin",
  passport.authenticate("guide", { session: false }),
  allAdmin
);
module.exports = router;
