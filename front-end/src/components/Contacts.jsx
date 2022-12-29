import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faMagnifyingGlass,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import SearchUser from './SearchUser';
import Message from './Message';
import Notifications from './Notifications';
import Logout from './Logout';
import Menu from './Menu';

function Contacts({ contacts, currentUser, changeChat, socket }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [navSelect, setNavSelect] = useState('messages');
  const [menu, setMenu] = useState(false);

  const handleSetMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.fullname);
      const notification = JSON.parse(localStorage.getItem('notifications'));
      // console.log(notification);
    }
  }, [currentUser]);

  useEffect(() => {
    socket.current.on('onlineUser', data => {
      console.log(data);
      const usersId = Object.values(data.onlineUsers);
      setOnlineUsers(usersId);
    });
  }, [socket.current]);

  return (
    <>
      {currentUserName && menu ? (
        <Menu
          avatar={currentUser.avatar}
          fullname={currentUser.fullname}
          username={currentUser.username}
          socket={socket}
          handleSetMenu={handleSetMenu}
        />
      ) : (
        <Container>
          <div className="brand">
            <div>
              <img
                onClick={() => handleSetMenu()}
                src={'data:image/png;base64, ' + currentUserImage?.imageBase64}
                alt=""
              />
              <h3>{currentUser?.fullname}</h3>
            </div>
            <Logout socket={socket} />
          </div>
          <div className="nav">
            <h6
              onClick={() => {
                setNavSelect('messages');
              }}
              className={`${navSelect === 'messages' ? 'selected' : ''}`}
            >
              <FontAwesomeIcon icon={faMessage} size="2x" />
            </h6>
            <h6
              onClick={() => {
                setNavSelect('search-friends');
              }}
              className={`${navSelect === 'search-friends' ? 'selected' : ''}`}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
            </h6>
            <h6
              onClick={() => {
                setNavSelect('notifications');
              }}
              className={`${navSelect === 'notifications' ? 'selected' : ''}`}
            >
              <FontAwesomeIcon icon={faBell} size="2x" />
            </h6>
          </div>
          {navSelect === 'messages' && (
            <Message changeChat={changeChat} onlineUsers={onlineUsers} />
          )}
          {navSelect === 'search-friends' && (
            <SearchUser currentUser={currentUser} onlineUsers={onlineUsers} />
          )}
          {navSelect === 'notifications' && <Notifications />}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 8% 8% 84%;
  background-color: rgba(249, 251, 255, 0.5);
  box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
  overflow: hidden;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    img {
      border-radius: 999rem;
      height: 2.5rem;
      width: 2.5rem;
      max-inline-size: 100%;
      object-fit: cover;
    }
  }
  .nav {
    display: flex;
    // justify-content: space-between;
    margin-top: 0.5rem;
    cursor: pointer;
    h6 {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 33.3%;
      color: #777777;
      text-transform: uppercase;
      border-radius: 2rem;
      gap: 4px;
    }
    .selected {
      background-color: #79c7c5;
    }
  }
  
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
    margin-top: 2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: black;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff30;
      min-height: 4rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          hegiht: 3rem;
          width: 3rem;
          object-fit: cover;
          border-radius: 999rem;
        }
      }
      .username {
        h3 {
          color: #777777;
          font-weight: 400;
        }
      }
    }
    .selected {
      background-color: rgba(249, 251, 255, 1);
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
`;

export default Contacts;
