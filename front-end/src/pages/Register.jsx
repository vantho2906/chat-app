import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authAction';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // console.log(typeof values.avatar);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, phone, email, password, confirmPassword, fullname } =
      values;

    dispatch(register(values));
    navigate('/confirmOTP', {
      state: {
        username: username,
        email: email,
        phone: phone,
        password: password,
        fullname: fullname,
      },
    });
  };

  const handleChange = e => {
    let value = e.target.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-gradient-to-bl from-[#79C7C5] to-[#F9FBFF]">
      <form
        className="flex flex-col w-[350px] h-[450px] bg-[#F9FBFF] bg-opacity-50 rounded-xl items-center gap-2 py-3 justify-center px-14"
        enctype="multipart/form-data"
        onSubmit={e => handleSubmit(e)}
      >
        <div className="text-3xl">
          <h1>Chat-app</h1>
        </div>
        <input
          className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
          type="text"
          placeholder="Fullname"
          name="fullname"
          onChange={e => handleChange(e)}
        />
        <input
          className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
          type="text"
          placeholder="Username"
          name="username"
          onChange={e => handleChange(e)}
        />
        <div className="flex gap-2">
          <input
            className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
            type="email"
            placeholder="Email"
            name="email"
            onChange={e => handleChange(e)}
          />
          <input
            className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
            type="tel"
            placeholder="Phone"
            name="phone"
            onChange={e => handleChange(e)}
          />
        </div>

        <input
          className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
          type="password"
          placeholder="Password"
          name="password"
          onChange={e => handleChange(e)}
        />
        <input
          className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-lg p-2"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={e => handleChange(e)}
        />

        <button
          className="w-full h-[40px] rounded-xl hover:bg-opacity-80 bg-[#777777] text-white"
          type="submit"
        >
          Create User
        </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>{' '}
        </span>
      </form>
    </div>
  );
}

export default Register;
