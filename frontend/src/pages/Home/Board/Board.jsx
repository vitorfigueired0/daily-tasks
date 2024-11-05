import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useEffect, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import { KanbanBoard } from "../../../components/Kanban/KanbanBoard/KanbanBoard";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import Select from 'react-select'

export default function Board({ tasks, setTasks, status, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    status: false,
  });

  useEffect(() => {
    const mappedTags = tags.map((tag) => { return { value: tag.id, label: tag.name } })
    setTagOptions(mappedTags)
  }, [tags]);

  const modalSelectorStyles = {
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

  const filterSelectorStyles = {
    container: (provided) => ({
      ...provided,
      width: '200px',
      cursor: 'pointer'
    }),
    
    control: (provided) => ({
      ...provided,
      background: 'rgba(238, 242, 245, 0.50)',
      padding: '3px 1px',
      border: 'none',
      borderRadius: '.5rem',
      outline: '1px solid #E9EBEF',
      cursor: 'pointer'
    }),
    menu: (provided) => ({
      ...provided,
      background: 'white',
    }),
    option: (provided) => ({
      ...provided,
      cursor: 'pointer'
    })
  };
  
  const clearTask = { title: "", description: "", status: "", tags: [] }
  const [newTask, setNewTask] = useState(clearTask);
  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleChangeFilter = async (tag) => {
    try {
      const response = await api.get(`/tasks${tag ? `?tag=${tag.value}` : ''}`, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      setTasks(response.data);
      return true
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async () => {
    const newErrors = {
      title: !newTask.title,
      description: !newTask.description,
      status: !newTask.status,
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.description || newErrors.status) {
      console.error('Fill in all mandatory fields.');
      return false
    }

    const mappedTags = newTask.tags.map((tag) => { return { tagId: tag.value } })
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
      setNewTask(clearTask)
      return true
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="board-wrapper">

      <div className="board-header">
        <Button onClick={handleOpenModal}>
          <FaPlus />
          Add Task
        </Button>
        
        <div className="board-filters">
          <span>Filter by tag:</span>
          <Select
            styles={filterSelectorStyles}
            options={tagOptions}
            isClearable={true}
            onChange={(v) => handleChangeFilter(v)}
          />
        </div>

      </div>

      <KanbanBoard tasks={tasks} setTasks={setTasks} />
      <Modal
        isCreate={true}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add new task`}
        handleSubmit={(e, success) => handleSubmit(e, success)}
        setNewTask={setNewTask}
      >
        <InputText
          label="Title *"
          placeholder={"Insert task title"}
          required={true}
          error={errors.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <InputText
          required={true}
          label="Description *"
          placeholder={"Insert task description"}
          textarea
          error={errors.description}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <label>Status *</label>
        <Select
          styles={modalSelectorStyles}
          options={status}
          isRequired
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, status: e.value }))
          }
        />

        <label>Tags</label>
        <Select
          styles={modalSelectorStyles}
          options={tagOptions}
          isMulti
          onChange={(values) =>
            setNewTask((prev) => ({ ...prev, tags: values }))
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