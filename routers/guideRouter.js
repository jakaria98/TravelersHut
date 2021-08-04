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

router.post(
  "/registerRequest",
  passport.authenticate("visitor", { session: false }),
  registerRequest
);
router.post(
  "/register",
  passport.authenticate("visitor", { session: false }),
  register
);

router.get("/allGuide", allGuide);
router.get("/:guideID", getSingleGuide);

module.exports = router;
