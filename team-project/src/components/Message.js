import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

function Message({ message, timestamp, userEmail, userImage }) {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
      {user.username === userEmail ? (
        <ElemetMeChat>
          <img src={userImage} alt="avatar__member" />
          <MessageContent>
            <span>{message}</span>
          </MessageContent>
        </ElemetMeChat>
      ) : (
        <ElemetChat>
          <img src={userImage} alt="avatar__member" />
          <MessageContent>
            <span>{message}</span>
          </MessageContent>
        </ElemetChat>
      )}
    </>
  );
}
const ElemetMeChat = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  margin-bottom: 10px;
  cursor: default;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 50%;
    margin: 0 2px;
  }
`;
const ElemetChat = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
  cursor: default;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 50%;
    margin: 0 2px;
  }
`;
const MessageContent = styled.div`
  line-height: 1.4;
  border-radius: 8px;
  padding: 8px;
  background-color: #3480eb;
  max-width: 80%;
  span {
    word-break: break-all;
    font-size: 16px;
    color: #fff;
  }
`;
export default Message;
