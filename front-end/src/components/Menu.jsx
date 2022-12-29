import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Menu({ avatar, fullname, username, socket }) {
  const navigate = useNavigate();
  return (
    <Container>
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
