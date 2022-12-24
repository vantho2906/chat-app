const { UploadModel } = require('../models/upload');

class UploadMiddleware {
  static async uploadAvatar(req, res, next) {
    const username = req.body.username;
    const result = UploadModel.uploadAvatar(username);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async uploadMultipleImages(req, res, next) {
    const result = UploadModel.uploadMultipleImages();
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.UploadMiddleware = UploadMiddleware;
