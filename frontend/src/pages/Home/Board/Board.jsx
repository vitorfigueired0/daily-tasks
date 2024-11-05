import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import SingleSelector from "../../../components/OptionSelect/SingleSelector";
import { KanbanBoard } from "../../../components/Kanban/KanbanBoard/KanbanBoard";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import Select from 'react-select'

export default function Board({ tasks, setTasks, status, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagOptions, setTagOptions] = useState([])

  useEffect(() => {
    const mappedTags = tags.map((tag) => { return { value: tag.id, label: tag.name } })
    setTagOptions(mappedTags)
  }, [tags]);

  const selectorStyles = {
    container: (provided) => ({
      ...provided,
      height: '40px'
      
    }),
    control: (provided) => ({
     ...provided,
      background: 'rgba(238, 242, 245, 0.50)',
      padding: '5px 3px',
      border: 'none',
      borderRadius: '.5rem',
      outline: '1px solid #E9EBEF',
    }),
    menu: (provided) => ({
      ...provided,
      background: 'white',
    }),
};

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
    const mappedTags = newTask.tags.map((tag) => {
      return { tagId: tag.value }
    })
    
    const data = {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      tags: mappedTags
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

      <KanbanBoard tasks={tasks} setTasks={setTasks} />
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
        
        <label>Status</label>
        <Select
          styles={selectorStyles}
          options={status}
          defaultValue={status[0]}
          onChange={(e) => 
            setNewTask((prev) => ({ ...prev, status: e.value}))
          }
        />
        
        <label>Tags</label>
        <Select
          styles={selectorStyles}
          options={tagOptions}
          isMulti
          onChange={(values) => 
            setNewTask((prev) => ({ ...prev, tags: values}))
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
