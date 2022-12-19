const router = require("express").Router();
const uploadRoute = require("./upload")
const userRoute = require("./user")
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/views/index.html");
});

router.use('/upload', uploadRoute)
router.use('/user', userRoute)
module.exports = router;
