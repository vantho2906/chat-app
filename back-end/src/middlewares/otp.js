const { otpModel } = require('../models/otp');

class otpMiddleware {
  static async sendOTP(req, res, next) {
    const { username, email } = req.body;
    const result = await otpModel.sendOTP(username, email);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async resendOTP(req, res, next) {
    const { username, email } = req.body;
    const result = await otpModel.resendOTP(username, email);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async confirmOTP(req, res, next) {
    const { OTPcode, username, phone, password, email, fullname } = req.body;
    const result = await otpModel.confirmOTP(
      OTPcode,
      username,
      phone,
      password,
      email,
      fullname
    );
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.otpMiddleware = otpMiddleware;
