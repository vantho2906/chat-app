import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // console.log(typeof values.avatar);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(() => {
  //   if (localStorage.getItem("chat-app-user")) {
  //     navigate("/");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, phone, email, password, confirmPassword, fullname } =
        values;
      console.log(values);
      const data = await axios.post(registerRoute, {
        email,
        username,
        phone,
        password,
        confirmPassword,
      });
      // const { message } = await axios.post(avatarRoute, {
      //   id,
      // });
      if (data.status === 400) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === 200) {
        // localStorage.setItem("chat-app-user", JSON.stringify(data.data));
        navigate("/register/avatar", {
          state: {
            username: username,
            phone: phone,
            password: password,
            fullname: fullname,
          },
        });
      }
    } else {
    }
  };

  const handleValidation = () => {
    const { username, email, phone, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email must be required", toastOptions);
      return false;
    } else if (phone === "") {
      toast.error("Phone must be required", toastOptions);
      return false;
    } else if (phone.length !== 10) {
      toast.error("Phone must have 10 numbers", toastOptions);
      return false;
    } else if (
      phone[0] !== "0" ||
      (phone[1] !== "3" &&
        phone[1] !== "5" &&
        phone[1] !== "7" &&
        phone[1] !== "8")
    ) {
      toast.error("Phone number invalid", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    let value = e.target.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  return (
    <>
      <FormContainer>
        <form enctype="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <h1>Chap-app</h1>
          </div>
          <input
            type="text"
            placeholder="Fullname"
            name="fullname"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>{" "}
          </span>
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
  gap: 0.5rem;
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
    background-color: rgba(161, 226, 217, 0.5);
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
    #file {
      display: none;
    }
    #input-file {
      position: relative;
    }
    label {
      display: flex;
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #777777;
      color: #777777;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      text-transform: none;
      align-items: center;
      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }

      p {
        padding-left: 1rem;
      }
    }
    #close-icon {
      position: absolute;
      right: -1.5rem;
      top: 1rem;
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
    span {
      font-weight: bold;
      text-transform: uppercase;
      a {
        text-decoration: none;
      }
    }
  }
`;

export default Register;
