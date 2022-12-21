const mongoose = require("mongoose");

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
    phone: {
      type: String,
      required: true,
      length: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OTP", OTPSchema);
