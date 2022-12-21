const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./src/DBconnection/db");
const routes = require("./src/routes/index")
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connection();


app.use('/',routes)

app.get("/photo", async (req, res) => {
  res.sendFile(__dirname + "/src/views/show.html");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
