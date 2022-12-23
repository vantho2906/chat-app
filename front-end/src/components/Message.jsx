import React, { useState } from "react";
import styled from "styled-components";

function Message({ contacts }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
  };
  return (
    <Container>
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
                <img
                  src={"data:image/png;base64, " + contact.avatar.imageBase64}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{contact.fullname}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
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
          width: 3rem;
          object-fit: cover;
          border-radius: 999rem;
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
`;

export default Message;
