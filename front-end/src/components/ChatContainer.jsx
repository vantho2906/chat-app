import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import { getMessagesRoute, addMessageRoute, host } from '../utils/APIRoutes';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';

function ChatContainer({ currentChat, currentUser, currentRoom, socket }) {
  // const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const scrollRef = useRef();

  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const handleSetMessages = async () => {
      if (currentChat) {
        const myId = currentUser._id;
        const response = await axios.post(
          `${getMessagesRoute}/${currentRoom}`,
          { myId }
        );
        console.log(response);
        setMessages(response.data.data);
      }
    };
    handleSetMessages();
  }, [currentChat]);

  const handleSendMsg = async msg => {
    socket.current.emit('send-msg', {
      chatRoomId: currentRoom,
      userId: currentUser._id,
      message: msg,
    });
    await axios.post(`${addMessageRoute}/${currentRoom}`, {
      userId: currentUser._id,
      message: msg,
    });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };

  if (socket.current) {
    socket.current.on('msg-recieve', data => {
      setArrivalMessages({
        fromSelf: currentUser === data.userId,
        message: data.message,
      });
    });
  }

  useEffect(() => {
    arrivalMessages && setMessages(prev => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={
                    'data:image/png;base64, ' + currentChat.avatar.imageBase64
                  }
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentChat.fullname}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map(message => {
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div
                    className={`message ${
                      message.fromSelf ? 'sended' : 'recieved'
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    background-color: rgba(249, 251, 255, 1);
    height: 14%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          border-radius: 999rem;
          width: 3rem;
          height: 3rem;
          object-fit: cover;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 70%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: black;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    background-color: rgba(249, 251, 255, 0.85);
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #79c7c5;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #b2b2b2;
    }
  }
`;

export default ChatContainer;
