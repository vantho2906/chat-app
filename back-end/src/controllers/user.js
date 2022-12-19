const User = require("../models/user");
const ChatRoom = require("../models/chatRoom");
const bcrypt = require("bcrypt");
var ObjectId = require("mongodb").ObjectId;

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
      delete user.password;
      return res.status(200).send({ data: user });
    } catch (ex) {
      next(ex);
    }
  },

  register: async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      const phoneCheck = await User.findOne({ phone });
      if (phoneCheck)
        return res.status(400).send({ message: "Phone already used" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        phone,
        password: hashedPassword,
      });
      delete user.password;
      return res.status(200).send({ data: user });
    } catch (ex) {
      next(ex);
    }
  },

  getAllContacts: async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: ObjectId(id) });
    if (!user) return res.status(400).send({ message: "User not exist" });
    const chatRooms = await ChatRoom.find({
      userIds: { $elemMatch: { $eq: user._id.toString() } },
    }).sort({ updatedAt: "desc" });
    if(chatRoom.length == 0)
      return res.status(400).send({ message: "No contacts available" });
    let contacts = []
    chatRooms.map(chatRoom => {
      let friendId =
        chatRoom.userIds[0] != id ? chatRoom.userIds[0] : chatRoom.userIds[1];
      User.findById(friendId).select({_id: 1,fullname: 1, avatar: 1}).exec((err, user) => {
        user.chatRoomId = chatRoom._id.toString();
        contacts.push(user)
      })
    })
    return res.status(200).send({ data: contacts, message: "Get all contacts successfully!" });
  },

  findByFullname: async (req, res, next) => {
    const {fullname} = req.body
    const regex = new RegExp('/'+fullname+'/i')
    const users = await User.find({fullname: {$regex: regex }}).select({_id: 1, fullname: 1, avatar: 1})
    return res.status(200).send({data: users, message: "Find users successfully!"})
  },

  findByPhone: async (req, res, next) => {
    const { phone } = req.body;
    const user = await User.find({ phone: phone }).select({
      _id: 1,
      fullname: 1,
      avatar: 1,
    });
    return res
      .status(200)
      .send({ data: users, message: "Find user successfully!" });
  }
}
