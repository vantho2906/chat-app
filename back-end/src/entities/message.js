const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    chatRoomId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
