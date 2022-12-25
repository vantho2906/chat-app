const { createServer } = require('http');
const { Server } = require('socket.io');
const { MessageModel } = require('./mesage');
const { FriendInvitationModel } = require('./friendInvitation');

module.exports = {
  socketConnect: async () => {
    const httpServer = createServer();
    const io = new Server(httpServer, {
      cors: {
        origin: ['http://localhost:3000', process.env.CLIENT_SOCKET_ENDPOINT],
        credentials: true,
      },
    });

    // const socket = io()
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
        } else io.to(chatRoomId).emit(data);
      });

      // data: {
      //   myId,
      //   receiverId,
      // }

      //  client
      socket.emit('send-msg', data)


      socket.on('send-friend-request', data => {
        const { myId, receiverId } = data;
        socket.join(receiverId);
        const result = FriendInvitationModel.sendFriendRequest(
          myId,
          receiverId
        );
        if (result.getStatusCode() == 400) {
          io.emit('send-friend-request-failed', result.getData());
        } else io.to(receiverId).emit(data);
      });
    });
  },
};
