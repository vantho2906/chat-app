import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import alert from './alertReducer';
import socket from './socketReducer';
import otp from './otpReducer';

export default combineReducers({
  auth,
  alert,
  socket,
  otp,
});
