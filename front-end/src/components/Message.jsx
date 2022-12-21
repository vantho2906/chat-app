import React from "react";
import styled from "styled-components";

function Message() {
  return (
    <Container>
      <div>Message</div>
    </Container>
  );
}

const Container = styled.div`
  height: 70%;
  background-color: grey;
`;

export default Message;
