const { login, register } = require("../controller/adminController");

const router = require("express").Router();
router.post("/login", login);
router.post("/register", register);
module.exports = router;
