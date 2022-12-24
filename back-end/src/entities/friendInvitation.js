const mongoose = require('mongoose');

const friendInvitationSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      require: true,
    },
    receiverId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: 'processing', // 'cancelled' and 'agreed'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FriendInvitation', friendInvitationSchema);
