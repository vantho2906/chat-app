const express = require('express');
const cors = require('cors');
const app = express();
const DBconnection = require('./DBconnection/db');
const routes = require('./routes/index');
const { socketConnect } = require('./models/socket');
require('dotenv').config();
const { createServer } = require('http');
const socket = require('socket.io');
const { MessageModel } = require('../src/models/mesage');
const { FriendInvitationModel } = require('../src/models/friendInvitation');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

DBconnection();
// socketConnect();

app.use('/', routes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});


global.onlineUsers = new Map();
io.on('connection', socket => {
  console.log('connected');
  socket.on('join-room', (data) => {
    socket.join(data);
  })

  socket.on('send-msg', async data => {
   socket.to(data.chatRoomId).emit('receive-msg', data);
  });
});