const ChatRoom = require('../entities/chatRoom');
const Message = require('../entities/message');
const User = require('../entities/user');
const mongoose = require('mongoose');

const { ResponseAPI } = require('../utils/response');

class MessageModel {
  static async getMessages(myId, chatRoomId) {
    // const { myId } = req.body;
    // const chatRoomId = req.params.chatRoomId;

    const messages = await Message.aggregate([
      {
        $match: {
          chatRoomId: chatRoomId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: '_id',
          as: 'sender',
        },
      },
      { $unwind: '$sender' },
    ]);

    return new ResponseAPI(200, { data: messages });
  }

  static async getMessageById(id) {
    // const id = req.params.id;
    const message = await Message.findById(id);
    if (!message)
      return new ResponseAPI(400, { message: 'Message not found!' });
    return new ResponseAPI(200, {
      data: message,
      message: 'Get message successfully!',
    });
  }

  static async addMessage(userId, message, chatRoomId) {
    // const chatRoomId = req.params.chatRoomId;
    // const { userId, message } = req.body;
    const data = await Message.create({
      message: message,
      senderId: userId,
      chatRoomId: chatRoomId,
    });
    const result = await ChatRoom.findByIdAndUpdate(chatRoomId, {
      updatedAt: new Date(),
    });
    if (!result)
      return new ResponseAPI(400, { message: 'Unavailable chat room' });
    if (data)
      return new ResponseAPI(200, { message: 'Message added successfully.' });
    return res
      .status(400)
      .send({ message: 'Failed to add message to the database' });
  }

  static async editMessage(msgId, message) {
    // const { msgId } = req.params;
    // const { message } = req.body;
    const messageEntity = await Message.findById(msgId);
    if (!messageEntity)
      return new ResponseAPI(400, { message: 'Message not found!' });
    let now = new Date();
    let time = (now.getTime() - messageEntity.createdAt.getTime()) / 1000;
    if (time > 60 * 10)
      return res
        .status(400)
        .send({ message: 'Time out. Can not edit anymore!' });
    messageEntity.message = message;
    messageEntity.save();
    return new ResponseAPI(200, {
      data: messageEntity,
      message: 'Edit message successfully!',
    });
  }

  static async deleteMessage(msgId) {
    // const { msgId } = req.params;
    const messageEntity = await Message.findById(msgId);
    if (!messageEntity)
      return new ResponseAPI(400, { message: 'Message not found!' });
    let now = new Date();
    let time = (now.getTime() - messageEntity.createdAt.getTime()) / 1000;
    if (time > 60 * 10)
      return res
        .status(400)
        .send({ message: 'Time out. Can not delete anymore!' });
    messageEntity.message = '';
    messageEntity.save();
    return new ResponseAPI(200, {
      data: messageEntity,
      message: 'Delete message successfully',
    });
  }
}

exports.MessageModel = MessageModel;
