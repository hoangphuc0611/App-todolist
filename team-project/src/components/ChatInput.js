import React, { useState } from "react";
import styled from "styled-components";
import { addMessage } from "../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
function ChatInput({ id }) {
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sendMessage = (e) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    const data = {
      project_ID: id,
      message: input,
      userEmail: user.username,
      userImage: user.img,
      createdAt: new Date().toISOString(),
    };
    db.collection("rooms").doc(id).collection("messages").add({
      message: input,
      userEmail: user.username,
      userImage: user.img,
      createdAt: new Date().toISOString(),
    });
    dispatch(addMessage(data));
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
          required
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
export default React.memo(ChatInput);
