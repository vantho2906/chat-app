const { UserModel } = require('../models/user');
const { ControllerService } = require('../utils/decorators');
const { Token } = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

class UserMiddleware {
  static async login(req, res, next) {
    const { phone, password } = req.body;
    const result = await UserModel.login(phone, password);
    if (result.getStatusCode() === 200) {
      const refresh_token = Token.generateRefreshToken({
        id: result.data.data._id,
      });
      await res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async register(req, res, next) {
    const { phone, email, username, password, confirmPassword } = req.body;
    if (!phone.match(/(0[3|5|7|8|9])+([0-9]{8})\b/g))
      return res.status(400).send({ message: 'Phone is invalid' });
    if (password.length < 8)
      return res
        .status(400)
        .send({ message: 'Password must have length at least of 8' });
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return res.status(400).send({ message: 'Email is invalid' });
    const result = await UserModel.register(
      phone,
      email,
      username,
      password,
      confirmPassword
    );
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async changePassword(req, res, next) {
    const { email, password, newPassword, confirmNewPassword } = req.body;
    if (password.length < 8)
      return res
        .status(400)
        .send({ message: 'Password must have length at least of 8' });
    if (newPassword.length < 8)
      return res
        .status(400)
        .send({ message: 'New password must have length at least of 8' });
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return res.status(400).send({ message: 'Email is invalid' });
    if (newPassword != confirmNewPassword)
      return res.status(400).send({
        message: 'Password and confirm password are not the same',
      });
    const result = await UserModel.changePassword(email, password, newPassword);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async forgotPassword(req, res, next) {
    const { newPassword, confirmNewPassword, email } = req.body;
    if (newPassword.length < 8)
      return res
        .status(400)
        .send({ message: 'Password must have length at least of 8' });
    if (newPassword != confirmNewPassword)
      return res.status(400).send({
        message: 'Password and confirm password are not the same',
      });
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      return res.status(400).send({ message: 'Email is invalid' });
    const result = await UserModel.forgotPassword(newPassword, email);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async refreshToken(req, res, next) {
    const rf_token = req.cookies.refreshtoken;
    console.log(rf_token);
    const result = UserModel.refreshToken(rf_token);
    res.status(result.getStatusCode()).send(result.getData());
  }

  static async getAllContacts(req, res, next) {
    const { username } = req.params;
    const result = await UserModel.getAllContacts(username);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async getUserById(req, res, next) {
    const { userId } = req.params;
    const result = await UserModel.getUserById(userId);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}
exports.UserMiddleware = UserMiddleware;
