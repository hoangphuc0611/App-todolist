import React from "react";
import styled from "styled-components";
function Member() {
  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="avatar__member"
      />
    </Container>
  );
}
const Container = styled.div`
  margin-right: 12px;
  img {
    width: 34px;
    height: 34px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 50%;
  }
`;
export default Member;
