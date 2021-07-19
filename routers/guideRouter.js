const {
  login,
  register,
  allGuide,
  getSingleGuide,
  registerRequest,
} = require("../controller/guideController");
const router = require("express").Router();
const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("visitor", { session: false }),
  login
);

router.post("/registerRequest", registerRequest);
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
router.get(
  "/:guideID",
  passport.authenticate("admin", { session: false }),
  getSingleGuide
);

module.exports = router;
