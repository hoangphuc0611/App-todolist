import React from "react";
import styled from "styled-components";
function Footer() {
  return (
    <Container>
      <p>
        Copyright 2021 @<a href="https://www.facebook.com/page.ailab">AILAB</a>
      </p>
      <img
        src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.6435-9/158164145_215338803672391_9072952637420078797_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8SEUADBBvmIAX-aCH70&_nc_ht=scontent-sin6-2.xx&oh=077f3cdd06d219139d5558630482ee4f&oe=61502FC5"
        alt="logo"
      />
    </Container>
  );
}

export default Footer;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 0;
  background-color: #3480eb;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-left: 4px;
  }
`;
