import React, { useEffect, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';
import { RxMagnifyingGlass } from 'react-icons/rx';

const Navigation = ({ currentUser, socket, navSelect, setNavSelect }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  // const [onlineUsers, setOnlineUsers] = useState([]);
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
    if (socket?.current) {
      socket.current.on('get-friend-request', data => {
        setNumberNotes(prev => prev + 1);
      });
    }
  }, [socket?.current]);
  return (
    <div className="absolute top-[11%] left-[10%] flex flex-col bg-white rounded-l-xl h-36 overflow-hidden">
      <div
        onClick={() => {
          setNavSelect('messages');
        }}
        className={`px-[5px] flex flex-1 items-center justify-center ${
          navSelect === 'messages' ? 'bg-[#777777] text-[#79C7C5]' : ''
        } flex-1`}
      >
        <AiOutlineMessage size={30} />
      </div>
      <div
        onClick={() => {
          setNavSelect('search-friends');
        }}
        className={`border-y-[2px] border-opacity-30 border-black flex-1 flex items-center justify-center font-bold ${
          navSelect === 'search-friends' ? 'bg-[#777777] text-[#79C7C5]' : ''
        }`}
      >
        <RxMagnifyingGlass size={30} />
      </div>
      <div
        onClick={() => {
          setNavSelect('notifications');
          setNumberNotes(0);
        }}
        className={`flex-1 flex items-center justify-center ${
          navSelect === 'notifications' ? 'bg-[#777777] text-[#79C7C5]' : ''
        }`}
      >
        <FiBell size={30} />
        {numberNotes !== 0 && <div className="number-notes">{numberNotes}</div>}
      </div>
    </div>
  );
};

export default Navigation;
