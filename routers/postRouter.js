const {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  reportPost,
  deleteReport,
} = require("../controller/postController");

const router = require("express").Router();

router.post("/:placeID", createPost);
router.get("/post/:placeID", getAllPost);
router.get("/:postID", getSinglePost);
router.delete("/:postID", deletePost);
router.post("/report/:postID", reportPost);
router.delete("/report/:reportID", deleteReport);

module.exports = router;
