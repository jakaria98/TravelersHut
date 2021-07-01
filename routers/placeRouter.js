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
router.get("/", getAllPlaces);
router.get("/:placeID", getSinglePlace);
router.put("/update/:placeID", updatePlace);
router.delete("/delete/:placeID", deletePlace);
router.put("/:PlaceID", ratePlace);

module.exports = router;
