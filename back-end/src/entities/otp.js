const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      length: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OTP', OTPSchema);
