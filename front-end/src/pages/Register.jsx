import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [avatarName, setAvatarName] = useState("");
  const [values, setValues] = useState({
    username: "",
    emailPhone: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, emailPhone, password, confirmPassword, avatar } =
        values;
      const { data } = await axios.post(registerRoute, {
        username,
        emailPhone,
        password,
        avatar,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    } else {
    }
  };

  const handleValidation = () => {
    const { username, emailPhone, password, confirmPassword, avatar } = values;
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
    } else if (emailPhone === "") {
      toast.error("Email must be required", toastOptions);
      return false;
    } else if (avatar === null) {
      toast.error("avatar must be required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <h1>Chap-app</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Email / Phone"
            name="emailPhone"
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
          <div id="input-file">
            <label htmlFor="avatar">
              <FontAwesomeIcon icon={faImage} size="lg" />
              <p>{avatarName ? `File: ${avatarName}` : "Add an avatar"}</p>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setAvatarName(e.target.files[0].name);
                handleChange(e);
              }}
            />
            {avatarName && (
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="1x"
                id="close-icon"
                onClick={() => {
                  setAvatarName("");
                  values.avatar = null;
                }}
              />
            )}
          </div>

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
    gap: 1.5rem;
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
    #avatar {
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
