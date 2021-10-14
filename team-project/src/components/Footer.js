import React from "react";
import styled from "styled-components";
function Footer() {
  return (
    <Container>
      <p>
        Copyright 2021 @<a href="https://www.facebook.com/page.ailab">AILAB</a>
      </p>
      <img
        src="./logo.png"
        alt="logo"
        loading="lazy"
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
