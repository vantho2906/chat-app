const User = require("../models/user");
const ChatRoom = require("../models/chatRoom");
const Message = require("../models/message");
const bcrypt = require("bcrypt");

module.exports = {
  getMessages: async (req, res, next) => {
    try {
      const { myId } = req.body;
      const chatRoomId = req.params.chatRoomId;
      const messages = await Message.find({
        chatRoomId: chatRoomId,
      }).sort({ updatedAt: "asc" });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.senderId == myId,
          message: msg.message,
        };
      });
      return res.status(200).send({data: projectedMessages});
    } catch (ex) {
      next(ex);
    }
  },

  addMessage: async (req, res, next) => {
    try {
      const chatRoomId = req.params.chatRoomId;
      const { myId, message } = req.body;
      const data = await Message.create({
        message: message,
        senderId: myId,
        chatRoomId: chatRoomId,
      });
      const result = await ChatRoom.findByIdAndUpdate(chatRoomId, {
        updatedAt: new Date(),
      });
      if (!result)
        return res
          .status(400)
          .send({ message: "Unavailable chat room" });
      if (data)
        return res.status(200).send({ message: "Message added successfully." });
      return res
        .status(400)
        .send({ message: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  },
  
  
};
