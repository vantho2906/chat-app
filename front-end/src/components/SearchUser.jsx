import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faCircleXmark,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  sendRequestRoute,
  searchUserByFullnameRoute,
  getRequestSendedRoute,
} from '../utils/APIRoutes';
import { useSelector } from 'react-redux';
import LoadingCompoent from './alert/LoadingCompoent';
import { getAPI, postAPI } from '../utils/FetchData';
function SearchUser({ socket }) {
  const [currentRequest, setCurrentRequest] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [loadUserChats, setLoadUserChats] = useState('');

  const { auth } = useSelector(state => state);

  const handleSearchChange = e => {
    setSearchUser(e.target.value);
  };
  useLayoutEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await axios.get(`${getRequestSendedRoute}/${auth._id}`);
        setCurrentRequest(res.data.data);
      } catch (err) {}
    };
    handleRequest();
  }, []);
  useLayoutEffect(() => {
    const handleSearchUser = async () => {
      setLoadUserChats('');
      try {
        let fullname = searchUser;
        const data = await axios.post(searchUserByFullnameRoute, {
          fullname,
        });

        if (fullname && data.status === 200) {
          const loader = data.data.data;
          setLoadUserChats(loader);
        }
      } catch (err) {
        setLoadUserChats([]);
      }
    };
    handleSearchUser();
  }, [searchUser]);

  const handleSendRequest = async receiverId => {
    const myId = auth._id;
    const res = await axios.post(sendRequestRoute, {
      receiverId,
      myId,
    });
    socket.current.emit('send-friend-request', {
      receiverId,
      myId,
    });
    setCurrentRequest(prev => [...prev, { receiverId: receiverId }]);
  };

  return (
    <div className="w-full">
      <div className="search-input w-full flex flex-row items-center h-10 bg-[#F9FBFF] rounded-xl overflow-hidden">
        <input
          type="tel"
          placeholder="Search..."
          onChange={e => {
            handleSearchChange(e);
          }}
          value={searchUser}
          className="w-[90%] text-[16px] bg-[#F9FBFF] h-full outline-none pl-2 flex flex-col content-center"
        />
        {searchUser && (
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="1x"
            id="close-icon"
            onClick={() => {
              setSearchUser('');
              setLoadUserChats([]);
            }}
          />
        )}
      </div>
      {loadUserChats ? (
        <div className="contacts overflow-y-scroll h-[240px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-5">
          {loadUserChats?.length !== 0 ? (
            <div>
              {loadUserChats?.map((contact, index) => {
                return (
                  <div
                    className="contact flex flex-row items-center px-2 py-2 cursor-pointer rounded-md border-b-[#79C7C5] border-b-[1px] hover:bg-white/20"
                    key={index}
                  >
                    <div className="avatar flex flex-row items-center space-x-2 text-lg">
                      {contact.avatar ? (
                        <img
                          src={
                            'data:image/png;base64, ' +
                            contact.avatar?.imageBase64
                          }
                          alt=""
                          className="w-[50px] h-[50px] rounded-full"
                        />
                      ) : (
                        <div className="text-[30px] text-[rgb(249,251,255)] h-[50px] w-[50px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                          <p>{contact?.fullname[0]}</p>
                        </div>
                      )}

                      <h3>
                        {contact?.fullname.length > 15
                          ? contact.fullname.substring(0, 15) + '...'
                          : contact.fullname}
                      </h3>
                    </div>
                    <div className="username flex flex-row flex-1 justify-end mr-2">
                      {auth.friendIdsList.includes(contact._id) ? (
                        <p>Friend</p>
                      ) : currentRequest.filter(
                          sender => sender.receiverId === contact._id
                        ).length > 0 ? (
                        <p>Sended</p>
                      ) : contact._id === auth._id ? (
                        <FontAwesomeIcon icon={faSeedling} size="1x" />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleSendRequest(contact._id);
                          }}
                          icon={faUserPlus}
                          size="1x"
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
      ) : (
        searchUser && <LoadingCompoent />
      )}
    </div>
  );
}

export default SearchUser;
