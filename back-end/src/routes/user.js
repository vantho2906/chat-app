const {
  login,
  register,
  getAllContacts,
  findByFullname,
  findByPhone,
} = require("../controllers/user");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/get-contacts/:username", getAllContacts);
router.post("/fullname", findByFullname);
router.post("/phone", findByPhone);

module.exports = router;
