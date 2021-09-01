const router = require("express").Router();
const {
  createPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  deletePlace,
  ratePlace,
  reportPlace,
  myContribution,
} = require("../controller/placeController");

const passport = require("passport");

router.post(
  "/add_place",
  passport.authenticate("guide", { session: false }),
  createPlace
);

router.get("/", getAllPlaces);

router.get("/:placeID", getSinglePlace);
router.get("/myContribution/:userID", myContribution);
router.put(
  "/update/:placeID",
  passport.authenticate("guide", { session: false }),
  updatePlace
);
router.delete(
  "/delete/:placeID",
  passport.authenticate("admin", { session: false }),
  deletePlace
);
router.put(
  "/:PlaceID",
  passport.authenticate("visitor", { session: false }),
  ratePlace
);
router.post("/:PlaceID", reportPlace);

module.exports = router;
