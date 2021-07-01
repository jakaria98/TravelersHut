const { register, login } = require("../controller/visitorController");

const router = require("express").Router();
//registration
router.post("/register", register);
//login
router.post("/login", login);
//router.get("/all", allVisitor);
module.exports = router;
