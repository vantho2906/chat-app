const { TokenModel } = require('../models/rf_token');

class TokenMiddleware {
  static async refreshToken(req, res, next) {
    const rf_token = req.cookies.refreshtoken;

    const result = await TokenModel.refreshToken(rf_token);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.TokenMiddleware = TokenMiddleware;
