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
router.get("/get-contacts/:id", getAllContacts);
router.post("/fullname", findByFullname);
router.post("/phonhe", findByPhone);

module.exports = router;
