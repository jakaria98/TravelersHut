const router = require("express").Router();
const {
  createPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  deletePlace,
  ratePlace,
} = require("../controller/placeController");

const passport = require("passport");

router.post(
  "/add_place",
  passport.authenticate("guide", { session: false }),
  createPlace
);
router.get(
  "/",

  getAllPlaces
);
router.get("/:placeID", getSinglePlace);
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
router.put("/:PlaceID", ratePlace);

module.exports = router;
