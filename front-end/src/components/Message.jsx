import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllContacts, host } from '../utils/APIRoutes';
import axios from 'axios';

function Message({ changeChat, onlineUsers }) {
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
      const data = await axios.get(
        `${getAllContacts}/${currentUser?.username}`
      );
      setContacts(data.data.data);
      setUserChats(data.data.data.contacts);
    };
    handleUserChats();
  }, []);
  return (
    <div className="overflow-y-scroll h-[200px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-5">
      {userChats ? (
        <div className="flex flex-col gap-3">
          {userChats.map((contact, index) => {
            return (
              <div
                className={`flex px-4 h-16 space-y-2 border-b-[#79C7C5] border-b-[1px] ${
                  index === currentSelected ? 'selected' : ''
                }`}
                onClick={() => changeCurrentChat(index, contact)}
                key={index}
              >
                {/* <div className="avatar">
                  {onlineUsers && onlineUsers?.includes(contact._id) ? (
                    <div class="green_icon"></div>
                  ) : (
                    <div class="grey_icon"></div>
                  )}
                  <img
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    src={'data:image/png;base64, ' + contact.avatar.imageBase64}
                    alt=""
                  />
                </div> */}
                <div className="space-y-2">
                  <h3 className="text-[#777777]">{contact.fullname}</h3>
                  <p className="text-[#79C7C5]">Last message</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Nothing</p>
      )}
    </div>
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
            height: 4rem;
            width: 4rem;
            margin-right: 1rem;
            position: relative;
            .green_icon{
              background-color: #4cd137;
              position: absolute;
              right: 8px;
              bottom: 10px;
              height: 25px;
              width: 25px;
              border:5px solid white;
              border-radius: 50%;
            }
            .grey_icon{
              background-color: #ccc;
              position: absolute;
              right: 8px;
              bottom: 10px;
              height: 25px;
              width: 25px;
              border:5px solid white;
              border-radius: 50%;
            }
            img {
              height: 3rem;
              width: 3rem;
              object-fit: cover;
              border: 5px solid white;
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
