import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
  sendOTPRoute,
  resendOTPRoute,
  confirmOTPRoute,
  finalStepRegisterRoute,
} from '../utils/APIRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOTP, resendOTP } from '../redux/actions/OTPAction';
import { postAPI } from '../utils/FetchData';
import { useMutation } from 'react-query';

function ConfirmOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OTPcode, setOTPcode] = useState('');
  const location = useLocation();
  const { otp } = useSelector(state => state);
  const { userInfo } = location.state;

  const handleChange = e => {
    setOTPcode(e.target.value);
  };

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  useEffect(() => {
    if (otp.check) {
      toast.success('Register success!', toastOptions);
      navigate('/login');
    }
  }, [otp]);

  const { mutate: resendOTP, isLoading: isResendingOTP } = useMutation({
    mutationFn: info => {
      return postAPI(resendOTPRoute, info);
    },
    onError: error => {
      toast.error(error.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
    },
  });

  const { mutate: confirmOTP, isLoading: isConfirmingOTP } = useMutation({
    mutationFn: info => {
      return postAPI(finalStepRegisterRoute, info);
    },
    onError: error => {
      toast.error(error.data.message, toastOptions);
    },
    onSuccess: data => {
      console.log(data);
      // toast.success(data.data.message, toastOptions);
    },
  });

  const handleResendOTP = async () => {
    // resendOTP({ username: username, email: email });
  };

  const handleSubmitOTP = async e => {
    e.preventDefault();

    confirmOTP({
      userOTP: OTPcode,
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      password: userInfo.password,
    });
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
          className="w-full h-[40px] rounded-xl hover:bg-opacity-80 bg-[#63a09e] text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default ConfirmOTP;
