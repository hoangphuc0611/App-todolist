import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { updateTaskId } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
const DragDropContextContainer = styled.div`
  padding-right: 4px;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];

function DragList({ id, tasks }) {
  const [elements, setElements] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchTasks = async () => {
    const listTodo = [];
    const listInProgress = [];
    const listDone = [];
    tasks?.forEach((task) => {
      if (task.typeTask === "todo") {
        listTodo.push(task);
      } else if (task.typeTask === "done") {
        listDone.push(task);
      } else {
        listInProgress.push(task);
      }
    });
    setElements({
      todo: listTodo,
      inProgress: listInProgress,
      done: listDone,
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchTasks();
  }, [dispatch]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setElements(listCopy);
    let newTasks = tasks;
    let task = {};
    newTasks.forEach((t) => {
      if (t.task_ID === parseInt(result.draggableId)) {
        task = { ...t, typeTask: result.destination.droppableId };
      }
    });
    dispatch(updateTaskId(task));
  };

  return (
    <DragDropContextContainer>
      {!loading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {lists?.map((listKey) => (
              <DraggableElement
                elements={elements[`${listKey}`]}
                key={listKey}
                prefix={listKey}
                id={id}
              />
            ))}
          </ListGrid>
        </DragDropContext>
      )}
    </DragDropContextContainer>
  );
}

export default React.memo(DragList);
