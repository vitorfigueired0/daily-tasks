import "./Modal.css";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";


export default function Modal({ isCreate, data, isOpen, onClose, children, title, handleSubmit }) {
  if (!isOpen) {
    return null;
  }

  const statusMap = [{id: 'inProgress', label: 'In Progress'}, {id: ''}]

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit();
    onClose();
  };

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
              <p>{`Task description: ${data.description}`}</p>
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
