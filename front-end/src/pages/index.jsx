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
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../components/Menu';
import Navigation from '../components/Navigation';
import SetInfo from '../components/SetInfo';

function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const [navSelect, setNavSelect] = useState('messages');
  const [onlineUsers, setOnlineUsers] = useState(undefined);
  const [offlineUsersTime, setOfflineUsersTime] = useState(undefined);
  const socket = useRef();

  const { auth } = useSelector(state => state);

  useEffect(() => {
    if (auth.access_token) {
      socket.current = io(host);
      dispatch({ type: 'SOCKET', payload: socket.current });
      socket.current.emit('login', { userId: auth._id });
      socket.current.on('onlineUser', data => {
        const usersId = Object.values(data.onlineUsers);
        // console.log(usersId);
        setOnlineUsers(usersId);
        setOfflineUsersTime(data.offlineUsersTime);
      });
    } else {
      navigate('/login');
    }
  }, [auth.access_token]);

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

  const handleSetNav = options => {
    setNavSelect(options);
  };

  return (
    <div className="flex flex-row items-center justify-center w-[100vw] h-[100vh] bg-gradient-to-r from-[#79C7C5] to-[#F9FBFF] px-[50px] py-[30px]">
      <Navigation handleSetNav={handleSetNav} navSelect={navSelect} />
      <Contacts
        contacts={contacts}
        changeChat={handleChatChange}
        socket={socket}
        onlineUsers={onlineUsers}
        navSelect={navSelect}
      />
      {navSelect === 'info' ? (
        <SetInfo />
      ) : (
        <ChatContainer
          currentChat={currentChat}
          currentRoom={currentRoom}
          offlineUsersTime={offlineUsersTime}
          onlineUsers={onlineUsers}
        />
      )}
    </div>
  );
}

export default Chat;
