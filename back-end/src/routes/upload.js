const {
  uploadAvatar,
  uploadMultipleImages,
} = require("../controllers/upload");

const multer = require("multer");
const router = require("express").Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
let upload = multer({ storage: storage });

router.post("/", upload.single('avatar'), uploadAvatar);
router.post("/upload-multiple", uploadMultipleImages);

module.exports = router;

