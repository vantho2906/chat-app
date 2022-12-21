const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    length: 10,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    length: 10,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  avatar: {
    contentType: {
      type: String,
    },
    imageBase64: {
      type: String,
    },
  },
  friendIdsList: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
