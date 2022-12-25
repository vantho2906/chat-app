const multer = require('multer');
const fs = require('fs-extra');
const UserModel = require('../entities/user');
const { ResponseAPI } = require('../utils/response');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
let upload = multer({ storage: storage });
class UploadModel {
  static async uploadAvatar(username) {
    const user = await UserModel.findOne({ username });
    if (!user) return new ResponseAPI(400, { message: 'User not found' });
    if (!req.file)
      return new ResponseAPI(400, { message: 'Please upload a file' });
    let typeOfFile = req.file.mimetype.split('/')[1];
    if (typeOfFile.match('/JPG|jpg|jpeg|png|gif/')) {
      let img = fs.readFileSync(req.file.path);
      let encode_image = img.toString('base64');
      const avatar = {
        contentType: req.file.mimetype,
        imageBase64: encode_image,
      };
      user.avatar = avatar;
      await user.save();
      user.password = undefined;
      new ResponseAPI(200, {
        message: 'Upload image successfully',
        data: user,
      });
    } else {
      return new ResponseAPI(400, { message: 'Only image file is allowed' });
    }
  }

  static async uploadMultipleImages(req, res, next) {
    if (!req.files)
      return new ResponseAPI(400, { message: 'Please choose files' });
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
      const typeOfFile = files[i].mimetype.split('/')[1];
      if (!typeOfFile.match('/JPG|jpg|jpeg|png|gif/')) {
        return new ResponseAPI(400, {
          message: 'Only image files are allowed',
        });
      }
    }
    upload.array('myImage', files.length);
    let data = [];
    for (let i = 0; i < files.length; i++) {
      let img = fs.readFileSync(files[i].path);
      let encode_image = img.toString('base64');
      ImageModel.create({
        contentType: files[i].mimetype,
        image: encode_image,
      });
    }
    return new ResponseAPI(200, {
      message: 'Upload images successfully',
    });
  }
}

exports.UploadModel = UploadModel;