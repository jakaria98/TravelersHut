const {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  reportPost,
  deleteReport,
  getSingleReport,
  getAllReport,
} = require("../controller/postController");

const router = require("express").Router();

router.post("/:placeID", createPost);
router.get("/post/:placeID", getAllPost);
router.get("/:postID", getSinglePost);
router.delete("/:postID", deletePost);
router.post("/report/:postID", reportPost);
router.delete("/report/:reportID", deleteReport);
router.get("/report/:reportID", getSingleReport);
router.get("/report", getAllReport);

module.exports = router;
