const {
  login,
  register,
  getAllContacts,
  changePassword,
  forgotPassword,
  getUserById,
} = require('../controllers/user');

const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.get('/get-contacts/:username', getAllContacts);
router.get('/:userId', getUserById);
router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
