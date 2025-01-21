import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('authToken')) {
      navigate('/auth')
    }

    let response;
    const fetchTasks = async () => {
      try {
        response = await api.get("/tasks", {
          headers: {
            Authorization: localStorage.getItem('authToken')
          }
        });
        
        setTasks(response.data);
      } catch (error) {
        console.error(error);
        if(error.status && error.status === 401) {
          navigate('/auth')
        }
      }
    };

    fetchTasks();
  }, [tags]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags", {
          headers: {
            Authorization: localStorage.getItem('authToken')
          }
        });
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);


  const statusOptions = [
    { id: 1, value: "pending", label: "To do" }, 
    { id: 2, value: "inProgress", label: "In Progress"},
    { id: 3, value: "completed", label: "Done" }
  ];

  const tabs = {
    board: (
      <Board
        status={statusOptions}
        tasks={tasks}
        setTasks={setTasks}
        tags={tags}
      />
    ),
    tags: <Tags tags={tags} setTags={setTags} />,
  };
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
