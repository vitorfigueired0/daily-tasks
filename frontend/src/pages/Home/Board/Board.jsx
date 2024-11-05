import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import SingleSelector from "../../../components/OptionSelect/SingleSelector";
import { KanbanBoard } from "../../../components/Kanban/KanbanBoard/KanbanBoard";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import MultiSelector from "../../../components/OptionSelect/MultiSelector";

export default function Board({ tasks, setTasks, status, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearNewTask = {
    title: "",
    description: "",
    status: "",
    tags: []
  };
  const [newTask, setNewTask] = useState(clearNewTask);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tasks.rows.length) {
        return;
      }
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [tasks.rows.length, setTasks]
  );

  const handleSubmit = async () => {
    const data = {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      tags: newTask.tags
    }

    try {
      await api.post("/tasks", data, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      const response = await api.get("/tasks", {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="board-wrapper">
      <Button onClick={handleOpenModal}>
        <FaPlus />
        Add Task
      </Button>

      <KanbanBoard tasks={tasks} setTasks={setTasks}/>
      <Modal
        isCreate={true}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add new task`}
        handleSubmit={handleSubmit}
        setNewTask={setNewTask}
      >
        <InputText
          label="Title"
          placeholder={"Insert task title"}
          required={true}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <InputText
          required={true}
          label="Description"
          placeholder={"Insert task description"}
          textarea
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <SingleSelector
          label="Status"
          required={true}
          placeholder={"Select status"}
          options={status}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, status: e.target.value }))
          }
        />
        <MultiSelector
          label="Tags"
          required={true}
          placeholder="Select tags"
          options={tags}
          onChange={(selected) =>
            setNewTask((prev) => ({ ...prev, tags: selected }))
          }
        />

      </Modal>
    </div>
  );
}

Board.propTypes = {
  status: PropTypes.array.isRequired,
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
};
