const { login, register } = require("../controller/guideController");
const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

module.exports = router;
