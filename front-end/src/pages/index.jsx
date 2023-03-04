import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../components/AppContext';
import { useDispatch } from 'react-redux';
import Menu from '../components/Menu';
import Navigation from '../components/Navigation';

function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentRoom, setCurrentRoom] = useState(undefined);
  // const [isOnline, setIsOnline] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState(undefined);
  const [offlineUsersTime, setOfflineUsersTime] = useState(undefined);
  const socket = useRef();

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      dispatch({ type: 'SOCKET', payload: socket.current });
      socket.current.emit('login', { userId: currentUser._id });
      socket.current.on('onlineUser', data => {
        const usersId = Object.values(data.onlineUsers);
        // console.log(usersId);
        setOnlineUsers(usersId);
        setOfflineUsersTime(data.offlineUsersTime);
      });
    }
  }, [currentUser]);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (!localStorage.getItem('logged')) {
  //       navigate('/login');
  //     } else {
  //       const user = await JSON.parse(localStorage.getItem('logged'));
  //       const data = axios.get(`${getUserRoute}/${user._id}`);
  //       data.then(res => {
  //         setCurrentUser(res.data.data);
  //       });
  //     }
  //   };
  //   checkUser();
  // }, []);
  // console.log(notification);

  // useEffect(() => {
  //   const handleNotification = async () => {
  //     if (currentUser) {
  //       const data = await axios.get(`${getRequestRoute}/${currentUser._id}`);
  //       if (data.status === 200) {
  //         notification = data.data.data.length;
  //       }
  //     }
  //   };
  //   handleNotification();
  // }, []);

  const handleChatChange = (chatRoomId, userChat) => {
    setCurrentChat(userChat);
    setCurrentRoom(chatRoomId);
  };

  return (
    <div className="flex flex-row items-center justify-center w-[100vw] h-[100vh] bg-gradient-to-r from-[#79C7C5] to-[#F9FBFF] px-[50px] py-[30px]">
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChatChange}
        socket={socket}
        onlineUsers={onlineUsers}
      />
      <ChatContainer
        currentChat={currentChat}
        currentUser={currentUser}
        currentRoom={currentRoom}
        socket={socket}
        offlineUsersTime={offlineUsersTime}
        onlineUsers={onlineUsers}
      />
    </div>
  );
}

// const Container = styled.div`
//   witdh: 100vw;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background: linear-gradient(to bottom left, #79c7c5 40%, #f9fbff 100%);
//   .container {
//     border-radius: 10px;
//     overflow: hidden;
//     height: 85vh;
//     width: 120vw;
//     display: grid;
//     grid-template-columns: 30% 70%;
//   }
// `;

export default Chat;
