import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import {
  getMessagesRoute,
  addMessageRoute,
  getUserRoute,
} from '../utils/APIRoutes';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import logoHome from './logo/logoHome.png';

function ChatContainer({
  currentChat,
  currentUser,
  currentRoom,
  socket,
  onlineUsers,
  offlineUsersTime,
}) {
  // const socket = io.connect(host);
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  // const [online, setOnline] = useState(onlineUsers);
  const [date, setDate] = useState(0);
  const scrollRef = useRef();
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes(minutes => minutes + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // console.log(offlineUsersTime);
    // if (currentChat?._id)
    //   console.log(Date.now() - Date(offlineUsersTime[currentChat._id]));
    if (currentChat?._id) {
      const handleDate = () => {
        let utcDate = new Date(offlineUsersTime[currentChat._id]);
        let now = new Date();
        // console.log(
        //   Math.max(
        //     1,
        //     Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60))
        //   )
        // );
        setDate(
          Math.max(
            1,
            Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60))
          )
        );
        setMinutes(0);
      };
      handleDate();
    } else {
      setDate(false);
    }
  }, [currentChat]);

  useEffect(() => {
    if (currentChat?._id && !onlineUsers?.includes(currentChat._id)) {
      setDate(1);
      setMinutes(0);
    } else {
      setDate(null);
    }
  }, [onlineUsers]);

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
    socket.current?.emit('send-msg', {
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

  socket.current?.on('receive-msg', data => {
    setArrivalMessages({
      fromSelf: false,
      message: { message: data.message, updatedAt: Date.now() },
    });
  });

  useEffect(() => {
    arrivalMessages && setMessages(prev => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat ? (
        <div className="h-full w-[50%] bg-[#F9FBFF] bg-opacity-80 rounded-xl overflow-hidden shadow-lg">
          <div className="chat-header bg-[#F9FBFF] w-full flex flex-row px-4 py-2 justify-between">
            <div className="user-details flex flex-row items-center space-x-4">
              <img
                src={'data:image/png;base64, ' + currentChat.avatar.imageBase64}
                alt=""
                className="w-[50px] h-[50px] rounded-full border-black border-[1px]"
              />
              <p className="text-xl text-[#777777]">{currentChat.fullname}</p>
            </div>
            <div className="flex items-center">
              {date && !onlineUsers?.includes(currentChat._id) ? (
                Math.floor(Math.floor(date) + minutes) < 5 ? (
                  <h6>Offlined {date + minutes} minutes ago</h6>
                ) : Math.floor(date + minutes) < 60 ? (
                  <h6>Offlined {Math.floor(date + minutes)} minutes ago</h6>
                ) : Math.floor((date + minutes) / 60) < 24 ? (
                  <h6>
                    Offlined {Math.floor((date + minutes) / 60)} hours ago
                  </h6>
                ) : (
                  <h6>
                    Offlined {Math.floor((date + minutes) / (60 * 24))} days ago
                  </h6>
                )
              ) : (
                <h6></h6>
              )}
            </div>

            {/* {onlineUsers && onlineUsers.includes(currentChat._id) ? (
                  <h6>Online</h6>
                ) : (
                  <h6>Offline</h6>
                )} */}
          </div>
          <div className="chat-messages h-[70%] px-4 py-4 space-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
            {messages.map(message => {
              let utcDate = new Date(message.message.updatedAt).toUTCString();
              const time = utcDate.split(' ');
              let newtime = time[4].split(':');
              newtime[0] = (+newtime[0] + +7) % 12;

              const day = time[1] + ' ' + time[2] + ' ' + time[3];
              return (
                <div
                  key={uuidv4()}
                  ref={scrollRef}
                  className={`message flex flex-col p-1 ${
                    message.fromSelf ? 'sended' : 'recieved'
                  } bg-[#b2b2b2] w-fit min-w-[5rem]  rounded-xl `}
                >
                  <p className="max-w-[15rem] break-words text-[16px] text-[#e9e9e9]">
                    {message.message.message}
                  </p>
                  <div className="text-[10px] text-[#e9e9e9]">
                    <p className="date">{day}</p>
                    <p className="date">{newtime[0] + ':' + newtime[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      ) : (
        <div className="h-full w-[50%] bg-[#F9FBFF] bg-opacity-80 rounded-xl overflow-hidden shadow-lg flex items-center justify-center space-x-3">
          <img
            src={logoHome}
            alt=""
            className="w-[100px] h-[100px] flex items-center content-center"
          />
          <h2 data-text="CHAT_APP" className="text-6xl font-light">
            CHAT_APP
          </h2>
        </div>
      )}
    </>
  );
}

export default ChatContainer;
