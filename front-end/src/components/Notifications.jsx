import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  getRequestRoute,
  getUserRoute,
  acceptRequestRoute,
  cancelledRequestRoute,
} from '../utils/APIRoutes';
import { useSelector } from 'react-redux';
const Notification = () => {
  const [currentRequest, setCurrentRequest] = useState([]);
  const [currentUserRequest, setCurrentUserRequest] = useState([]);
  const [requestAccepted, setRequestAccepted] = useState([]);
  const [requestCancelled, setRequestCancelled] = useState([]);
  const { socket } = useSelector(state => state);
  const { auth } = useSelector(state => state);
  useLayoutEffect(() => {
    const handleRequest = async () => {
      const data = await axios.get(`${getRequestRoute}/${auth?._id}`);
      setCurrentRequest(prev => [...prev, ...data.data.data]);
      data.data.data.map(async user => {
        const item = await axios.get(`${getUserRoute}/${user.senderId}`);
        setCurrentUserRequest(prev => [...prev, item.data.data]);
      });
    };
    handleRequest();
  }, []);

  const handleAcceptedRequest = async id => {
    let inviteId = '';
    currentRequest.forEach(request => {
      if (request.senderId === id) {
        inviteId = request._id;
        return;
      }
    });
    const message = await axios.post(`${acceptRequestRoute}/${inviteId}`);
    if (message.status === 200) {
      setRequestAccepted(prev => [...prev, id]);
    }
  };

  const handleCancelledRequest = async id => {
    let inviteId = '';
    currentRequest.forEach(request => {
      if (request.senderId === id) {
        inviteId = request._id;
        return;
      }
    });
    const message = await axios.post(`${cancelledRequestRoute}/${inviteId}`);
    if (message.status === 200) {
      setRequestCancelled(prev => [...prev, id]);
    }
  };

  return (
    <Container>
      <div className="search-user w-full">
        {currentUserRequest && currentUserRequest.length !== 0 ? (
          <div className="flex flex-col gap-2 overflow-y-scroll h-[160px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-5">
            {currentUserRequest.map((contact, index) => {
              return (
                <div
                  className="contact flex flex-row bg-[#ffffff30] max-h-[4rem] h-[4rem] w-full rounded-md p-3 items-center justify-between"
                  key={index}
                >
                  <div className="flex flex-row items-center justify-center gap-3">
                    {contact.avatar ? (
                      <img
                        src={
                          'data:image/png;base64, ' + contact.avatar.imageBase64
                        }
                        alt=""
                        className="rounded-full h-[50px] w-[50px]"
                      />
                    ) : (
                      <div className="text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                        <p>{contact?.fullname[0]}</p>
                      </div>
                    )}

                    <h1 className="text-lg">
                      {contact?.fullname.length > 15
                        ? contact.fullname.substring(0, 15) + '...'
                        : contact.fullname}
                    </h1>
                  </div>

                  <div className="username">
                    {requestAccepted.includes(contact._id) ? (
                      <div className="text-lg">Accepted</div>
                    ) : requestCancelled.includes(contact._id) ? (
                      <div className="text-lg">Cancelled</div>
                    ) : (
                      <div className="flex flex-row gap-3">
                        <FontAwesomeIcon
                          onClick={() => handleAcceptedRequest(contact._id)}
                          icon={faCheck}
                          className="text-2xl cursor-pointer"
                        />
                        <FontAwesomeIcon
                          onClick={() => handleCancelledRequest(contact._id)}
                          icon={faXmark}
                          className="text-2xl cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nothing</p>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .search-user {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .contacts {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      margin-top: 1rem;
      border-bottom: 1px solid #777777;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: black;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .contact {
          background-color: #ffffff30;
          max-height: 4rem;
          height: 4rem;
          width: 100%;
          cursor: pointer;
          border-radius: 0.2rem;
          padding: 0.4rem;
          gap: 1rem;
          align-items: center;
          display: flex;
          flex-direction: row;
          // justify-content: space-between;
          transition: 0.5s ease-in-out;
          .avatar {
            display: flex;
            justify-content: flex-start;
            height: 3rem;
            width: 3rem;
            margin-right: 1rem;
            img {
              height: 3rem;
              width: 3rem;
              object-fit: cover;
              border-radius: 999rem;
            }
            
          }
          h3 {
            color: #777777;
            font-weight: 400;
            display: flex;
            justify-content: flex-start;
            flex: 1;
          }
          .username {
            margin-right: 0.4rem;
            // width: 100%;
            display: flex;
            justify-content: flex-end;
            width: 1.5rem;
            
            div {
              display: flex;
              justify-content: flex-end;
              cursor: pointer;
              z-index: 2;
              
              div {
                display: flex;
                flex-direction: row;
                font-size: 1.2rem;
                gap: 1rem;
              }
            }
          }
        }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
`;

export default Notification;
