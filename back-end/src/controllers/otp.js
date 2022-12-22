const { OTPgenerate } = require("../utils/OTPutil");
const OTPmodel = require("../models/otp");
const Usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports = {
  sendOTP: async (req, res, next) => {
    const { username, email } = req.body;
    const OTPcode = OTPgenerate();
    const OTPentity = await OTPmodel.create({
      code: OTPcode,
      username: username,
      email: email,
    });
    const text = `Hi ${username}, your phone number verification OTP is ${OTPcode}. OTP is only valid for 2 minutes`;
    // Create a transporter object for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_ACCOUNT,
      to: email,
      subject: "Sending OTP",
      text: text,
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(400)
          .send({ message: "Send OTP failed!", error: error });
      } else {
        return res.status(200).send({ message: "Send OTP successfully!" });
      }
    });
  },

  resendOTP: async (req, res, next) => {
    const { username, email } = req.body;
    const OTPcode = OTPgenerate();
    const OTPentity = await OTPmodel.findOneAndUpdate(
      { username: username, email: email },
      { code: OTPcode }
    );
    const text = `Hi ${username}, your email verification OTP is ${OTPcode}. OTP is only valid for 2 minutes`;
    // Create a transporter object for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_ACCOUNT,
      to: email,
      subject: "Sending OTP",
      text: text,
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(400)
          .send({ message: "Send OTP failed!", error: error });
      } else {
        return res.status(200).send({ message: "Resend OTP successfully!" });
      }
    });
  },

  confirmOTP: async (req, res, next) => {
    const { OTPcode, fullname, username, phone, password } = req.body;
    const OTPentity = await OTPmodel.findOne({ code: OTPcode });
    console.log(OTPentity);
    let now = new Date();
    if (OTPentity) {
      let time = (now.getTime() - OTPentity.updatedAt.getTime()) / 1000;
      if (time > 120)
        return res.status(400).send({ message: "Your OTP is expired" });
    }
    if (!OTPentity)
      return res.status(400).send({ message: "You enter wrong OTP" });
    if (OTPentity.username != username || OTPentity.phone != phone)
      return res.status(400).send({ message: "You enter wrong OTP" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Usermodel.create({
      fullname,
      username,
      phone,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(200).send({
      message: "You enter OTP right. Register successfully!",
      data: user,
    });
  },
};
