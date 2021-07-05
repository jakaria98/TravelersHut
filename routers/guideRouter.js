const { login, register, allGuide } = require("../controller/guideController");
const router = require("express").Router();
const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("visitor", { session: false }),
  login
);

router.post(
  "/register",
  passport.authenticate("visitor", { session: false }),
  register
);

router.get(
  "/allGuide",
  passport.authenticate("admin", { session: false }),
  allGuide
);

module.exports = router;
