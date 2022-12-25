const { SearchModel } = require('../models/search');

class SearchMiddleware {
  static async findByFullname(req, res, next) {
    const { fullname } = req.body;
    const result = await SearchModel.findByFullname(fullname);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async findByPhone(req, res, next) {
    const { phone } = req.body;
    const result = await SearchModel.findByPhone(phone);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async findByEmail(req, res, next) {
    const { email } = req.body;
    const result = await SearchModel.findByEmail(email);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.SearchMiddleware = SearchMiddleware;
