import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faRightFromBracket,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Menu({ avatar, fullname, username, socket, handleSetMenu }) {
  const navigate = useNavigate();
  return (
    <Container>
      <div
        onClick={() => {
          handleSetMenu();
        }}
        className="back-btn"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </div>
      <div className="brand">
        <img src={'data:image/png;base64, ' + avatar.imageBase64} alt="" />
        <h3>{fullname}</h3>
      </div>
      <div className="nav">
        <div
          onClick={() => {
            navigate('/register/avatar', {
              state: {
                username: username,
                back: '123',
              },
            });
          }}
        >
          <h3>Set Avatar</h3>
          <FontAwesomeIcon icon={faImage} size="2x" />
        </div>
        <div
          onClick={() => {
            socket.current.disconnect(true);
            localStorage.clear();
            navigate('/login');
            window.location.reload();
          }}
        >
          <h3>Log out</h3>
          <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 30% 70%;
  background-color: rgba(249, 251, 255, 0.5);
  box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
  overflow: hidden;
  padding: 2rem 1rem;
  gap: 3rem;
  position: relative;

  .back-btn {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    background: transparent;
    box-shadow: -2px 2px 5px rgb(119 119 119 / 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    top: 0;
    left: 0;
    margin: 1rem 0 0 1rem;
  }
  .back-btn:hover {
    opacity: 0.6;
    cursor: pointer;
  }
  .brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 999rem;
      margin-bottom: 1rem;
    }
  }
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    div {
      padding: 0 1rem;
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 999rem;
    }
    div:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;

export default Menu;
