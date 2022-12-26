const { createServer } = require('http');
const { Server } = require('socket.io');
const { MessageModel } = require('./mesage');
const { FriendInvitationModel } = require('./friendInvitation');

module.exports = {
  socketConnect: async (  ) => {
    const httpServer = createServer();
    httpServer.listen(process.env.SOCKET_PORT);
    const io = new Server(httpServer, {
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
      socket.on('send-msg', data => {
        const { userId, message, chatRoomId } = data;
        socket.join(chatRoomId);
        const result = MessageModel.addMessage(userId, message, chatRoomId);
        if (result.getStatusCode() == 400) {
          io.emit('send-msg-failed', result.getData());
        } else io.to(chatRoomId).emit('receive-msg', data);
      });

      // data: {
      //   myId,
      //   receiverId,
      // }
      socket.on('send-friend-request', data => {
        const { myId, receiverId } = data;
        socket.join(receiverId);
        const result = FriendInvitationModel.sendFriendRequest(
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
