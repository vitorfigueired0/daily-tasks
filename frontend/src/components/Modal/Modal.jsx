import "./Modal.css";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import SingleSelector from "../OptionSelect/SingleSelector";
import { api } from "../../services/api"

export default function Modal({ isCreate, data, isOpen, onClose, children, title, handleSubmit, setTasks }) {
  
  if (!isOpen) {
    return null;
  }

  const statusOptions = [
    { id: 1, value: "pending", label: "To do" }, 
    { id: 2, value: "inProgress", label: "In Progress"},
    { id: 3, value: "completed", label: "Done" }
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit();
    onClose();
  };

  const updateTaskStatus = async (id, status) => {
    const data = { status }
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
              
              <h2>Status:</h2>
              <SingleSelector
                required={true}
                value={data.status}
                options={statusOptions}
                onChange={(e) => updateTaskStatus(data.id, e.target.value)}
              />
              
              <h2>Tags:</h2>
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
