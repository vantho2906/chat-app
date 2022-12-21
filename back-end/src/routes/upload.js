const {upload,  uploadAvatar, uploadMultipleImages } = require("../controllers/upload");

const router = require("express").Router();

router.post("/",upload, uploadAvatar);
router.post("/upload-multiple", uploadMultipleImages);

module.exports = router;
