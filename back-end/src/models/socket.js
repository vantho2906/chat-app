const { createServer } = require('http');
const socket = require('socket.io');
const { MessageModel } = require('./mesage');
const { FriendInvitationModel } = require('./friendInvitation');
const { UserModel } = require('./user');
const User = require('../entities/user');

module.exports = {
  socketConnect: async server => {
    const io = socket(server, {
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });
    const onlineUsers = {};
    const offlineUsersTime = {}; // key is id of user, value is time offline
    io.on('connection', socket => {
      // console.log('connected');
      socket.on('join-room', data => {
        socket.join(data);
      });

      socket.on('send-msg', async data => {
        socket.to(data.chatRoomId).emit('receive-msg', data);
      });

      socket.on('login', function (data) {
        console.log('a user ' + data.userId + ' connected');
        onlineUsers[socket.id] = data.userId;
        delete offlineUsersTime[data.userId];
        // saving userId to object with socket ID
        io.emit('onlineUser', {
          onlineUsers: onlineUsers,
          offlineUsersTime: offlineUsersTime,
        });
      });

      socket.on('disconnect', async function () {
        console.log('user ' + onlineUsers[socket.id] + ' disconnected');
        offlineUsersTime[onlineUsers[socket.id]] = new Date();
        // remove saved socket from users object
        const user = await User.findById(onlineUsers[socket.id]);
        if (user) {
          user.offlineAt = new Date();
          await user.save();
        }
        delete onlineUsers[socket.id];
        io.emit('onlineUser', {
          onlineUsers: onlineUsers,
          offlineUsersTime: offlineUsersTime,
        });

        // io.emit('onlineUser', onlineUsers)
      });

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
