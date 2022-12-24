const { otpMiddleware } = require('../middlewares/otp');

const router = require('express').Router();

router.post('/send', otpMiddleware.sendOTP);
router.post('/resend', otpMiddleware.resendOTP);
router.post('/confirm', otpMiddleware.confirmOTP);

module.exports = router;
