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
import { useDispatch } from 'react-redux';
import { confirmOTP, resendOTP, sendOTP } from '../redux/actions/OTPAction';

function ConfirmOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OTPcode, setOTPcode] = useState('');
  const location = useLocation();
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
    navigate('/');
    localStorage.setItem(
      'chap-app-user',
      JSON.stringify({ username, fullname })
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

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
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

const FormContainer = styled.div`
  witdh: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(to bottom left, #79c7c5 40%, #f9fbff 100%);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #777777;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #a1e2d9;
    opacity: 0.5;
    box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
    border-radius: 1rem;
    padding: 2rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #777777;
      color: #777777;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }
    }
    span {
      display: flex;
      justify-content: flex-end;
      margin-top: -10px;
      :hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export default ConfirmOTP;
