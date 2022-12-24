class SearchMiddleware {
  static async findByFullname(req, res, next) {
    const { fullname } = req.body;
    const result = otpModel.findByFullname(fullname);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async findByPhone(req, res, next) {
    const { phone } = req.body;
    const result = otpModel.findByPhone(phone);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async findByEmail(req, res, next) {
    const { email } = req.body;
    const result = otpModel.findByEmail(email);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.SearchMiddleware = SearchMiddleware;
