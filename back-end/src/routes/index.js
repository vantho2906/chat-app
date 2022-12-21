const router = require("express").Router();
const uploadRoute = require("./upload");
const userRoute = require("./user");
const invitationRoute = require("./invite");
const messageRoute = require("./message");
const otpRoute = require("./otp");
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/views/index.html");
});
router.use("/upload", uploadRoute);
router.use("/user", userRoute);
<<<<<<< HEAD
router.use("/invite", invitationRoute);
router.use("/message", messageRoute);
router.use("/otp", otpRoute);
=======
router.use("/invite,", invitationRoute);
router.use("/message,", messageRoute);
router.use("/otp", otpRoute);
router.use("/", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});
>>>>>>> 116c34c19b8c22330d27d7de753dd92a2e2ef809
module.exports = router;
