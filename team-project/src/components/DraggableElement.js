import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addTasksByProjectId } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
function DraggableElement({ prefix, elements, id }) {
  const { user } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleAddTask = () => {
    const data = {
      createdAt: new Date().toISOString(),
      content: input,
      userEmailCreator: user.username,
      userImageCreator: user.img,
      typeTask: prefix,
      project_ID: id,
    };
    dispatch(addTasksByProjectId(data));
    setOpenModal(false);
  };
  useEffect(() => {}, [dispatch]);
  return (
    <DroppableStyles>
      <ColumnHeader>
        <span>{prefix}</span>
        <ion-icon
          name={openModal ? "close-circle-outline" : "add-circle-outline"}
          onClick={handleOpenModal}
        ></ion-icon>
      </ColumnHeader>
      {openModal && (
        <ModelContent>
          <input
            type="text"
            placeholder="New task"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </ModelContent>
      )}
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements?.map((item, index) => (
              <ListItem key={item?.task_ID} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  );
}
const ColumnHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  span {
    text-transform: uppercase;
    font-weight: bold;
  }
  ion-icon {
    font-size: 20px;
    cursor: pointer;
  }
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #3480eb;
`;
const ModelContent = styled.div`
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border: 2px solid #fff;
  margin-bottom: 10px;
  input {
    width: 90%;
    margin-bottom: 10px;
    outline: none;
    height: 20px;
    border-radius: 4px;
    padding: 4px;
    font-size: 14px;
    border: none;
  }
  button {
    width: 100px;
    border: none;
    border-radius: 4px;
    background-color: #fff;
    color: #3480eb;
    padding: 8px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export default React.memo(DraggableElement);
