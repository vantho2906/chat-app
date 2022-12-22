const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    userIds: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Chatroom', chatRoomSchema);
