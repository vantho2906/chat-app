const { createServer } = require('http');
const socket = require('socket.io');
const { MessageModel } = require('./mesage');
const { FriendInvitationModel } = require('./friendInvitation');

module.exports = {
  socketConnect: async () => {
    const httpServer = createServer();
    const socketServer = httpServer.listen(process.env.SOCKET_PORT);
    const io = socket(socketServer, {
      cors: {
        origin: ['http://localhost:3000', process.env.CLIENT_SOCKET_ENDPOINT],
        credentials: true,
      },
    });
    io.on('connection', socket => {
      console.log('User connected!');
      // data: {
      //   chatRoomId,
      //   message,
      //   senderId,
      // }
      socket.on('send-msg', async data => {
        const { userId, message, chatRoomId } = data;
        socket.join(chatRoomId);
        const result = await MessageModel.addMessage(
          userId,
          message,
          chatRoomId
        );
        if (result.getStatusCode() == 400) {
          io.emit('send-msg-failed', result.getData());
        } else io.to(chatRoomId).emit('receive-msg', data);
      });

      // data: {
      //   myId,
      //   receiverId,
      // }
      socket.on('send-friend-request', async data => {
        const { myId, receiverId } = data;
        socket.join(receiverId);
        const result = await FriendInvitationModel.sendFriendRequest(
          myId,
          receiverId
        );
        if (result.getStatusCode() == 400) {
          io.emit('send-friend-request-failed', result.getData());
        } else io.to(receiverId).emit('receive-friend-request', data);
      });
    });
  },
};
