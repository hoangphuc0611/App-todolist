import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateProject } from "../redux/projectSlice";
import { updateTaskId } from "../redux/taskSlice";
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

function UpdateModel({
  openUpdateModal,
  setOpenUpdateModal,
  project,
  task,
  type,
}) {
  const [input, setInput] = useState(
    type === "project" ? project?.projectName : task?.content
  );
  const dispatch = useDispatch();
  const closeModal = () => {
    setOpenUpdateModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "project") {
      const data = {
        ...project,
        projectName: input,
        createdAt: new Date().toISOString(),
      };
      dispatch(updateProject(data));
    } else if ((type = "task")) {
      const updatedTask = {
        ...task,
        content: input,
        createdAt: new Date().toISOString(),
      };
      dispatch(updateTaskId(updatedTask));
    }
    setOpenUpdateModal(false);
  };
  return (
    <Modal
      isOpen={openUpdateModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <FormContent>
        <ion-icon onClick={closeModal} name="close-circle-outline"></ion-icon>
        <form onSubmit={handleSubmit}>
          <label>Nhập nội dung cần thay đổi</label>
          <input
            value={input}
            placeholder="Nhập nội dung mới"
            type="text"
            required
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Xác nhận</button>
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
      cursor: pointer;
      background-color: #3480eb;
      color: #fff;
      margin-bottom: 10px;
      &:hover {
        opacity: 0.7;
      }
    }
    input {
      margin: 10px 0;
      height: 30px;
      width: 100%;
      border-radius: 4px;
      outline: none;
      border: none;
    }
  }
`;
export default UpdateModel;
