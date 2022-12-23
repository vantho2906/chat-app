import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faCheck,
  faCircleXmark,
  faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  sendRequestRoute,
  searchUserByFullnameRoute,
  getRequestRoute,
} from '../utils/APIRoutes';
function Notification() {
  const currentUser = JSON.parse(localStorage.getItem('chap-app-user'));
  const [currentRequest, setCurrentRequest] = useState([]);
  useEffect(() => {
    const handleRequest = async () => {
      const data = await axios.get(`${getRequestRoute}/${currentUser._id}`);
      console.log(data);
      setCurrentRequest(data.data.data.invitationsGet);
    };
    handleRequest();
  }, []);
  console.log(currentRequest);

  const handleSendRequest = async receiverId => {
    const myId = currentUser._id;
    await axios.post(sendRequestRoute, {
      receiverId,
      myId,
    });
    const data = await axios.get(`${getRequestRoute}/${currentUser._id}`);
    setCurrentRequest(data.data.data.invitationsSend);
  };

  return (
    <Container>
      {/* <div className="search-user">
        {currentRequest && currentRequest.length !== 0 ? (
          <div className="contacts">
            <div>
              {currentRequest.map((contact, index) => {
                return (
                  <div className="contact" key={index}>
                    <div className="avatar">
                      <img
                        src={
                          "data:image/png;base64, " + contact.avatar.imageBase64
                        }
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.fullname}</h3>
                      <div
                        onClick={() => {
                          handleSendRequest(contact._id);
                        }}
                      >
                        {true ? (
                          <FontAwesomeIcon icon={faUserXmark} size="1x" />
                        ) : (
                          <FontAwesomeIcon icon={faUserPlus} size="1x" />
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
      </div> */}
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
        display: grid;
        gap: 0.5rem;
        .contact {
          background-color: #ffffff30;
          min-height: 4rem;
          width: 100%;
          cursor: pointer;
          border-radius: 0.2rem;
          padding: 0.4rem;
          gap: 1rem;
          align-items: center;
          display: flex;
          transition: 0.5s ease-in-out;
          .avatar {
            justify-content: flex-start;
            img {
              hegiht: 3rem;
              width: 3rem;
              object-fit: cover;
              border-radius: 999rem;
            }
          }
          .username {
            margin-right: 0.4rem;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            h3 {
              color: #777777;
              font-weight: 400;
              padding-right: 1rem;
            }
            div {
              display: flex;
              justify-content: flex-end;
              cursor: pointer;
              z-index: 2;
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
