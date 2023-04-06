const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const DBconnection = require('./DBconnection/db');
const routes = require('./routes/index');
const { socketConnect } = require('./models/socket');
require('dotenv').config();
app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

DBconnection();

app.use('/', routes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});

socketConnect(server);
