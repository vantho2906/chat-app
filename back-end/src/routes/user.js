const { UserMiddleware } = require('../middlewares/user');

const router = require('express').Router();

router.post('/login', UserMiddleware.login);
router.get('/logout', UserMiddleware.logout);
router.post('/register', UserMiddleware.register);
router.get('/get-contacts/:id', UserMiddleware.getAllContacts);
router.get('/get-friendlist/:id', UserMiddleware.getFriendsList);
router.get('/:userId', UserMiddleware.getUserById);
router.post('/change-password', UserMiddleware.changePassword);
router.post('/forgot-password', UserMiddleware.forgotPassword);
router.patch('/change-info', UserMiddleware.changeInfo);

module.exports = router;
