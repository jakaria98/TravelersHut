const {
  getAllReport,
  getSingleReport,
  deleteReport,
} = require("../controller/reportedPlaceController");

const router = require("express").Router();

router.get("/", getAllReport);
router.get("/:reportID", getSingleReport);
router.delete("/:reportID", deleteReport);
module.exports = router;
