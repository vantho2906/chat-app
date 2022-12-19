const router = require("express").Router();
const uploadRoute = require("./upload");
const userRoute = require("./user");
const invitationRoute = require("./invite");
const messageRoute = require("./message");
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/views/index.html");
});

router.use("/upload", uploadRoute);
router.use("/user", userRoute);
router.use("/invite,", invitationRoute);
router.use("/message,", messageRoute);
module.exports = router;
