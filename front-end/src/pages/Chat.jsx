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

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const socket = useRef();

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current?.emit('login', { userId: currentUser?._id });
    }
  }, [currentUser]);

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const data = axios.get(`${getUserRoute}/${user._id}`);
        data.then(res => {
          setCurrentUser(res.data.data);
        });
        console.log(user._id);
        socket.current?.emit('login', { userId: user?._id });
      }
    };
    checkUser();
  }, []);
  const { notification } = useContext(AppContext);
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
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          socket={socket}
        />
        <ChatContainer
          currentChat={currentChat}
          currentUser={currentUser}
          currentRoom={currentRoom}
          socket={socket}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  witdh: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(to bottom left, #79c7c5 40%, #f9fbff 100%);
  .container {
    border-radius: 10px;
    overflow: hidden;
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 30% 70%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
