const { uploadAvatar, uploadMultipleImages } = require("../controllers/upload");

const router = require("express").Router();

router.post("/", uploadAvatar);
router.post("/upload-multiple", uploadMultipleImages);

module.exports = router;
