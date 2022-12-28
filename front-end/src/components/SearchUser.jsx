import React, { useEffect, useState } from 'react';
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
  getUserRoute,
} from '../utils/APIRoutes';
function SearchUser({ currentUser }) {
  // const [currentUser, setCurrentUser] = useState(undefined);
  const [currentRequest, setCurrentRequest] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [loadUserChats, setLoadUserChats] = useState([]);

  const handleSearchChange = e => {
    setSearchUser(e.target.value);
  };
  useEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await axios.get(
          `${getRequestSendedRoute}/${currentUser._id}`
        );
        setCurrentRequest(res.data.data);
      } catch (err) {}
    };
    handleRequest();
  }, []);
  useEffect(() => {
    const handleSearchUser = async () => {
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
    const myId = currentUser._id;
    await axios.post(sendRequestRoute, {
      receiverId,
      myId,
    });
    setCurrentRequest(prev => [...prev, { receiverId: receiverId }]);
  };

  return (
    <Container>
      <div className="search-user">
        <div className="search-input">
          <input
            type="tel"
            placeholder="Search..."
            onChange={e => {
              handleSearchChange(e);
            }}
            value={searchUser}
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
        {searchUser && loadUserChats && (
          <div className="contacts">
            {loadUserChats.length !== 0 ? (
              <div>
                {loadUserChats.map((contact, index) => {
                  return (
                    <div className="contact" key={index}>
                      <div className="avatar">
                        <img
                          src={
                            'data:image/png;base64, ' +
                            contact.avatar.imageBase64
                          }
                          alt=""
                        />
                        <h3>{contact.fullname}</h3>
                      </div>
                      <div className="username">
                        {currentUser.friendIdsList.includes(contact._id) ? (
                          <p>Friend</p>
                        ) : currentRequest.filter(
                            sender => sender.receiverId === contact._id
                          ).length > 0 ? (
                          <p>Sended</p>
                        ) : contact._id === currentUser._id ? (
                          <FontAwesomeIcon icon={faSeedling} size="1x" />
                        ) : (
                          <FontAwesomeIcon
                            onClick={() => {
                              handleSendRequest(contact._id);
                            }}
                            icon={faUserPlus}
                            size="1x"
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
    
    .search-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: #f9fbff;
      border-radius: 99rem;
      input {
        width: 100%;
        background: transparent;
        outline: none;
        border: none;
        font-size: 1rem;
      }
      #close-icon {
        cursor: pointer;
      }
      button {
        padding: 0.3rem 1rem;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        svg {
          font-size: 1.2rem;
          color: #79c7c5;
        }
      }
      
      .selected {
        background-color: rgba(249, 251, 255, 1);
      }
    }
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
          justify-content: space-between;
          transition: 0.5s ease-in-out;
          .avatar {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 3rem;
            img {
              height: 3rem;
              width: 3rem;
              object-fit: cover;
              border-radius: 999rem;
            }
            h3 {
              color: #777777;
              font-weight: 400;
              display: flex;
              justify-content: flex-start;
              flex: 1;
            }
          }
          
          .username {
            align-items: center;
            display: flex;
            justify-content: flex-end;
            width: 4rem;
            div {
              display: flex;
              cursor: pointer;
              z-index: 2;
              svg {
                font-weight: bold;
              }
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

export default SearchUser;
