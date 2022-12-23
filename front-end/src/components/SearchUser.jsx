import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCheck,
  faCircleXmark,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  sendRequestRoute,
  searchUserByFullnameRoute,
  getRequestRoute,
} from "../utils/APIRoutes";
function SearchUser() {
  const [currentRequest, setCurrentRequest] = useState(undefined);
  const [searchUser, setSearchUser] = useState("");
  const [loadUserChats, setLoadUserChats] = useState([]);
  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
  };
  useEffect(() => {
    const handleRequest = async () => {
      const data = await axios.get(`${getRequestRoute}/${currentUser._id}`);
      setCurrentRequest(data.data.data.invitationsSend);
    };
    handleRequest();
  }, []);
  useEffect(() => {
    const handleSearchUser = async () => {
      let fullname = searchUser;
      const data = await axios.post(searchUserByFullnameRoute, {
        fullname,
      });
      if (data.data.data.length !== 0) {
        const loader = data.data.data;
        setLoadUserChats(loader);
      } else {
        setLoadUserChats([]);
      }
    };
    handleSearchUser();
  }, [searchUser]);

  const currentUser = JSON.parse(localStorage.getItem("chap-app-user"));
  const handleSendRequest = async (receiverId) => {
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
      <div className="search-user">
        <div className="search-input">
          <input
            type="tel"
            placeholder="Search..."
            onChange={(e) => {
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
                setSearchUser("");
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
                            "data:image/png;base64, " +
                            contact.avatar.imageBase64
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
                          {currentRequest.filter(
                            (sender) => sender.receiverId === contact._id
                          ).length > 0 ? (
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

export default SearchUser;
