import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import io from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
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
    socket.current = io('http://localhost:5001/');
    const handleHome = async () => {
      const chat_app_key = await localStorage.getItem('chat-app');
      if (chat_app_key === 'fe1') {
        dispatch({ type: 'SOCKET', payload: socket.current });
        socket.current.emit('login', { userId: auth._id });
        socket.current.on('onlineUser', data => {
          const usersId = Object.values(data.onlineUsers);
          setOnlineUsers(usersId);
          setOfflineUsersTime(data.offlineUsersTime);
        });
      } else {
        await navigate('/login');
      }
    };
    handleHome();
    return () => {
      socket.current.close();
    };
  }, [auth]);

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
    <div className="flex flex-row items-center justify-center w-full h-[100vh] bg-gradient-to-r from-[#79C7C5] to-[#F9FBFF] lg:px-[50px] py-[30px]">
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
          navSelect={navSelect}
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
