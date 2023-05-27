import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import LoadingCompoent from './alert/LoadingCompoent';
import { useQuery } from 'react-query';
import { getContacts } from '../apis/user.api';

function Message({ changeChat, onlineUsers }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const dispatch = useDispatch();
  const changeCurrentChat = (index, contact) => {
    changeChat(auth.contactList.chatRoomIdList[index], contact);
    setCurrentSelected(index);
  };

  const { auth } = useSelector(state => state);

  const { data, isLoading } = useQuery({
    queryKey: ['getContacts', auth._id],
    queryFn: () => getContacts(auth._id),
    staleTime: 10 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });

  if (isLoading) return <LoadingCompoent />;

  return (
    <div className="h-[70%] flex flex-col justify-end">
      <div className="overflow-y-scroll overflow-x-hidden lg:h-[210px] h-[400px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-2">
        {data?.data?.data ? (
          <div className="flex flex-col justify-center">
            {data?.data?.data.contacts.map((contact, index) => {
              return (
                <div
                  className={`flex justify-center lg:justify-start lg:px-4 py-2 cursor-pointer space-y-2 border-b-[#79C7C5] lg:border-b-[1px] ${
                    index === currentSelected ? ' bg-white/50 rounded-lg' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                  key={index}
                  title={contact[0].fullname}
                >
                  <div className="flex items-center justify-center lg:mr-6 relative">
                    {onlineUsers && onlineUsers?.includes(contact[0]._id) ? (
                      <div className="absolute z-20 top-10 left-8 bg-[#31a24c] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                    ) : (
                      <div className="absolute z-20 top-10 left-8 bg-[#ccc] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
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
                              alt="Avatar"
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
                  <div className="hidden lg:flex flex-col justify-center">
                    <h3 className="text-[#777777] mb-1">
                      {contact.length == 2
                        ? (contact[0].fullname + ',' + contact[1].fullname)
                            .length > 20
                          ? (
                              contact[0].fullname +
                              ',' +
                              contact[1].fullname
                            ).substring(0, 20) + '...'
                          : contact[0].fullname + ',' + contact[1].fullname
                        : contact[0].fullname.length > 15
                        ? contact[0].fullname.substring(0, 15) + '...'
                        : contact[0].fullname}
                    </h3>
                    {/* <p className="text-[#79C7C5]">Last message</p> */}
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
