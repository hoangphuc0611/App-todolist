import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import styled from "styled-components";
import { deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import UpdateModal from "./UpdateModal";
const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border: 3px solid white;
  border-radius: 50%;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  F span {
    font-weight: bold;
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ion-icon {
    cursor: pointer;
    font-size: 18px;
  }
`;
const ActionContainer = styled.div`
  position: absolute;
  top: -46px;
  right: 20px;
  background-color: #3480eb;
  border-radius: 2px;
  padding: 4px;
`;
const ActionContent = styled.div`
  color: white;
  display: flex;
  font-weight: bold;
  align-items: center;
  margin-top: 4px;
  cursor: pointer;
  span {
    margin-left: 4px;
  }
  &:hover {
    opacity: 0.7;
  }
`;
const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  position: relative;
`;
const ListItem = ({ item, index }) => {
  const [openAction, setOpenAction] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(item));
    setOpenAction(false);
  };
  return (
    <div>
      <UpdateModal
        setOpenUpdateModal={setOpenUpdateModal}
        openUpdateModal={openUpdateModal}
        task={item}
        type="task"
      />
      <Draggable draggableId={item.task_ID?.toString()} index={index}>
        {(provided, snapshot) => {
          return (
            <DragItem
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {openAction && (
                <ActionContainer>
                  <ActionContent onClick={handleDelete}>
                    <ion-icon name="trash-outline"></ion-icon>
                    <span>Delete</span>
                  </ActionContent>
                  <ActionContent onClick={() => setOpenUpdateModal(true)}>
                    <ion-icon name="hammer-outline"></ion-icon>
                    <span>Update</span>
                  </ActionContent>
                </ActionContainer>
              )}
              <CardHeader>
                <span>{item?.content}</span>
                {!openAction ? (
                  <ion-icon
                    name="menu-outline"
                    onClick={() => setOpenAction(true)}
                  ></ion-icon>
                ) : (
                  <ion-icon
                    name="close-outline"
                    onClick={() => setOpenAction(false)}
                  ></ion-icon>
                )}
              </CardHeader>
              <CardFooter>
                <Author>
                  <Avatar src={`${item?.userImageCreator}`} />
                </Author>
              </CardFooter>
            </DragItem>
          );
        }}
      </Draggable>
    </div>
  );
};

export default ListItem;
