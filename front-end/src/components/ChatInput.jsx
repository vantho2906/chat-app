import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');

  const sendChat = e => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <div className="h-[14%] w-full bg-white">
      <form
        className="flex flex-row items-center h-full w-full justify-between px-8"
        onSubmit={e => sendChat(e)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          className="h-full outline-none flex justify-start placeholder:text-[#79C7C5] text-[#777777]"
        />
        <button className="text-[#79C7C5] text-[20px]">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
