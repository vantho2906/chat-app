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
    // io.set('transports', ['websocket']);
    const onlineUsers = {};
    const offlineUsersTime = {}; // key is id of user, value is time offline
    const globalUsers = {};
    io.on('connection', socket => {
      // console.log('connected');
      socket.on('join-room', data => {
        socket.join(data);
      });

      socket.on('send-msg', async data => {
        socket.broadcast.to(data.chatRoomId).emit('receive-msg', data);
      });

      socket.on('login', function (data) {
        console.log('a user ' + data.userId + ' connected');
        onlineUsers[socket.id] = data.userId;
        globalUsers[data.userId] = socket.id;
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
        await delete onlineUsers[socket.id];
        await io.emit('onlineUser', {
          onlineUsers: onlineUsers,
          offlineUsersTime: offlineUsersTime,
        });

        // io.emit('onlineUser', onlineUsers)
      });

      socket.on('send-friend-request', async data => {
        console.log(data.receiverId, data.myId);
        socket
          .to(globalUsers[data.receiverId])
          .emit('get-friend-request', data.myId);
      });
    });
  },
};
