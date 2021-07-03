const {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  ratePost,
} = require("../controller/postController");

const router = require("express").Router();
const passport = require("passport");

router.post(
  "/:placeID",
  passport.authenticate("guide", { session: false }),
  createPost
);
router.get("/", getAllPost);
router.get("/:postID", getSinglePost);
router.delete("/:postID", deletePost);
router.put("/:postID", ratePost);
module.exports = router;
