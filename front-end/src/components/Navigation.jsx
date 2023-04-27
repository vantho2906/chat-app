import React, { useEffect, useState } from 'react';
import { AiOutlineMessage, AiFillSetting } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { MdOutlineSettings } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

const Navigation = ({ currentUser, socket, handleSetNav, navSelect }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [menu, setMenu] = useState(false);
  const [numberNotes, setNumberNotes] = useState(0);
  const dispatch = useDispatch();

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
    if (socket?.current) {
      socket.current.on('get-friend-request', data => {
        setNumberNotes(prev => prev + 1);
      });
    }
  }, [socket?.current]);
  return (
    <div className="w-[50px] h-[95%] justify-between flex flex-col bg-[#ffffff] bg-opacity-70 rounded-l-xl overflow-hidden border-r-2 border-[#79C7C5] shadow-sm">
      <div className="h-[42%] justify-start flex flex-col">
        <div
          onClick={() => {
            handleSetNav('messages');
          }}
          className={`px-[5px] cursor-pointer flex flex-1 items-center justify-center ${
            navSelect === 'messages' ? 'bg-[#79C7C5] text-[#F9FBFF]' : ''
          } flex-1`}
        >
          <AiOutlineMessage size={30} />
        </div>
        <div
          onClick={() => {
            handleSetNav('search-friends');
          }}
          className={`flex-1 flex cursor-pointer items-center justify-center font-bold ${
            navSelect === 'search-friends' ? 'bg-[#79C7C5] text-[#F9FBFF]' : ''
          }`}
        >
          <RxMagnifyingGlass size={35} />
        </div>
        <div
          onClick={() => {
            handleSetNav('notifications');
            setNumberNotes(0);
          }}
          className={`flex-1 flex cursor-pointer items-center justify-center ${
            navSelect === 'notifications' ? 'bg-[#79C7C5] text-[#F9FBFF]' : ''
          }`}
        >
          <FiBell size={30} />
          {numberNotes !== 0 && (
            <div className="number-notes">{numberNotes}</div>
          )}
        </div>
      </div>
      <div className="h-[28%] justify-end flex flex-col">
        <div
          onClick={() => {
            handleSetNav('info');
          }}
          className={`px-[5px] cursor-pointer flex flex-1 items-center justify-center ${
            navSelect === 'info' ? 'bg-[#79C7C5] text-[#F9FBFF]' : ''
          } flex-1`}
        >
          <AiOutlineUser fontSize={30} />
        </div>
        <div
          onClick={() => {
            dispatch({ type: 'ALERT', payload: { logout: true } });
          }}
          className={`px-[5px] cursor-pointer flex flex-1 items-center justify-center`}
        >
          <FiLogOut fontSize={28} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
