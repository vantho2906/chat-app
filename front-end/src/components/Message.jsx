import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllContacts, host } from '../utils/APIRoutes';
import axios from 'axios';

function Message({ changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [userChats, setUserChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const changeCurrentChat = (index, contact) => {
    changeChat(contacts.chatRoomIdList[index], contact);
    setCurrentSelected(index);
  };
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('chat-app-user'));
    const handleUserChats = async () => {
      const data = await axios.get(`${getAllContacts}/${currentUser.username}`);
      setContacts(data.data.data);
      setUserChats(data.data.data.contacts);
    };
    handleUserChats();
  }, []);
  return (
    <Container>
      <div className="search-user">
        {userChats ? (
          <div className="contacts">
            <div>
              {userChats.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? 'selected' : ''
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                    key={index}
                  >
                    <div className="avatar">
                      <img
                        src={
                          'data:image/png;base64, ' + contact.avatar.imageBase64
                        }
                        alt=""
                      />
                    </div>
                    <h3>{contact.fullname}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>Nothing</p>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search-user {
    display: flex;
    flex-direction: column;
    width: 100%;
    .contacts {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      margin-top: 1rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: black;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .selected {
          background-color: rgba(249, 251, 255, 1) !important;
        }
        .contact {
          background-color: #ffffff30;
          max-height: 4rem;
          height: 4rem;
          width: 100%;
          cursor: pointer;
          border-radius: 0.2rem;
          padding: 0.4rem;
          gap: 1rem;
          align-items: center;
          display: flex;
          flex-direction: row;
          // justify-content: space-between;
          transition: 0.5s ease-in-out;
          .avatar {
            display: flex;
            justify-content: flex-start;
            height: 3rem;
            width: 3rem;
            margin-right: 1rem;
            img {
              height: 3rem;
              width: 3rem;
              object-fit: cover;
              border-radius: 999rem;
            }
            
          }
          h3 {
            color: #777777;
            font-weight: 400;
            display: flex;
            justify-content: flex-start;
            flex: 1;
          }
          .username {
            margin-right: 0.4rem;
            // width: 100%;
            display: flex;
            justify-content: flex-end;
            width: 1.5rem;
            
            div {
              display: flex;
              justify-content: flex-end;
              cursor: pointer;
              z-index: 2;
              
              div {
                display: flex;
                flex-direction: row;
                font-size: 1.2rem;
                gap: 1rem;
              }
            }
          }
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

export default Message;
