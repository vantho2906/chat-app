import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllContacts, host } from '../utils/APIRoutes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

function Message({ changeChat, onlineUsers }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [userChats, setUserChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const changeCurrentChat = (index, contact) => {
    changeChat(contacts[index], contact);
    setCurrentSelected(index);
  };

  const { auth } = useSelector(state => state);

  useEffect(() => {
    const handleUserChats = async () => {
      let data;
      if (auth._id) data = await axios.get(`${getAllContacts}/${auth?._id}`);

      setContacts(data?.data.data.chatRoomIdList);
      setUserChats(data?.data.data.contacts);
    };
    handleUserChats();
  }, [auth]);
  return (
    <div className="h-[70%] flex flex-col justify-end">
      <div className="overflow-y-scroll h-[210px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-2">
        {userChats ? (
          <div className="flex flex-col gap-3">
            {userChats.map((contact, index) => {
              return (
                <div
                  className={`flex px-4 h-16 space-y-2 border-b-[#79C7C5] border-b-[1px] ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                  key={index}
                >
                  <div className="flex items-center justify-center mr-6 relative">
                    {onlineUsers && onlineUsers?.includes(contact[0]._id) ? (
                      <div className="absolute z-20 top-10 left-8 bg-[#31a24c] w-[20px] h-[20px] border-[#242526] border-[3px] rounded-full"></div>
                    ) : (
                      <div className="absolute z-20 top-10 left-8 bg-[#ccc] w-[20px] h-[20px] border-[#242526] border-[3px] rounded-full"></div>
                    )}
                    {contact.length == 2 ? (
                      <div className="relative text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex rounded-full">
                        <div className="z-10 absolute top-0 left-0">
                          {contact[0].avatar ? (
                            <img
                              className="w-[36px] h-[36px] rounded-full border-[#79C7C5] border-[2px] object-cover "
                              src={
                                'data:image/png;base64, ' +
                                contact[0].avatar.imageBase64
                              }
                              alt=""
                            />
                          ) : (
                            <div className="text-3xl text-[rgb(249,251,255)] h-[36px] w-[36px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                              <p>{contact[0]?.fullname[0]}</p>
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-3">
                          {contact[1].avatar ? (
                            <img
                              className="w-[36px] h-[36px] rounded-full border-[#79C7C5] border-[2px] object-cover "
                              src={
                                'data:image/png;base64, ' +
                                contact[1].avatar.imageBase64
                              }
                              alt=""
                            />
                          ) : (
                            <div className="text-3xl text-[rgb(249,251,255)] h-[36px] w-[36px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                              <p>{contact[1]?.fullname[0]}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {contact[0].avatar ? (
                          <img
                            className="w-[50px] h-[50px] rounded-full m-auto border-[#79C7C5] border-[2px] object-cover "
                            src={
                              'data:image/png;base64, ' +
                              contact[0].avatar.imageBase64
                            }
                            alt=""
                          />
                        ) : (
                          <div className="text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                            <p>{contact[0]?.fullname[0]}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[#777777] mb-1">
                      {contact.length == 2
                        ? contact[0].fullname + ',' + contact[1].fullname
                        : contact[0].fullname}
                    </h3>
                    <p className="text-[#79C7C5]">Last message</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nothing</p>
        )}
      </div>
      <div className="w-full flex justify-end cursor-pointer hover:text-[#555]">
        <AiOutlineUsergroupAdd
          className="text-[34px]"
          onClick={() => {
            dispatch({ type: 'ALERT', payload: { addGroup: true } });
          }}
        />
      </div>
    </div>
  );
}

export default Message;
