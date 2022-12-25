const { MessageModel } = require('../models/mesage');

class MessageMiddleware {
  static async getMessages(req, res, next) {
    const { myId } = req.body;
    const chatRoomId = req.params.chatRoomId;
    const result = await MessageModel.getMessages(myId, chatRoomId);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async getMessageById(req, res, next) {
    const id = req.params.id;
    const result = await MessageModel.getMessageById(id);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async addMessage(req, res, next) {
    const chatRoomId = req.params.chatRoomId;
    const { userId, message } = req.body;
    if (message.trim() == '')
      return res.status(400).send({ message: 'Message can not be empty' });
    const result = await MessageModel.addMessage(userId, message, chatRoomId);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async editMessage(req, res, next) {
    const { msgId } = req.params;
    const { message } = req.body;
    if (message.trim() == '')
      return res.status(400).send({ message: 'Message can not be empty' });
    const result = await MessageModel.editMessage(msgId, message);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async deleteMessage(req, res, next) {
    const { msgId } = req.params;
    const result = await MessageModel.deleteMessage(msgId);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.MessageMiddleware = MessageMiddleware;
