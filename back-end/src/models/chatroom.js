const User = require('../entities/user');
const ChatRoom = require('../entities/chatRoom');
const { ResponseAPI } = require('../utils/response');

class ChatroomModel {
  static async createChatroom(userIDs) {
    const doc = await ChatRoom.create({
      userIds: userIDs,
    });
    for (let i = 0; i < userIDs.length; i++) {
      await User.findByIdAndUpdate(userIDs[i].toString(), {
        $push: { chatroom: doc._id },
      });
    }
    return new ResponseAPI(200, { message: 'Create chatroom successfully!' });
  }
}

exports.ChatroomModel = ChatroomModel;
