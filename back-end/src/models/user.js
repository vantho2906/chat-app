const { ResponseAPI } = require('../utils/response');
const User = require('../entities/user');
const ChatRoom = require('../entities/chatRoom');
const bcrypt = require('bcrypt');
const { Token } = require('../utils/generateToken');

class UserModel {
  static async login(phone, password) {
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return new ResponseAPI(400, { message: 'Incorrect Phone or Password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return new ResponseAPI(400, { message: 'Incorrect Phone or Password' });
    user.password = undefined;

    const access_token = Token.generateAccessToken({
      id: user._id,
    });
    return access_token.then(value => {
      return new ResponseAPI(200, {
        message: 'Login successfully',
        access_token: value,
        data: user,
      });
    });
  }

  static async register(
    phone,
    email,
    fullname,
    username,
    password,
    confirmPassword
  ) {
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

  static async getAllUsers() {
    const users = await User.find({});
    return new ResponseAPI(200, { users: users });
  }

  static async changePassword(email, password, newPassword) {
    // const { email, password, newPassword, confirmNewPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return new ResponseAPI(400, { message: 'User not found!' });
    const isOldPasswordValid = await bcrypt.compare(password, user.password);
    if (!isOldPasswordValid)
      return new ResponseAPI(400, { message: 'Old Password is incorrect!' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return new ResponseAPI(200, { message: 'Password changed successfully!' });
  }

  static async changeInfo(fullname, username, id) {
    const user = await User.findByIdAndUpdate(id, {
      username: username,
      fullname: fullname,
    });
    if (!user) return new ResponseAPI(400, { message: 'User not found!' });

    return new ResponseAPI(200, { message: 'Info change successfully' });
  }

  static async forgotPassword(newPassword, email) {
    const user = await User.findOne({ email });
    if (!user) return new ResponseAPI(400, { message: 'User not found!' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return new ResponseAPI(200, { message: 'Change password successfully!' });
  }

  static async getFriendList(id) {
    const user = await User.findOne({ _id: id });
    if (!user) return new ResponseAPI(400, { message: 'User not exist' });
    let friendList = [];
    for (let i = 0; i < user.friendIdsList.length; i++) {
      const friend = await User.findById(
        user.friendIdsList[i].toString()
      ).select({
        _id: 1,
        fullname: 1,
        avatar: 1,
      });
      if (!friend) return new ResponseAPI(400, 'Friend User not found');
      friendList.push(friend);
    }
    return new ResponseAPI(200, {
      data: { friendList: friendList },
      message: 'Get friendlist successfully!',
    });
  }

  static async getAllContacts(id) {
    const user = await User.findOne({ _id: id });
    if (!user) return new ResponseAPI(400, { message: 'User not exist' });
    // const chatRooms = await ChatRoom.find({
    //   $and: [
    //     { userIds: { $elemMatch: { $eq: user._id.toString() } } },
    //     { userIds: { $elemMatch: { $in: user.friendIdsList } } },
    //   ],
    // }).sort({ updatedAt: 'desc' });
    const chatRoom = await User.findById(id).populate('chatroom');
    // if (chatRooms.length == 0)
    //   return new ResponseAPI(400, { message: 'No contacts available' });
    let contacts = [];
    let chatRoomIdList = [];
    for (let i = 0; i < chatRoom.chatroom.length; i++) {
      let friendList = [];
      for (
        let j = 0;
        j < Math.min(chatRoom.chatroom[i].userIds.length, 3);
        j++
      ) {
        if (chatRoom.chatroom[i].userIds[j].toString() !== id) {
          const friend = await User.findById(
            chatRoom.chatroom[i].userIds[j].toString()
          ).select({
            _id: 1,
            fullname: 1,
            avatar: 1,
          });
          if (!friend) return new ResponseAPI(400, 'Friend User not found');
          friendList.push(friend);
        }
      }
      contacts.push(friendList);
      chatRoomIdList.push(chatRoom.chatroom[i]._id.toString());
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
