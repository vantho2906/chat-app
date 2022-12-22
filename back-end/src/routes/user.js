const {
  login,
  register,
  getAllContacts,
} = require("../controllers/user");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/get-contacts/:username", getAllContacts);


module.exports = router;
