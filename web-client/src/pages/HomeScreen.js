import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Project from "../components/Project";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/projectSlice";
import Loading from "../components/Loading";
function HomeScreen() {
  const dispatch = useDispatch();
  const [openModel, setOpenModel] = useState(false);
  const { isLoading, projects } = useSelector((state) => state.projects);
  const [user] = useAuthState(auth);
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const handleOpenModel = () => {
    setOpenModel(!openModel);
  };
  return (
    <HomeScreenContainer>
      <HomeScreenHead>
        <p>Projects</p>
        <HommeScreenHeadButton>
          {openModel ? (
            <>
              <ion-icon name="close-circle-outline"></ion-icon>
              <span onClick={handleOpenModel}>Close</span>
            </>
          ) : (
            <>
              <ion-icon name="add-circle-outline"></ion-icon>
              <span onClick={handleOpenModel}>New Project</span>
            </>
          )}
        </HommeScreenHeadButton>
      </HomeScreenHead>
      {openModel && <Modal user={user} setOpenModel={setOpenModel} />}
      {!isLoading ? (
        <HommeScreenMain>
          {projects?.map((project) => (
            <Project key={project?.project_ID} project={project} user={user} />
          ))}
        </HommeScreenMain>
      ) : (
        <Loading />
      )}
    </HomeScreenContainer>
  );
}

export default HomeScreen;
const HomeScreenContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
`;
const HomeScreenHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
  }
`;
const HommeScreenHeadButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #3480eb;
  padding: 10px;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  span {
    margin-left: 2px;
  }
  ion-icon {
    font-size: 16px;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.8;
  }
`;
const HommeScreenMain = styled.div`
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, 280px);
`;
