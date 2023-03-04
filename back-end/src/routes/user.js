const { UserMiddleware } = require('../middlewares/user');

const router = require('express').Router();

router.post('/login', UserMiddleware.login);
router.post('/register', UserMiddleware.register);
router.get('/get-contacts/:username', UserMiddleware.getAllContacts);
router.get('/:userId', UserMiddleware.getUserById);
router.post('/change-password', UserMiddleware.changePassword);
router.post('/forgot-password', UserMiddleware.forgotPassword);
router.get('/refresh_token', UserMiddleware.refreshToken);

module.exports = router;
