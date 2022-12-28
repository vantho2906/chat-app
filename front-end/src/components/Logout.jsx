import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import { host } from '../utils/APIRoutes';

function Logout({ socket }) {
  const navigate = useNavigate();
  const handleClick = () => {
    socket.current.disconnect(true);
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };
  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon={faRightFromBracket} id="icon" />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  .icon {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
