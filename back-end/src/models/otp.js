const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      length: 6,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OTP', OTPSchema);
