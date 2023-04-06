const { FriendInvitationModel } = require('../models/friendInvitation');
const { ChatroomModel } = require('../models/chatroom');

class ChatRoomMiddleware {
  static async createChatroom(req, res, next) {
    const userIDs = req.body;
    const result = await ChatroomModel.createChatroom(userIDs);
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.ChatRoomMiddleware = ChatRoomMiddleware;
