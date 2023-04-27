import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClose } from '@fortawesome/free-solid-svg-icons';

const Toast = ({ title, body, bgColor }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: 'ALERT', payload: {} });
  };
  return (
    <div
      className={``}
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        zIndex: 50,
        width: '300px',
      }}
    >
      <div className={`toast-header text-black ${bgColor}`}>
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close text-xl"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faClose} size="1x" className="" />
        </button>
      </div>
      <div className="toast-body bg-white">
        {typeof body === 'string' ? (
          body
        ) : (
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const FormContainer = styled.div`
  .err {
    toast;
     show position-fixed text-light
  }

  .successMsg {
    background: rgb(9, 158, 54);
    color: #fff9;
    text-align: center;
    padding: 10px 0;
    letter-spacing: 1.3px;
  }
`;

export default Toast;
