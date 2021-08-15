const {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  reportPost,
} = require("../controller/postController");

const router = require("express").Router();

router.post("/:placeID", createPost);
router.get("/post/:placeID", getAllPost);
router.get("/:postID", getSinglePost);
router.delete("/:postID", deletePost);
router.post("/report/:postID", reportPost);


module.exports = router;
