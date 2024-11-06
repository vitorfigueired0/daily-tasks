import "./Modal.css";
import PropTypes from "prop-types";
import { MdClose, MdOutlineSave } from "react-icons/md";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

export default function Modal({
  isView,
  isOpen,
  onClose,
  children,
  title,
  handleSubmit,
  isEditing,
  setIsEditing,
}) {

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const success = await handleSubmit();


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

        {isView ? (
          <div>
            <div className="modal-body">{children}</div>

            {isEditing ? (
              <footer className="modal-footer">
                <Button onClick={onSubmit}>
                  <MdOutlineSave /> Save changes
                </Button>
              </footer>
            ) : (
              <footer className="modal-footer">
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <FiEdit2 /> Edit task
                </Button>
              </footer>)
            }

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
