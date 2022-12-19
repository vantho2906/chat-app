const { login, register } = require("../controllers/user");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;