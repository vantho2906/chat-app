import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import { getMessagesRoute, addMessageRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currentChat, currentUser, currentRoom, socket }) {
  // const socket = io.connect(host);
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [offlineUsersTime, setOfflineUsersTime] = useState(null);
  const [date, setDate] = useState(0);
  const scrollRef = useRef();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentChat]);

  useEffect(() => {
    socket.current.on('onlineUser', data => {
      setOfflineUsersTime(data.offlineUsersTime);
      setSeconds(0);
    });
  }, [socket.current]);

  useEffect(() => {
    const handleSetMessages = async () => {
      if (currentChat) {
        const myId = currentUser._id;
        const response = await axios.post(
          `${getMessagesRoute}/${currentRoom}`,
          { myId }
        );
        setMessages(response.data.data);
      }
    };

    const handleSetDate = () => {
      if (currentChat?._id && offlineUsersTime[currentChat._id]) {
        let utcDate = new Date(offlineUsersTime[currentChat._id]);
        let now = new Date();
        setDate(Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60)));
      }
    };
    handleSetDate();
    handleSetMessages();
  }, [currentChat]);

  useEffect(() => {
    const joinRoom = () => {
      if (currentRoom) {
        socket.current.emit('join-room', currentRoom);
      }
    };
    joinRoom();
  }, [currentRoom]);

  const handleSendMsg = async msg => {
    socket.current.emit('send-msg', {
      userId: currentChat._id,
      message: msg,
      chatRoomId: currentRoom,
    });
    await axios.post(`${addMessageRoute}/${currentRoom}`, {
      userId: currentUser._id,
      message: msg,
    });
    setMessages(prev => [
      ...prev,
      {
        fromSelf: true,
        message: { message: msg, updatedAt: Date.now() },
      },
    ]);
  };

  // const handleDate

  useEffect(() => {
    socket.current.on('receive-msg', data => {
      setArrivalMessages({
        fromSelf: false,
        message: { message: data.message, updatedAt: Date.now() },
      });
    });
  }, [socket.current]);

  useEffect(() => {
    arrivalMessages && setMessages(prev => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat ? (
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

              <div className="offline-time">
                {date && offlineUsersTime[currentChat._id] ? (
                  date + Math.floor(seconds / 60) < 5 ? (
                    <h6>
                      Offlined {date + Math.floor(seconds / 60)} minutes ago
                    </h6>
                  ) : date + Math.floor(seconds / 60) < 60 ? (
                    <h6>
                      Offlined {date + Math.floor(seconds / 60)} minutes ago
                    </h6>
                  ) : Math.floor((date + Math.floor(seconds / 60)) / 60) <
                    24 ? (
                    <h6>
                      Offlined{' '}
                      {Math.floor((date + Math.floor(seconds / 60)) / 60)} hours
                      ago
                    </h6>
                  ) : (
                    <h6>
                      Offlined{' '}
                      {Math.floor(
                        (date + Math.floor(seconds / 60)) / (60 * 24)
                      )}{' '}
                      days ago
                    </h6>
                  )
                ) : (
                  <h6></h6>
                )}
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map(message => {
              let utcDate = new Date(message.message.updatedAt).toUTCString();
              const time = utcDate.split(' ');
              let newtime = time[4].split(':');
              newtime[0] = (+newtime[0] + +7) % 12;

              const day = time[1] + ' ' + time[2] + ' ' + time[3];
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div
                    className={`message ${
                      message.fromSelf ? 'sended' : 'recieved'
                    }`}
                  >
                    <div className="content">
                      <p>{message.message.message}</p>
                      <div>
                        <p className="date">{day}</p>
                        <p className="date">{newtime[0] + ':' + newtime[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      ) : (
        <Container>
          <div className="home">
            <h2 data-text="CHAT_APP" className="intro-text">
              CHAT_APP
            </h2>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  gap: 0.1rem;
  overflow: hidden;
  .home {
    background-color: purple;
    width: 100%;
    height: 100%;
    background-color: rgba(249, 251, 255, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;

    .intro-text {
      font-size: 4rem;
      color: #fff;
      -webkit-text-stroke: 0.2vw #000;
      position: relative;
    }
    .intro-text::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      height: 100%;
      -webkit-text-stroke: 0vw #fff;
      overflow: hidden;
      animation: animate 2s linear;
    }

    @keyframes animate {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
  }
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
        .date {
          font-size: 0.8rem;
          opacity: 0.7;
        }
        div {
          margin-top: 0.4rem;
        }
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
      background-color: #ccc;
      color: #000 !important;
    }
  }
`;

export default ChatContainer;
