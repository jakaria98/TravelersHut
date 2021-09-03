const router = require("express").Router();

const { resetRequest, reset } = require("../controller/forgetPassword");

router.post("/reset-request", resetRequest);
router.post("/reset", reset);
module.exports = router;
