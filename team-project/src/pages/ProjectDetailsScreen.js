import { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../redux/projectSlice";
import Message from "../components/Message";
import DragList from "../components/DragList";
import { fetchMessages } from "../redux/chatSlice";
import { fetchTasksByProjectId } from "../redux/taskSlice";
import Loading from "../components/Loading";
import ReactScrollableFeed from "react-scrollable-feed";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function ProjectDetailsScreen(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const { project } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.user);
  const { isLoading, tasks } = useSelector((state) => state.tasks);
  const [roomMessages, loading] = useCollection(
    id &&
      db
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("createdAt", "asc")
  );
  useEffect(() => {
    if (user.username) {
      dispatch(fetchProjectById(id));
      dispatch(fetchTasksByProjectId(id));
      dispatch(fetchMessages(id));
    } else {
      history.push("/");
    }
  }, [dispatch, user, loading]);
  return (
    <ProjectDetailsContainer>
      <ProjectDetailsTaskBoardContent>
        <TaskBoardHead>
          <p>{project?.projectName}</p>
          <TaskBoarTime>
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{project.createdAt?.split("T")[0]}</span>
          </TaskBoarTime>
        </TaskBoardHead>
        <TaskBoardMain>
          {!isLoading ? <DragList id={id} tasks={tasks} /> : <Loading />}
        </TaskBoardMain>
      </ProjectDetailsTaskBoardContent>
      <ProjectDetailsGroupChatContent>
        <GroupChat>
          <p>Group Chat</p>
          <GroupChatContent id="chat">
            <ReactScrollableFeed>
              <ListChat>
                {roomMessages?.docs.map((doc) => {
                  const { message, createdAt, userEmail, userImage } =
                    doc.data();
                  return (
                    <Message
                      key={doc.id}
                      message={message}
                      timestamp={createdAt}
                      userEmail={userEmail}
                      userImage={userImage}
                    />
                  );
                })}
                {/*                 {messages?.map((message) => (
                  <Message
                    key={message.message_ID}
                    message={message.message}
                    timestamp={message.createdAt}
                    userEmail={message.userEmail}
                    userImage={message.userImage}
                  />
                ))} */}
              </ListChat>
            </ReactScrollableFeed>
          </GroupChatContent>
          <ChatInput id={id} />
        </GroupChat>
      </ProjectDetailsGroupChatContent>
    </ProjectDetailsContainer>
  );
}

const ProjectDetailsContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  @media (max-width: 1025px) {
    flex-direction: column;
    padding: 0 10px;
  }
`;
const ProjectDetailsTaskBoardContent = styled.div`
  flex: 2;
  width: 100%;
`;
const ProjectDetailsGroupChatContent = styled.div`
  flex: 1;
  width: 100%;
`;
const TaskBoardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-weight: bold;
  }
`;
const TaskBoarTime = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  span {
    margin-left: 2px;
    font-size: 16px;
  }
`;
const GroupChat = styled.div`
  padding: 0 8px;
  border-left: 1px solid #ccc;
  p {
    font-size: 18px;
    font-weight: bold;
  }
  @media (max-width: 1025px) {
    border-left: none;
  }
`;
const GroupChatContent = styled.div`
  padding: 0 8px;
  height: 340px;
  flex-grow: 1;
  border-radius: 4px;
  @media (max-width: 1025px) {
    border: 1px solid #ccc;
  }
`;
const ListChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`;
const TaskBoardMain = styled.div`
  margin-top: 20px;
`;
export default ProjectDetailsScreen;
