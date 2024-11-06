import "./Modal.css";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Modal({ isView, data, isOpen, onClose, children, title, handleSubmit, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const success = await handleSubmit();

    if (success) {
      onClose();
    }
  };

  const handleEditTask = () => {
    setIsEditing(true)
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

        {isView ? (
          <div>
            <div className="modal-body">{children}</div>
            <footer className="modal-footer">
              <Button onClick={() => console.log(1)}>
                <FiEdit2 /> Edit task
              </Button>
            </footer>
          </div>

        ) : (
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
