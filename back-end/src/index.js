const express = require('express');
const cors = require('cors');
const app = express();
const DBconnection = require('./DBconnection/db');
const routes = require('./routes/index');
const { socketConnect } = require('./models/socket');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

DBconnection();
socketConnect();

app.use('/', routes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});x  
