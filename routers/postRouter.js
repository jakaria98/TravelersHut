const {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
} = require("../controller/postController");

const router = require("express").Router();

router.post("/:placeID", createPost);
router.get("/post/:placeID", getAllPost);
router.get("/:postID", getSinglePost);
router.delete("/:postID", deletePost);

module.exports = router;
