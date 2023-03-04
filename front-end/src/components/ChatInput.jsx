import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = emoji => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = e => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <div className="h-[16%] w-full bg-[#F9FBFF]">
      {/* <div className="emoji">
          <FontAwesomeIcon
            icon={faFaceSmile}
            onClick={handleEmojiPickerHideShow}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div> */}
      <form
        className="flex flex-row justify-center items-center h-full w-full px-4"
        onSubmit={e => sendChat(e)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          className="h-full outline-none flex justify-start w-[90%] placeholder:text-[#79C7C5] text-[#777777]"
        />
        <button className="h-full w-[10%] text-[#79C7C5]">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

const Container = styled.div`
  display: grid;
  height: 16%;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: rgba(249, 251, 255, 1);
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
    color: black;
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #79C7C5;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -320px;
        width: 250px !important;
        height: 300px !important;
        .epr-preview {
            display: none;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    align-items: center;
    display: flex;
    background: #F9FBFF;
    gap: 2rem;
    input {
      background: #F9FBFF;
      width: 90%;
      height: 60%;
      color: #777777;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &:focus {
        outline: none;
      }
      ::placeholder {
        color: #79C7C5;
      } 
    }
    button {
      padding: 0.3rem 1rem;
      background: #F9FBFF;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      svg {
        font-size: 1.2rem;
        color: #79C7C5;
      }
    }
   }
}
`;

export default ChatInput;
