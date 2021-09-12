import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ValidModel from "./ValidModel";
import { deleteProject } from "../redux/projectSlice";
import UpdateModal from "./UpdateModal";
function Project({ project, user }) {
  const [openValidModel, setOpenValidModel] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (user.username) setOpenValidModel(true);
    else {
      alert("Vui lòng đăng nhập!");
    }
  };
  const handleDelete = () => {
    dispatch(deleteProject(project?.project_ID));
  };
  return (
    <Container>
      <ValidModel
        openValidModel={openValidModel}
        setOpenValidModel={setOpenValidModel}
        project={project}
      />
      <UpdateModal
        setOpenUpdateModal={setOpenUpdateModal}
        openUpdateModal={openUpdateModal}
        project={project}
        type="project"
      />
      {openAction && (
        <MoreContent>
          <ActionContent onClick={handleDelete}>
            <ion-icon name="trash-outline"></ion-icon>
            <span>Delete</span>
          </ActionContent>
          <ActionContent onClick={() => setOpenUpdateModal(true)}>
            <ion-icon name="hammer-outline"></ion-icon>
            <span>Update</span>
          </ActionContent>
        </MoreContent>
      )}
      <HommeScreenMainElement>
        {user && user.username === project.projectCreatorName && (
          <IonConten onClick={() => setOpenAction(!openAction)}>
            {!openAction ? (
              <ion-icon name="menu-outline"></ion-icon>
            ) : (
              <ion-icon name="close-outline"></ion-icon>
            )}
          </IonConten>
        )}
        <p>{project.projectName}</p>
        <ElementCotent onClick={handleClick}>
          <img src={project.projectCreatorAvatar} alt="avatar" />
          <ElementDay>
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{project.createdAt?.split("T")[0]}</span>
          </ElementDay>
        </ElementCotent>
      </HommeScreenMainElement>
    </Container>
  );
}

export default Project;
const Container = styled.div`
  position: relative;
`;
const HommeScreenMainElement = styled.div`
  padding: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    8px -7px 13px -8px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 10px 13px -7px #000000, 8px -7px 13px -8px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  background-color: #3480eb;
  color: #fff;
  text-align: center;
  transition: transform 0.2s ease-in;
  position: relative;
  p {
    font-size: 18px;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.02);
  }
`;
const MoreContent = styled.div`
  position: absolute;
  color: #fff;
  right: -10px;
  top: -70px;
  z-index: 10;
  background-color: #3480eb;
  padding: 0 10px;
  border-radius: 4px;
`;
const ActionContent = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  span {
    font-weight: bold;
    margin-left: 4px;
  }
`;
const IonConten = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
  cursor: pointer;
  ion-icon {
    font-size: 20px;
  }
`;

const ElementCotent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
`;
const ElementDay = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 2px;
  }
`;
