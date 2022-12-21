import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      // setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.fullname);
    }
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <div className="avatar">
              <img
                src="https://fictionhorizon.com/wp-content/uploads/2021/08/1608125060_One-Piece-this-is-how-Luffy-would-be-if-he-1024x535.jpeg"
                alt=""
              />
              <h3>{currentUser.username}</h3>
            </div>
            <h3>Chat app</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src="" alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 13% 87%;
  background-color: rgba(249, 251, 255, 0.5);
  box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
  overflow: hidden;
  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    gap: 1rem;
    .avatar {
      display: flex;
      width: 2rem;
      align-items: center;
      img {
        border-radius: 999rem;
        height: 2rem;
        max-inline-size: 100%;
      }
      h3 {
        padding-left: 0.5rem;
      }
    }
    h3 {
      color: #79c7c5;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin-top: 2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: black;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff30;
      min-height: 4rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          hegiht: 3rem;
        }
      }
      .username {
        h3 {
          color: #777777;
          font-weight: 400;
        }
      }
    }
    .selected {
      background-color: rgba(249, 251, 255, 1);
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

export default Contacts;
