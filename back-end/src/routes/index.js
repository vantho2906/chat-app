const router = require('express').Router();
const uploadRoute = require('./upload');
const userRoute = require('./user');
const invitationRoute = require('./invite');
const messageRoute = require('./message');
const otpRoute = require('./otp');
const searchRoute = require('./search');
const chatroomRoute = require('./chatroom');
const { TokenMiddleware } = require('../middlewares/rf_token');

router.use('/upload', uploadRoute);
router.use('/user', userRoute);
router.use('/message', messageRoute);
router.use('/otp', otpRoute);
router.use('/invite', invitationRoute);
router.use('/search', searchRoute);
router.use('/chatroom', chatroomRoute);
router.get('/refresh_token', TokenMiddleware.refreshToken);

router.use('/', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

module.exports = router;
