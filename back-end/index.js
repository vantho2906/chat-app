const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const DBconnection = require('./src/DBconnection/db');
const routes = require('./src/routes/index');
const { socketConnect } = require('./src/models/socket');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);

DBconnection();

app.use('/api/v1', routes);

socketConnect(server);

server.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
