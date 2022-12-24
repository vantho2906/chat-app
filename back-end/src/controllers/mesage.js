const User = require('../models/user');
const ChatRoom = require('../models/chatRoom');
const Message = require('../models/message');
const bcrypt = require('bcrypt');

module.exports = {
  getMessages: async (req, res, next) => {
    try {
      const { myId } = req.body;
      const chatRoomId = req.params.chatRoomId;
      const messages = await Message.find({
        chatRoomId: chatRoomId,
      }).sort({ updatedAt: 'asc' });
      const projectedMessages = messages.map(msg => {
        return {
          fromSelf: msg.senderId == myId,
          message: msg.message,
        };
      });
      return res.status(200).send({ data: projectedMessages });
    } catch (ex) {
      next(ex);
    }
  },

  getMessageById: async (req, res, next) => {
    const id = req.params.id;
    const message = await Message.findById(id);
    if (!message)
      return res.status(400).send({ message: 'Message not found!' });
    return res
      .status(200)
      .send({ data: message, message: 'Get message successfully!' });
  },

  addMessage: async (req, res, next) => {
    const chatRoomId = req.params.chatRoomId;
    const { userId, message } = req.body;
    if (message.trim() == '')
      return res.status(400).send({ message: 'Message can not be empty' });
    const data = await Message.create({
      message: message,
      senderId: userId,
      chatRoomId: chatRoomId,
    });
    const result = await ChatRoom.findByIdAndUpdate(chatRoomId, {
      updatedAt: new Date(),
    });
    if (!result)
      return res.status(400).send({ message: 'Unavailable chat room' });
    if (data)
      return res.status(200).send({ message: 'Message added successfully.' });
    return res
      .status(400)
      .send({ message: 'Failed to add message to the database' });
  },

  editMessage: async (req, res, next) => {
    const { msgId } = req.params;
    const { message } = req.body;
    const messageEntity = await Message.findById(msgId);
    if (!messageEntity)
      return res.status(400).send({ message: 'Message not found!' });
    if (message.trim() == '')
      return res.status(400).send({ message: 'Message can not be empty' });
    let now = new Date();
    let time = (now.getTime() - messageEntity.createdAt.getTime()) / 1000;
    if (time > 60 * 10)
      return res
        .status(400)
        .send({ message: 'Time out. Can not edit anymore!' });
    messageEntity.message = message;
    messageEntity.save();
    return res
      .status(200)
      .send({ data: messageEntity, message: 'Edit message successfully!' });
  },

  deleteMessage: async (req, res, next) => {
    const { msgId } = req.params;
    const messageEntity = await Message.findById(msgId);
    if (!messageEntity)
      return res.status(400).send({ message: 'Message not found!' });
    let now = new Date();
    let time = (now.getTime() - messageEntity.createdAt.getTime()) / 1000;
    if (time > 60 * 10)
      return res
        .status(400)
        .send({ message: 'Time out. Can not delete anymore!' });
    messageEntity.message = '';
    messageEntity.save();
    return res
      .status(200)
      .send({ data: messageEntity, message: 'Delete message successfully' });
  },
};
