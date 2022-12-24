const {createServer} = require('http')
const {Server} = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', process.env.CLIENT_SOCKET_ENDPOINT],
    credentials: true
  }
})

// data: {
//   chatRoomId,
//   message,
//   senderId,
// }
io.on('connection', (socket) => {
  socket.on('send-msg', (data) => {
    socket.join(data.chatRoomId)
    io.to(data.chatRoomId).emit(data)
  })
})


