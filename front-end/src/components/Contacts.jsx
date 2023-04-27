import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';

function Contacts({ contacts, changeChat, socket, onlineUsers, navSelect }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const [navSelect, setNavSelect] = useState('messages');
  const [menu, setMenu] = useState(false);
  const [numberNotes, setNumberNotes] = useState(0);

  const { auth } = useSelector(state => state);

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
    <div
      className={`lg:w-[30%] ${
        navSelect === 'search-friends' || navSelect === 'notifications'
          ? 'w-full'
          : 'w-[75px]'
      } lg:py-5 lg:px-3 bg-[#F9FBFF] bg-opacity-50 h-[95%] overflow-hidden`}
    >
      <div>
        <div className="lg:flex hidden flex-col space-x-4 mb-5 items-center gap-2 h-[30%]">
          {auth?.avatar ? (
            <img
              src={'data:image/png;base64, ' + auth.avatar.imageBase64}
              alt=""
              className="w-[50px] h-[50px] shadow-lg rounded-full"
            />
          ) : (
            <div className="text-3xl text-[rgb(249,251,255)] shadow-lg h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
              {auth.fullname ? <p>{auth?.fullname[0]}</p> : ''}
            </div>
          )}

          <div className="text-2xl text-[#79C7C5] font-normal">
            {auth.fullname && auth?.fullname.length > 15
              ? auth.fullname.substr(0, 15) + '...'
              : auth.fullname}
          </div>
        </div>
        {navSelect === 'messages' && (
          <Message changeChat={changeChat} onlineUsers={onlineUsers} />
        )}
        {navSelect === 'search-friends' && <SearchUser socket={socket} />}
        {navSelect === 'notifications' && <Notifications socket={socket} />}
      </div>
    </div>
  );
}

export default Contacts;
