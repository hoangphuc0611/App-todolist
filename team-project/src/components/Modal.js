import React, { useState } from "react";
import styled from "styled-components";
import { addProject } from "../redux/projectSlice";
const initialState = {
  projectName: "",
  projectPassword: "",
};
function Modal({ dispatch, user, setOpenModel }) {
  const [formProject, setFormProject] = useState(initialState);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (user) {
      const data = {
        createdAt: new Date().toISOString(),
        projectName: formProject.projectName,
        projectPassword: formProject.projectPassword,
        projectCreatorName: user.username,
        projectCreatorAvatar: user.img,
      };
      dispatch(addProject(data));
      window.location.reload();
      setOpenModel(false);
    } else {
      alert("Vui lòng đăng nhập trước khi tạo");
    }
  };
  const handleChange = (e) => {
    setFormProject({ ...formProject, [e.target.name]: e.target.value });
  };
  return (
    <ModelContent>
      <FormContent onSubmit={handleSubmitForm}>
        <input
          name="projectName"
          type="text"
          placeholder="Project's Name"
          onChange={handleChange}
          required
        />
        <input
          name="projectPassword"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">ADD</button>
      </FormContent>
    </ModelContent>
  );
}
const ModelContent = styled.div`
  width: max-content;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 4px;
`;
const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-bottom: 20px;
    width: 240px;
    padding: 8px 10px;
    outline: none;
  }
  button {
    width: 100px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: #3480eb;
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export default Modal;
