const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const connection = require('./DBconnection/db');
const routes = require('./routes/index');
const { socketConnect } = require('./models/socket');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection();
socketConnect()

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
