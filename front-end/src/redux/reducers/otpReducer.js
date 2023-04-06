const otpReducer = (state = {}, action) => {
  switch (action.type) {
    case 'OTP':
      return action.payload;
    default:
      return state;
  }
};

export default otpReducer;
