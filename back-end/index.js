const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const connection = require('./src/DBconnection/db');
const routes = require('./src/routes/index');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connection();
app.get('/index', async (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html');
});
app.use('/socket', (req, res) =>
  res.sendFile(__dirname + '/src/views/test.html')
);
app.use('/', routes);

app.get('/photo', async (req, res) => {
  res.sendFile(__dirname + '/src/views/show.html');
});

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
  global.chatSocket = socket;
  socket.on('add-user', userId => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', data => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});
