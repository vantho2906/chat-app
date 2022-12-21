import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  sendOTPRoute,
  resendOTPRoute,
  confirmOTPRoute,
} from "../utils/APIRoutes";
import { useNavigate, useLocation } from "react-router-dom";

function ConfirmOTP() {
  const navigate = useNavigate();
  const [OTPcode, setOTPcode] = useState("");
  const location = useLocation();
  const { username, phone, password, fullname } = location.state;

  const handleChange = (e) => {
    setOTPcode(e.target.value);
  };
  useEffect(() => {
    const handleSendOTP = async () => {
      console.log(username, phone);
      const data = await axios.post(sendOTPRoute, {
        username,
        phone,
      });
      console.log(data);
    };
    handleSendOTP();
  }, []);

  const handleResendOTP = async () => {
    const data = await axios.post(resendOTPRoute, {
      username,
      phone,
    });
    console.log(data);
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const data = axios.post(confirmOTPRoute, {
      OTPcode,
      fullname,
      username,
      phone,
      password,
    });
    console.log(data);
    data.then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("successfully");
        navigate("/chat");
      }
    });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmitOTP(e)}>
          <div className="brand">
            <h1>Confirm OTP</h1>
          </div>
          <input
            type="text"
            placeholder="OTP Code"
            onChange={(e) => handleChange(e)}
            value={OTPcode}
          />
          <span onClick={() => handleResendOTP()}>Resend OTP</span>
          <button type="submit">Submit</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
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
