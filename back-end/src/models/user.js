const { ResponseAPI } = require('../utils/response');
const User = require('../entities/user');
const ChatRoom = require('../entities/chatRoom');
const bcrypt = require('bcrypt');

class UserModel {
  static async login(phone, password) {
    const user = await User.findOne({ phone: phone });
    if (!user)
      return new ResponseAPI(400, { message: 'Incorrect Phone or Password' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return new ResponseAPI(400, { message: 'Incorrect Phone or Password' });
    user.password = undefined;
    return new ResponseAPI(200, { message: 'Login successfully', data: user });
  }

  static async register(phone, email, username, password, confirmPassword) {
    const phoneCheck = await User.findOne({ phone });
    if (phoneCheck)
      return new ResponseAPI(400, { message: 'Phone already exists' });
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return new ResponseAPI(400, { message: 'Username already exists' });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return new ResponseAPI(400, { message: 'Email already exists' });
    if (password != confirmPassword)
      return new ResponseAPI(400, {
        message: 'Password and confirm password are not the same',
      });
    return new ResponseAPI(200, { message: 'Skip this step successfully!' });
  }

  static async changePassword(email, password, newPassword) {
    // const { email, password, newPassword, confirmNewPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return new ResponseAPI(400, { message: 'User not found!' });
    if (user.password != password)
      return new ResponseAPI(400, { message: 'Old Password is incorrect!' });
    user.password = newPassword;
    await user.save();
    return new ResponseAPI(200, { message: 'Password changed successfully!' });
  }

  static async forgotPassword(newPassword, email) {
    const user = await User.findOne({ email });
    if (!user) return new ResponseAPI(400, { message: 'User not found!' });
    user.password = newPassword;
    await user.save();
    return new ResponseAPI(200, { message: 'Change password successfully!' });
  }

  static async getAllContacts(username) {
    const user = await User.findOne({ username });
    if (!user) return new ResponseAPI(400, { message: 'User not exist' });
    const chatRooms = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { $eq: user._id.toString() } } },
        { userIds: { $elemMatch: { $in: user.friendIdsList } } },
      ],
    }).sort({ updatedAt: 'desc' });
    if (chatRooms.length == 0)
      return new ResponseAPI(400, { message: 'No contacts available' });
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
      if (!friend) return new ResponseAPI(400, 'Friend User not found');
      contacts.push(friend);
      chatRoomIdList.push(chatRooms[i]._id.toString());
    }
    // console.log(contacts);
    return new ResponseAPI(200, {
      data: { contacts: contacts, chatRoomIdList: chatRoomIdList },
      message: 'Get all contacts successfully!',
    });
  }

  static async getUserById(userId) {
    // const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return new ResponseAPI(400, { message: 'User not found!' });
    user.password = undefined;
    return new ResponseAPI(200, {
      data: user,
      message: 'Get user successfully',
    });
  }

  static async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) return false;
    user.password = undefined;
    return user;
  }
}

exports.UserModel = UserModel;
