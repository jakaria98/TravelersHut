const {
  login,
  register,
  allGuide,
  getSingleGuide,
  registerRequest,
  deleteGuide,
  updateProfile,
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
router.post(
  "/updateProfile",
  passport.authenticate("guide", { session: false }),
  updateProfile
);

router.get("/allGuide", allGuide);
router.get("/:guideID", getSingleGuide);
router.delete("/:guideID", deleteGuide);

module.exports = router;
