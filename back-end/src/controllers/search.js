const User = require('../models/user');

module.exports = {
  findByFullname: async (req, res, next) => {
    const { fullname } = req.body;
    const users = await User.find({ fullname: { $regex: fullname } }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    if (users.length == 0)
      return res.status(400).send({ message: 'Can not find' });
    return res
      .status(200)
      .send({ data: users, message: 'Find users successfully!' });
  },

  findByPhone: async (req, res, next) => {
    const { phone } = req.body;
    const user = await User.find({ phone: phone }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    if (!user) return res.status(400).send({ message: 'Can not find' });
    return res
      .status(200)
      .send({ data: user, message: 'Find user successfully!' });
  },

  findByEmail: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.find({ email: email }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    if (!user) return res.status(400).send({ message: 'Can not find' });
    return res
      .status(200)
      .send({ data: user, message: 'Find user successfully!' });
  },
};
