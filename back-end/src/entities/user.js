const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    length: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

module.exports = mongoose.model('User', userSchema);
