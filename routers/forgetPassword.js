const router = require("express").Router();

const { resetRequest, reset } = require("../controller/forgetPassword");

router.post("/resetRequest", resetRequest);
router.post("/reset", reset);
module.exports = router;
