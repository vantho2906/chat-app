const otpGenerator = require('otp-generator');

module.exports = {
  OTPgenerate: () => {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
  },
};
