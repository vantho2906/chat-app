const { sendOTP, resendOTP, confirmOTP } = require("../controllers/otp");

const router = require("express").Router();

router.post("/send", sendOTP);
router.post("/resend", resendOTP);
router.post("/confirm", confirmOTP);

module.exports = router;
