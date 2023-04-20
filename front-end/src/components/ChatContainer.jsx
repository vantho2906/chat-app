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
import { useSelector } from 'react-redux';

function ChatContainer({
  currentChat,
  currentRoom,
  onlineUsers,
  offlineUsersTime,
}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState('');
  // const [online, setOnline] = useState(onlineUsers);
  const [date, setDate] = useState(0);
  const scrollRef = useRef();
  const [minutes, setMinutes] = useState(1);
  const { auth, socket } = useSelector(state => state);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMinutes(minutes => minutes + 1);
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   // console.log(offlineUsersTime);
  //   // if (currentChat?._id)
  //   //   console.log(Date.now() - Date(offlineUsersTime[currentChat._id]));
  //   if (currentChat?._id) {
  //     const handleDate = () => {
  //       let utcDate = new Date(offlineUsersTime[currentChat._id]);
  //       let now = new Date();
  //       // console.log(
  //       //   Math.max(
  //       //     1,
  //       //     Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60))
  //       //   )
  //       // );
  //       setDate(
  //         Math.max(
  //           1,
  //           Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60))
  //         )
  //       );
  //       setMinutes(0);
  //     };
  //     handleDate();
  //   } else {
  //     setDate(false);
  //   }
  // }, [currentChat]);

  // useEffect(() => {
  //   if (currentChat?._id && !onlineUsers?.includes(currentChat._id)) {
  //     setDate(1);
  //     setMinutes(0);
  //   } else {
  //     setDate(null);
  //   }
  // }, [onlineUsers]);

  useEffect(() => {
    const handleSetMessages = async () => {
      if (currentChat) {
        const myId = auth._id;
        const response = await axios.post(
          `${getMessagesRoute}/${currentRoom}`,
          { myId }
        );
        setMessages(response.data.data);
      }
    };

    handleSetMessages();
  }, [currentChat, auth]);

  useEffect(() => {
    const joinRoom = () => {
      if (currentRoom) {
        socket.emit('join-room', currentRoom);
      }
    };
    joinRoom();
  }, [currentRoom]);

  const handleSendMsg = async msg => {
    socket.emit('send-msg', {
      sender: auth,
      message: msg,
      chatRoomId: currentRoom,
    });
    await axios.post(`${addMessageRoute}/${currentRoom}`, {
      userId: auth._id,
      message: msg,
    });
    setMessages(prev => [
      ...prev,
      {
        fromSelf: true,
        message: msg,
        sender: auth,
        updatedAt: Date.now(),
      },
    ]);
  };

  // // const handleDate

  socket?.on('receive-msg', data => {
    setArrivalMessages({
      fromSelf: false,
      message: data.message,
      sender: data.sender,
      updatedAt: Date.now(),
    });
  });

  useEffect(() => {
    arrivalMessages && setMessages(prev => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat ? (
        <div className="h-full w-[50%] bg-[#F9FBFF] bg-opacity-80 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#F9FBFF] w-full flex flex-row px-4 py-2 justify-between">
            <div className="user-details flex flex-row items-center space-x-4">
              {currentChat.length == 2 ? (
                <div className="relative text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex rounded-full">
                  <div className="z-10 absolute top-0 left-0">
                    {currentChat[0].avatar ? (
                      <img
                        className="w-[36px] h-[36px] rounded-full border-[#79C7C5] border-[2px] object-cover "
                        src={
                          'data:image/png;base64, ' +
                          currentChat[0].avatar.imageBase64
                        }
                        alt=""
                      />
                    ) : (
                      <div className="text-3xl text-[rgb(249,251,255)] h-[36px] w-[36px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                        <p>{currentChat[0]?.fullname[0]}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-3">
                    {currentChat[1].avatar ? (
                      <img
                        className="w-[36px] h-[36px] rounded-full border-[#79C7C5] border-[2px] object-cover "
                        src={
                          'data:image/png;base64, ' +
                          currentChat[1].avatar.imageBase64
                        }
                        alt=""
                      />
                    ) : (
                      <div className="text-3xl text-[rgb(249,251,255)] h-[36px] w-[36px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                        <p>{currentChat[1]?.fullname[0]}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {currentChat[0].avartar ? (
                    <img
                      className="w-[50px] h-[50px] rounded-full border-[#79C7C5] border-[2px] object-cover "
                      src={
                        'data:image/png;base64, ' +
                        currentChat[0].avatar.imageBase64
                      }
                      alt=""
                    />
                  ) : (
                    <div className="text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                      <p>{currentChat[0]?.fullname[0]}</p>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xl text-[#777777]">
                {currentChat.length == 2
                  ? currentChat[0].fullname +
                    ',' +
                    currentChat[1].fullname +
                    '...'
                  : currentChat[0].fullname}
              </p>
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
          <div className="chat-messages h-[73%] px-4 py-4 space-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
            {messages &&
              messages.map(message => {
                let utcDate = new Date(message.updatedAt).toUTCString();
                const time = utcDate.split(' ');
                let newtime = time[4].split(':');
                newtime[0] = (+newtime[0] + +7) % 12;

                const day = time[1] + ' ' + time[2] + ' ' + time[3];
                return (
                  <div
                    key={uuidv4()}
                    ref={scrollRef}
                    className={`message flex w-full relative items-end gap-1 ${
                      message.fromSelf ? 'flex-row-reverse' : 'flex-row'
                    }`}
                    title={message.sender.fullname}
                  >
                    <div className="shadow-lg">
                      {message.sender.avatar ? (
                        <img
                          src={
                            'data:image/png;base64, ' +
                            message.sender.avatar?.imageBase64
                          }
                          alt=""
                          className="flex w-[20px] h-[20px] border-[1px] border-[#79C7C5] rounded-full"
                        />
                      ) : (
                        <div className="text-xl text-[rgb(249,251,255)] h-[20px] w-[20px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                          <p>{message.sender.fullname[0]}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className={`max-w-[30%] break-words flex flex-col p-1 ${
                        message.fromSelf
                          ? 'bg-[#79c7c5] text-[#e9e9e9]'
                          : 'bg-[#97b6e2] text-[#e9e9e9]'
                      }  min-w-[5rem] rounded-xl`}
                    >
                      <p className="break-words text-[16px]">
                        {message.message}
                      </p>
                      <div className="text-[10px]">
                        <p className="date">{day}</p>
                        <p className="date">{newtime[0] + ':' + newtime[1]}</p>
                      </div>
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
