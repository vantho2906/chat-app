import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faMagnifyingGlass,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import SearchUser from './SearchUser';
import Message from './Message';
import Notifications from './Notifications';
import Logout from './Logout';
import Menu from './Menu';
import Navigation from './Navigation';

function Contacts({ contacts, currentUser, changeChat, socket, onlineUsers }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [navSelect, setNavSelect] = useState('messages');
  const [menu, setMenu] = useState(false);
  const [numberNotes, setNumberNotes] = useState(0);

  const handleSetMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.fullname);
      const notification = JSON.parse(localStorage.getItem('notifications'));
      // console.log(notification);
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('get-friend-request', data => {
        setNumberNotes(prev => prev + 1);
      });
    }
  }, [socket.current]);

  // useEffect(() => {
  //   socket.current?.on('onlineUser', data => {
  //     const usersId = Object.values(data.onlineUsers);
  //     setOnlineUsers(usersId);
  //   });
  // }, [socket.current]);

  return (
    <div className="w-[30%] py-5 px-3 bg-[#F9FBFF] bg-opacity-50 h-[95%] rounded-l-xl overflow-hidden">
      {currentUserName && menu ? (
        <Menu
          avatar={currentUser.avatar}
          fullname={currentUser.fullname}
          username={currentUser.username}
          socket={socket}
          handleSetMenu={handleSetMenu}
        />
      ) : (
        <div>
          <div className="flex flex-col space-x-4 mb-5 items-center gap-2">
            {/* <img
              onClick={() => handleSetMenu()}
              src={'data:image/png;base64, ' + currentUserImage?.imageBase64}
              alt=""
              className="w-8 h-8 rounded-full"
            /> */}
            <div className="text-3xl text-[#F9FBFF] h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
              <p>{currentUser?.fullname[0]}</p>
            </div>
            <div className="text-2xl text-[#79C7C5] font-normal">
              {currentUser?.fullname}
            </div>
            {/* <Logout socket={socket} /> */}
          </div>
          {navSelect === 'messages' && (
            <Message changeChat={changeChat} onlineUsers={onlineUsers} />
          )}
          {navSelect === 'search-friends' && (
            <SearchUser currentUser={currentUser} socket={socket} />
          )}
          {navSelect === 'notifications' && <Notifications socket={socket} />}
        </div>
      )}
      <Navigation navSelect={navSelect} setNavSelect={setNavSelect} />
    </div>
  );
}

export default Contacts;
