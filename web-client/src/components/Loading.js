import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";
function Loading() {
  return (
    <Container>
      <ReactLoading
        type="spinningBubbles"
        color="#3480eb"
        height={300}
        width={100}
      />
    </Container>
  );
}

export default Loading;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
