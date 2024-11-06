import "./Modal.css";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import Select from 'react-select'
import { api } from "../../services/api"
import { TagBadge } from "../TagBadge/TagBadge";
import { useEffect, useState } from "react";

export default function Modal({ isCreate, data, isOpen, onClose, children, title, handleSubmit, setTasks }) {
  const [statusLabel, setStatusLabel] = useState({ value: 'a', label: 'c'})

  if (!isOpen) {
    return null;
  }

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

  const status = [
    ['pending', { value: "pending", label: "To do" }], 
    ['inProgress', { value: "inProgress", label: "In Progress" }], 
    ['completed', { value: "completed", label: "Done" }]
  ]

  const statusOptions = new Map(status)
  const onSubmit = async (event) => {
    event.preventDefault();
    const success = await handleSubmit();

    if (success) {
      onClose();
    }
  };

  const updateTaskStatus = async (id, status) => {
    const data = { status: status.value }
    try {
      await api.patch(`/tasks/${id}`, data, {
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
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <header className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <button className="close-button" onClick={onClose}>
            <MdClose />
          </button>
        </header>

        {isCreate ? (
          <form onSubmit={onSubmit}>
            <div className="modal-body">{children}</div>
            <footer className="modal-footer">
              <Button onClick={onClose} secondaryStyle>
                Close
              </Button>
              <Button typeSubmit>
                <FaPlus /> Add Task
              </Button>
            </footer>
          </form>
        ) : (
          <div>
            <div className="modal-body">
              <h2>Task description:</h2>
              <p>{data.description}</p>

              <h2>Status</h2>
              <Select
                required={true}
                styles={modalSelectorStyles}
                options={Array.from(statusOptions.values())}
                defaultValue={statusOptions.get(data.status)}
                isRequired
                onChange={(e) => updateTaskStatus(data.id, e)}
              />

              <h2>Tags:</h2>
              <div className="tags">
                {data.tags.map((tag) => (<TagBadge name={tag.name} nameHex={tag.nameHex} backgroundHex={tag.backgroundHex} />))}
              </div>
            </div>
            <footer className="modal-footer">
              <Button typeSubmit>
                <FiEdit2 /> Edit task
              </Button>
            </footer>
          </div>
        )}

      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
