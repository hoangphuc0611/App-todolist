import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const customStyles = {
  content: {
    width: "max-content",
    height: "max-content",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ValidModel({ openValidModel, setOpenValidModel, project }) {
  const history = useHistory();
  const [input, setInput] = useState();
  const [check, setCheck] = useState(true);
  const closeModal = () => {
    setOpenValidModel(false);
    setCheck(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === project?.projectPassword) {
      history.push(`/project/${project.project_ID}`);
    } else {
      setCheck(false);
    }
  };
  return (
    <Modal
      isOpen={openValidModel}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <FormContent>
        <ion-icon onClick={closeModal} name="close-circle-outline"></ion-icon>
        <form onSubmit={handleSubmit}>
          <label>Please enter password</label>
          <input
            placeholder="Passwrod"
            type="password"
            required
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Confirm</button>
          {!check && <span>Password not match. Please try again!</span>}
        </form>
      </FormContent>
    </Modal>
  );
}
const FormContent = styled.div`
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  position: relative;
  ion-icon {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  form {
    border-radius: 4px;
    background-color: #ccc;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label {
      font-size: 18px;
      font-weight: bold;
    }
    button {
      width: 100px;
      height: 30px;
      border-radius: 4px;
      border: none;
      background-color: #4290f5;
      cursor: pointer;
      color: #fff;
      margin-bottom: 10px;
    }
    input {
      margin: 10px 0;
      height: 30px;
      width: 100%;
      border-radius: 4px;
      outline: none;
      border: none;
    }
    span {
      color: red;
    }
  }
`;
export default ValidModel;
