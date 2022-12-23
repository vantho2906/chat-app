import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getRequestRoute } from '../utils/APIRoutes';
import SearchUser from './SearchUser';
import Message from './Message';
import Notification from './Notifications';

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [navSelect, setNavSelect] = useState('messages');

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.fullname);
    }
  }, [currentUser]);

  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <img
              src={'data:image/png;base64, ' + currentUserImage.imageBase64}
              alt=""
            />
            <h3>{currentUser.fullname}</h3>
          </div>
          <div className="nav">
            <h6
              onClick={() => {
                setNavSelect('messages');
              }}
              className={`${navSelect === 'messages' ? 'selected' : ''}`}
            >
              Messages
            </h6>
            <h6
              onClick={() => {
                setNavSelect('search-friends');
              }}
              className={`${navSelect === 'search-friends' ? 'selected' : ''}`}
            >
              Search friends
            </h6>
            <h6
              onClick={() => {
                setNavSelect('notifications');
              }}
              className={`${navSelect === 'notifications' ? 'selected' : ''}`}
            >
              Notifications
            </h6>
          </div>
          {navSelect === 'messages' && <Message contacts={contacts} />}
          {navSelect === 'search-friends' && <SearchUser />}
          {navSelect === 'notifications' && <Notification />}
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
    justify-content: flex-start;
    gap: 1rem;
    img {
      border-radius: 999rem;
      height: 2.5rem;
      width: 2.5rem;
      max-inline-size: 100%;
    }
  }
  .nav {
    display: flex;
    // justify-content: space-between;
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
