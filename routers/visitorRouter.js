const {
  register,
  login,
  allVisitor,
} = require("../controller/visitorController");
const passport = require("passport");

const router = require("express").Router();
//registration
router.post("/register", register);
//login
router.post("/login", login);
router.get(
  "/allVisitors",
  passport.authenticate("admin", { session: false }),
  allVisitor
);
module.exports = router;
