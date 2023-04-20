import {
  confirmOTPRoute,
  resendOTPRoute,
  sendOTPRoute,
} from '../../utils/APIRoutes';
import { postAPI } from '../../utils/FetchData';

export const sendOTP = userInfo => async dispatch => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI(sendOTPRoute, userInfo);
    // console.log(res);
    dispatch({ type: 'ALERT', payload: { loading: false } });

    // dispatch({ type: 'ALERT', payload: { success: 'success' } });
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.message } });
  }
};

export const confirmOTP = userInfo => async dispatch => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI(confirmOTPRoute, userInfo);
    if (res.status === 200) {
      dispatch({ type: 'ALERT', payload: { success: res.data.message } });
      dispatch({ type: 'OTP', payload: { check: true } });
    } else {
      dispatch({ type: 'ALERT', payload: { errors: res.data.message } });
      dispatch({ type: 'OTP', payload: { check: false } });
    }
    dispatch({ type: 'ALERT', payload: { loading: false } });
  } catch (err) {
    dispatch({ type: 'OTP', payload: { check: false } });
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.message } });
  }
};

export const resendOTP = userInfo => async dispatch => {
  try {
    dispatch({ type: 'ALERT', payload: { loading: true } });
    const res = await postAPI(resendOTPRoute, userInfo);
    // dispatch({ type: 'ALERT', payload: { loading: false } });
    if (res.status === 200) {
      dispatch({ type: 'ALERT', payload: { success: res.data.message } });
    } else {
      dispatch({ type: 'ALERT', payload: { errors: res.data.message } });
    }
  } catch (err) {
    dispatch({ type: 'ALERT', payload: { errors: err.response.data.message } });
  }
};
