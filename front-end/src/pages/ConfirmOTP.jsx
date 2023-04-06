import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
  sendOTPRoute,
  resendOTPRoute,
  confirmOTPRoute,
} from '../utils/APIRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOTP, resendOTP, sendOTP } from '../redux/actions/OTPAction';

function ConfirmOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OTPcode, setOTPcode] = useState('');
  const location = useLocation();
  const { otp } = useSelector(state => state);
  const { username, email, phone, password, fullname } = location.state;

  const handleChange = e => {
    setOTPcode(e.target.value);
  };
  useEffect(() => {
    const handleSendOTP = async () => {
      dispatch(sendOTP({ username: username, email: email }));
    };
    handleSendOTP();
  }, []);

  useEffect(() => {
    if (otp.check) {
      navigate('/login');
    }
  }, [otp]);

  const handleResendOTP = async () => {
    dispatch(resendOTP({ username: username, email: email }));
  };

  const handleSubmitOTP = async e => {
    e.preventDefault();

    dispatch(
      confirmOTP({
        OTPcode: OTPcode,
        username: username,
        email: email,
        fullname: fullname,
        phone: phone,
        password: password,
      })
    );

    // const data = axios.post(confirmOTPRoute, {
    //   OTPcode,
    //   email,
    //   username,
    //   fullname,
    //   phone,
    //   password,
    // });
    // data.then(res => {
    //   if (res.status === 200) {
    //     console.log('successfully');
    //     navigate('/register/avatar', {
    //       state: {
    //         username: username,
    //       },
    //     });
    //   }
    // });
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-gradient-to-bl from-[#79C7C5] to-[#F9FBFF]">
      <form
        onSubmit={e => handleSubmitOTP(e)}
        className="flex flex-col w-[350px] h-[250px] bg-[#F9FBFF] bg-opacity-50 rounded-xl items-center gap-2 py-3 justify-center px-14"
      >
        <div className="text-3xl">
          <h1>Confirm OTP</h1>
        </div>
        <input
          type="text"
          placeholder="OTP Code"
          onChange={e => handleChange(e)}
          value={OTPcode}
          className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
        />
        <span
          className="w-full flex flex-row justify-end mt-[-6px] hover:text-blue-500 cursor-pointer"
          onClick={() => handleResendOTP()}
        >
          Resend OTP
        </span>
        <button
          type="submit"
          className="w-full h-[40px] rounded-xl hover:bg-opacity-80 bg-[#777777] text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default ConfirmOTP;
