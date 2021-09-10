import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { addMessage } from "../redux/chatSlice";
import { useDispatch } from "react-redux";
function ChatInput({ id, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const sendMessage = (e) => {
    e.preventDefault();
    if (!id) {
      return false;
    }
    const data = {
      message: input,
      userEmail: user?.email,
      userImage: user?.photoURL,
      project_ID: id,
      createdAt: new Date().toISOString(),
    };
    dispatch(addMessage(data));
    chatRef?.current.scrollIntoView({
      behavior: "smooth",
    });
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
        />
        <button hidden type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </ChatInputContainer>
  );
}
const ChatInputContainer = styled.div`
  border-radius: 20px;
  margin-top: 10px;
  > form {
    display: flex;
    justify-content: flex-start;
  }
  > form > input {
    width: 100%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 12px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
export default ChatInput;
