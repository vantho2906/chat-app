const { OTPgenerate } = require("../utils/OTPutil");
const OTPmodel = require("../models/otp");
const Usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const { CourierClient } = require("@trycourier/courier");

module.exports = {
  sendOTP: async (req, res, next) => {
    const { username, phone } = req.body;
    const OTPcode = OTPgenerate();
    const OTPentity = OTPmodel.create({
      code: OTPcode,
      username: username,
      phone: phone,
    });
    const courier = CourierClient({
      authorizationToken: process.env.COURIER_TOKEN,
    });
    const { requestId } = await courier.send({
      message: {
        to: {
          phone_number: "84" + phone,
        },
        template: "QHPFQKVS4R4T09HZY083AGEXA70S",
        data: {
          recipientName: username,
          OTPcode: OTPcode,
        },
      },
    });
    return res
      .status(200)
      .send({ message: "send OTP successfully!", data: OTPentity });
  },

  resendOTP: async (req, res, next) => {
    const { username, phone } = req.body;
    const OTPcode = OTPgenerate();
    const OTPentity = await OTPmodel.findOneAndUpdate(
      { username: username, phone: phone },
      { code: OTPcode }
    );
    const courier = CourierClient({
      authorizationToken: "pk_prod_NVE4N6VZG04BFRKFTRHPNN9YJSZW",
    });
    const { requestId } = await courier.send({
      message: {
        to: {
          phone_number: "84" + phone,
        },
        template: "QHPFQKVS4R4T09HZY083AGEXA70S",
        data: {
          recipientName: username,
          code: OTPcode,
        },
      },
    });
    return res.status(200).send({ message: "send OTP successfully!" });
  },

  confirmOTP: async (req, res, next) => {
    const { OTPcode, username, phone, password } = req.body;
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
      username: username,
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
