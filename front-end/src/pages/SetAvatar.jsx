import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function SetAvatar() {
  const [avatarName, setAvatarName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {};

  return (
    <FormContainer>
      <form>
        <div className="brand">
          <h1>Set Avatar</h1>
        </div>
        <div className="input-file">
          <label htmlFor="file">
            <FontAwesomeIcon icon={faImage} size="lg" />
            <p>{avatarName ? `File: ${avatarName}` : "Add an avatar"}</p>
          </label>
          <input
            type="file"
            id="file"
            name="file"
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
                setAvatar(null);
              }}
            />
          )}
        </div>
        <img src={avatar} alt="" />
        <button type="submit">Confirm</button>
      </form>
    </FormContainer>
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
    background-color: rgba(161, 226, 217, 0.5);
    box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
    border-radius: 1rem;
    padding: 2rem 5rem;
    align-items: center;
    img {
      width: 10rem;
      height: 10rem;
      object-fit: cover;
      border-radius: 50%;
    }
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
    .input-file {
      position: relative;
      #close-icon {
        position: absolute;
        right: -1.5rem;
        top: 1.2rem;
        cursor: pointer;
      }
    }
    label {
      display: flex;
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #777777;
      color: #777777;
      border-radius: 0.4rem;
      width: 250px;
      font-size: 1rem;
      text-transform: none;
      align-items: center;
      overflow: hidden;
      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }
      p {
        padding-left: 1rem;
      }
    }

    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      width: 100%;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export default SetAvatar;
