const User = require('../models/user');
const ChatRoom = require('../models/chatRoom');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      const user = await User.findOne({ phone: phone });
      if (!user)
        return res.status(400).send({ message: 'Incorrect Phone or Password' });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).send({
          message: 'Incorrect Phone or Password',
        });
      user.password = undefined;
      return res.status(200).send({ data: user });
    } catch (ex) {
      next(ex);
    }
  },

  register: async (req, res, next) => {
    try {
      const { phone, username, password, confirmPassword, email } = req.body;
      const phoneCheck = await User.findOne({ phone });
      if (phoneCheck)
        return res.status(400).send({ message: 'Phone already used' });
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.status(400).send({ message: 'Username already used' });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.status(400).send({ message: 'Email already used' });
      if (password != confirmPassword)
        return res
          .status(400)
          .send({ message: 'Password and confirm password are not the same' });
      return res.status(200).send({ message: 'Skip this step successfully!' });
    } catch (ex) {
      next(ex);
    }
  },

  changePassword: async (req, res, next) => {
    const { password, newPassword, confirmNewPassword, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'User not found!' });
    if (user.password != password)
      return res.status(400).send({ message: 'Old password is incorrect!' });
    if (newPassword.length < 8)
      return res
        .status(400)
        .send({ message: 'New password must have length at least of 8' });
    if (newPassword != confirmNewPassword)
      return res
        .status(400)
        .send({ message: 'Password and confirm password are not the same' });
    user.password = newPassword;
    await user.save();
    return res.status(200).send({ message: 'Change password successfully!' });
  },

  forgotPassword: async (req, res, next) => {
    const { newPassword, confirmNewPassword, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'User not found!' });
    if (newPassword.length < 8)
      return res
        .status(400)
        .send({ message: 'New password must have length at least of 8' });
    if (newPassword != confirmNewPassword)
      return res
        .status(400)
        .send({ message: 'Password and confirm password are not the same' });
    user.password = newPassword;
    await user.save();
    return res.status(200).send({ message: 'Change password successfully!' });
  },

  getAllContacts: async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).send({ message: 'User not exist' });
    const chatRooms = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { $eq: user._id.toString() } } },
        { userIds: { $elemMatch: { $in: user.friendIdsList } } },
      ],
    }).sort({ updatedAt: 'desc' });
    if (chatRooms.length == 0)
      return res.status(400).send({ message: 'No contacts available' });
    let contacts = [];
    let chatRoomIdList = [];
    for (let i = 0; i < chatRooms.length; i++) {
      let friendId =
        chatRooms[i].userIds[0] != user.id
          ? chatRooms[i].userIds[0]
          : chatRooms[i].userIds[1];
      const friend = await User.findById(friendId).select({
        _id: 1,
        fullname: 1,
        avatar: 1,
      });
      if (!friend) return res.status(400).send('Friend User not found');
      contacts.push(friend);
      chatRoomIdList.push(chatRooms[i]._id.toString());
    }
    console.log(contacts);
    return res
      .status(200)
      .send({ data: {contacts: contacts, chatRoomIdList: chatRoomIdList}, message: 'Get all contacts successfully!' });
  },

  getUserById: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: 'User not found!' });
    user.password = undefined;
    return res
      .status(200)
      .send({ data: user, message: 'Get user successfully' });
  },

  getCurrentUser: async userId => {
    const user = await User.findById(userId);
    if (!user) return false;
    user.password = undefined;
    return user;
  },
};
