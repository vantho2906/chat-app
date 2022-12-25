const User = require('../entities/user');
const { ResponseAPI } = require('../utils/response');

class SearchModel {
  static async findByFullname(fullname) {
    // const { fullname } = req.body;
    const users = await User.find({
      fullname: { $regex: fullname, $options: 'i' },
    }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    if (users.length == 0) new ResponseAPI(400, { message: 'Can not find' });
    return new ResponseAPI(200, {
      data: users,
      message: 'Find users successfully!',
    });
  }

  static async findByPhone(phone) {
    // const { phone } = req.body;
    const user = await User.find({ phone: phone }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    if (!user) new ResponseAPI(400, { message: 'Can not find' });
    return new ResponseAPI(200, {
      data: user,
      message: 'Find user successfully!',
    });
  }

  static async findByEmail(email) {
    // const { email } = req.body;
    const user = await User.find({ email: email }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    if (!user) new ResponseAPI(400, { message: 'Can not find' });
    return new ResponseAPI(200, {
      data: user,
      message: 'Find user successfully!',
    });
  }
}

exports.SearchModel = SearchModel;
