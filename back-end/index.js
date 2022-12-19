const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./src/DBconnection/db");
const fs = require("fs-extra");
const routes = require("./src/routes/index")
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connection();


app.use('/',routes)

app.get("/photo", async (req, res) => {
  // var filename = req.params.id;
  // file.findOne({ _id: ObjectId(filename) }, (err, image) => {
  //   if (err) console.log(err);
  //   else {
  //     res.contentType("image/jpq");
  //     res.send(image.image.buffer);
  //   }
  // });
  res.sendFile(__dirname + "/src/views/show.html");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
