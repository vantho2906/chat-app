const User = require("../models/user");
const ChatRoom = require("../models/chatRoom");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      const user = await User.findOne({ phone: phone });
      if (!user)
        return res.status(400).send({ message: "Incorrect Phone or Password" });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).send({
          message: "Incorrect Phone or Password",
        });
      user.password = undefined;
      return res.status(200).send({ data: user });
    } catch (ex) {
      next(ex);
    }
  },

  register: async (req, res, next) => {
    try {
      const { phone, username, password, confirmPassword } = req.body;
      const phoneCheck = await User.findOne({ phone });
      if (phoneCheck)
        return res.status(400).send({ message: "Phone already used" });
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.status(400).send({ message: "Username already used" });
      if (password != confirmPassword)
        return res
          .status(400)
          .send({ message: "Password and confirm password are not the same" });
      return res.status(200).send({ message: "Skip this step successfully!" });
    } catch (ex) {
      next(ex);
    }
  },

  getAllContacts: async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).send({ message: "User not exist" });
    const chatRooms = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { $eq: user._id.toString() } } },
        { userIds: { $elemMatch: { $in: user.friendIdsList } } },
      ],
    }).sort({ updatedAt: "desc" });
    if (chatRoom.length == 0)
      return res.status(400).send({ message: "No contacts available" });
    let contacts = [];
    chatRooms.map((chatRoom) => {
      let friendId =
        chatRoom.userIds[0] != id ? chatRoom.userIds[0] : chatRoom.userIds[1];
      User.findById(friendId)
        .select({ _id: 1, fullname: 1, avatar: 1 })
        .exec((err, user) => {
          user.chatRoomId = chatRoom._id.toString();
          contacts.push(user);
        });
    });
    return res
      .status(200)
      .send({ data: contacts, message: "Get all contacts successfully!" });
  },
  
  getCurrentUser: async (userId) => {
    const user =  await User.findById(userId);
    if(!user) return false
    user.password = undefined
    return user
  }

};
