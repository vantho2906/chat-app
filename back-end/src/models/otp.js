const { OTPgenerate } = require('../utils/OTPutil');
const OTPmodel = require('../entities/otp');
const Usermodel = require('../entities/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { ResponseAPI } = require('../utils/response');

class otpModel {
  static async sendEmail(email, text) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Sending OTP',
      text: text,
    };
    try {
      transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
  static async sendOTP(username, email) {
    // const { username, email } = req.body;
    const OTPcode = OTPgenerate();
    const OTPentity = await OTPmodel.create({
      code: OTPcode,
    });
    const text = `Hi ${username}, your email verification OTP is ${OTPcode}. OTP is only valid for 2 minutes`;
    let check = await this.sendEmail(email, text);
    if (check)
      return new ResponseAPI(200, { message: 'Send OTP successfully!' });
    return new ResponseAPI(400, { message: 'Send OTP failed!' });
  }

  static async resendOTP(username, email) {
    // const { username, email } = req.body;
    const OTPcode = OTPgenerate();
    const OTPentity = await OTPmodel.create({
      code: OTPcode,
    });
    const text = `Hi ${username}, your email verification OTP is ${OTPcode}. OTP is only valid for 2 minutes`;
    let check = await this.sendEmail(email, text);
    if (check)
      return new ResponseAPI(200, { message: 'Send OTP successfully!' });
    return new ResponseAPI(400, { message: 'Send OTP failed!' });
  }

  static async confirmOTP(OTPcode, username, phone, password, email, fullname) {
    // const { OTPcode, username, phone, password, email, fullname } = req.body;
    const OTPentity = await OTPmodel.findOne({ code: OTPcode });
    let now = new Date();
    if (OTPentity) {
      if (OTPentity) {
        let time = (now.getTime() - OTPentity.updatedAt.getTime()) / 1000;
        if (time > 120)
          return new ResponseAPI(400, { message: 'Your OTP is expired' });
      }
      if (!OTPentity)
        return new ResponseAPI(400, { message: 'You enter wrong OTP' });
      // if (OTPentity.username != username || OTPentity.email != email)
      //   return new ResponseAPI(400, { message: 'You enter wrong OTP' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Usermodel.create({
        fullname,
        username,
        phone,
        password: hashedPassword,
        email,
        chatroom: [],
      });
      user.password = undefined;
      return new ResponseAPI(200, {
        message: 'You enter OTP right. Register successfully!',
        data: user,
      });
    }
    return new ResponseAPI(400, { message: 'Wrong OTP!' });
  }
}

exports.otpModel = otpModel;
