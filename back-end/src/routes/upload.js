const { UploadMiddleware } = require('../middlewares/upload');

const multer = require('multer');
const router = require('express').Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
let upload = multer({ storage: storage });

router.post('/', upload.single('avatar'), UploadMiddleware.uploadAvatar);
router.post('/upload-multiple', UploadMiddleware.uploadMultipleImages);

module.exports = router;
