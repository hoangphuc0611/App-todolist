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
  const [curentProjects, setCurentProjects] = useState(projects);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const handleOpenModel = () => {
    setOpenModel(!openModel);
  };
  const handleInputChange = async (e) => {
    setInput(e.target.value);
    if (input.length > 1) {
      const filterdProjects = await projects?.filter((project) => {
        if (project?.projectName.toLowerCase().includes(input.toLowerCase()))
          return true;
        else return false;
      });
      setCurentProjects(filterdProjects);
    }
  };
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  return (
    <HomeScreenContainer>
      <SearchContent>
        <ion-icon name="search-outline"></ion-icon>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleInputChange}
          value={input}
        />
      </SearchContent>
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
      {openModel && (
        <Modal dispatch={dispatch} user={user} setOpenModel={setOpenModel} />
      )}
      {!isLoading ? (
        <HommeScreenMain>
          {input.length > 1
            ? curentProjects.map((project) => (
                <Project
                  key={project?.project_ID}
                  project={project}
                  user={user}
                />
              ))
            : projects.map((project) => (
                <Project
                  key={project?.project_ID}
                  project={project}
                  user={user}
                />
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
  min-height: 100vh;
`;
const HomeScreenHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  p {
    font-size: 18px;
    font-weight: bold;
  }
`;
const SearchContent = styled.div`
  max-width: 260px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 4px;
  background-color: #fff;
  input {
    width: 100%;
    height: 20px;
    border-radius: 4px;
    border: none;
    outline: none;
    margin-left: 2px;
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
  padding: 20px 10px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, auto));
`;
