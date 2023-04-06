import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { getAllContacts, getFriendList } from '../../utils/APIRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { createChatroom } from '../../redux/actions/userAction';

export default function AddGroup() {
  const [open, setOpen] = useState(true);
  const [member, setMember] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(state => state);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const handleSearchUser = async () => {
      let data;
      if (auth._id) data = await axios.get(`${getFriendList}/${auth?._id}`);
      setSearchUser(data.data.data.friendList);
    };
    handleSearchUser();
  }, [auth]);

  const handleAddMember = ele => {
    setMember([...member, ele]);
    setSearchUser(
      searchUser.filter(member => member.fullname !== ele.fullname)
    );
  };

  const handleCreate = () => {
    const arr = member.map(user => user._id);
    dispatch(createChatroom([auth._id, ...arr]));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          dispatch({ type: 'ALERT', payload: { addGroup: false } });
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform flex flex-col justify-between overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-[400px] sm:my-8 sm:w-full sm:max-w-lg">
                <div className="pt-1">
                  <span className="px-4 ">Friend(s)</span>
                  {searchUser && (
                    <div className="bg-white px-4 overflow-y-scroll h-[200px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded border-y-2 border-[#ccc]">
                      {searchUser?.length !== 0 ? (
                        <div>
                          {searchUser?.map((contact, index) => {
                            return (
                              <div
                                className="contact flex flex-row items-center px-2 my-4"
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
                                    <div className="text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                                      <p>{contact?.fullname[0]}</p>
                                    </div>
                                  )}

                                  <h3>{contact.fullname}</h3>
                                </div>
                                <div className="username flex flex-row flex-1 justify-end mr-2">
                                  <FontAwesomeIcon
                                    onClick={() => {
                                      handleAddMember(contact);
                                    }}
                                    icon={faUserPlus}
                                    size="1x"
                                    className="cursor-pointer"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p>Empty</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="h-[110px] w-full px-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
                  <span>Member(s)</span>
                  <div className="w-full flex flex-wrap gap-2">
                    {member && member.length > 0 ? (
                      member?.map(ele => (
                        <div className="flex h-[24px] items-center bg-[#ccc] rounded-full">
                          <span className="p-2">{ele.fullname}</span>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 flex flex-row gap-3 justify-end items-center sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full my-2 justify-center rounded-md bg-[#63a09e] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#79C7C5] sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      handleCreate();
                    }}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full my-2 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:!bg-gray-200 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      dispatch({ type: 'ALERT', payload: { addGroup: false } });
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
