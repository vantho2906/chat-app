const jwt = require('jsonwebtoken');
const User = require('../entities/user');
const { ResponseAPI } = require('../utils/response');
const { UserModel } = require('./user');
const { Token } = require('../utils/generateToken');

class TokenModel {
  static async refreshToken(rf_token) {
    if (!rf_token) return new ResponseAPI(400, { msg: 'Please login now!' });
    const decode = await jwt.verify(
      rf_token,
      `${process.env.REFRESH_TOKEN_SECRET}`
    );
    if (!decode) return new ResponseAPI(400, { msg: 'Please login now!' });
    if (decode['id']) {
      const user = await User.findById(decode['id']).select('-password');
      if (!user)
        return new ResponseAPI(400, { msg: 'This account does not exist.' });

      const access_token = await Token.generateAccessToken({ id: user._id });
      return new ResponseAPI(200, { access_token, user });
    }
    return new ResponseAPI(200, { message: 'success' });
  }
}

exports.TokenModel = TokenModel;
