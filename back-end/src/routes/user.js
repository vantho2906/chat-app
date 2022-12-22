const {
  login,
  register,
  getAllContacts,
  changePassword,
  forgotPassword,
} = require('../controllers/user');

const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.get('/get-contacts/:username', getAllContacts);
router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
