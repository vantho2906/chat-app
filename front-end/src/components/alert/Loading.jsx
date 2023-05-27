import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <FormContainer>
      <div className="d-flex z-30 fixed top-0 left-0 w-100 h-100 text-center align-items-center justify-content-center">
        <div className="meetup ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  div {
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  @-webkit-keyframes meetup {
    0%,
    100% {
      -webkit-transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
      transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
    }
    50% {
      -webkit-transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
      transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
    }
  }
  @keyframes meetup {
    0%,
    100% {
      -webkit-transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
      transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
    }
    50% {
      -webkit-transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
      transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
    }
  }

  .meetup {
    -webkit-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
    height: 10px;
    width: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .meetup div {
    height: 100%;
    position: absolute;
    width: 100%;
    -webkit-animation: meetup 1.25s infinite ease;
    animation: meetup 1.25s infinite ease;
    background: black;
    border-radius: 100%;
  }
  .meetup div:nth-child(1) {
    --rotation: 90;
  }
  .meetup div:nth-child(2) {
    --rotation: 180;
  }
  .meetup div:nth-child(3) {
    --rotation: 270;
  }
  .meetup div:nth-child(4) {
    --rotation: 360;
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
