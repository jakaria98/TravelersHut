const {
  deleteReport,
  getSingleReport,
  getAllReport,
} = require("../controller/reportedPostController");

const router = require("express").Router();
router.delete("/report/:reportID", deleteReport);
router.get("/report/:reportID", getSingleReport);
router.get("/report", getAllReport);

module.exports = router;
