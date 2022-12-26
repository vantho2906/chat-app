import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faCheck,
  faXmark,
  faCircleXmark,
  faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  getRequestRoute,
  getUserRoute,
  acceptRequestRoute,
  cancelledRequestRoute,
} from '../utils/APIRoutes';
function Notification() {
  const currentUser = JSON.parse(localStorage.getItem('chat-app-user'));
  const [currentRequest, setCurrentRequest] = useState([]);
  const [currentUserRequest, setCurrentUserRequest] = useState([]);
  const [requestAccepted, setRequestAccepted] = useState([]);
  const [requestCancelled, setRequestCancelled] = useState([]);
  useEffect(() => {
    const handleRequest = async () => {
      const data = await axios.get(`${getRequestRoute}/${currentUser._id}`);
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
    console.log(inviteId);
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
    console.log(inviteId);
    const message = await axios.post(`${cancelledRequestRoute}/${inviteId}`);
    if (message.status === 200) {
      setRequestCancelled(prev => [...prev, id]);
    }
  };

  return (
    <Container>
      <div className="search-user">
        {currentUserRequest && currentUserRequest.length !== 0 ? (
          <div className="contacts">
            <div>
              {currentUserRequest.map((contact, index) => {
                return (
                  <div className="contact" key={index}>
                    <div className="avatar">
                      <img
                        src={
                          'data:image/png;base64, ' + contact.avatar.imageBase64
                        }
                        alt=""
                      />
                    </div>
                    <h3>{contact.fullname}</h3>
                    <div className="username">
                      <div>
                        {requestAccepted.includes(contact._id) ? (
                          <div>Accepted</div>
                        ) : requestCancelled.includes(contact._id) ? (
                          <div>Cancelled</div>
                        ) : (
                          <div>
                            <FontAwesomeIcon
                              onClick={() => handleAcceptedRequest(contact._id)}
                              icon={faCheck}
                              size="1x"
                            />
                            <FontAwesomeIcon
                              onClick={() =>
                                handleCancelledRequest(contact._id)
                              }
                              icon={faXmark}
                              size="1x"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>Nothing</p>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search-user {
    display: flex;
    flex-direction: column;
    width: 100%;
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
