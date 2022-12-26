const { UploadModel } = require('../models/upload');

class UploadMiddleware {
  static async uploadAvatar(req, res, next) {
    if (!req.file)
      return res.status(400).send({ message: 'Please upload a file' });
    const username = req.body.username;
    const result = await UploadModel.uploadAvatar(username, req.file);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async uploadMultipleImages(req, res, next) {
    const result = await UploadModel.uploadMultipleImages();
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.UploadMiddleware = UploadMiddleware;
