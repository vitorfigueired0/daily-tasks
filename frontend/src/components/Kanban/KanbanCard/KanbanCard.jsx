import { useState } from "react";
import { api } from "../../../services/api"
import Modal from "../../Modal/Modal";
import { TagBadge } from "../../TagBadge/TagBadge";
import InputText from "../../InputText/InputText";
import Select from 'react-select'
import "./KanbanCard.css";

export const KanbanCard = ({ data, setTasks, tagOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: data?.title,
    description: data?.description,
    status: data?.status,
    tags: data?.tags
  })

  const { id, title, description, tags } = data;

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  const handleSubmit = async () => {
    setIsEditing(false)

    formData.tags = formData.tags.map((tag) => {
      if(tag.id && tag.name) {
        return tag
      }

      return { id: tag.value, name: tag.label }
    })

    try {
      await api.patch(`/tasks/${id}`, formData, {
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

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`, {
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
      handleCloseModal()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id='kanban-card-wrapper' onClick={() => setIsModalOpen(true)}>
      <h1>{title}</h1>
      <p>{description.length <= 100 ? description : description.slice(0, 96) + '...'}</p>
      <hr />
      <div id='badge-div'>
        {tags.map((tag) => (
          <TagBadge name={tag.name} nameHex={tag.nameHex} backgroundHex={tag.backgroundHex} key={tag.id} />
        ))}
      </div>

      <Modal
        isView={true}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${title}`}
        setTasks={setTasks}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      >
        {isEditing ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <InputText
                  label="Title *"
                  value={formData.title}
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <InputText
                  label="Description *"
                  value={formData.description}
                  textarea
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
                <label>Status *</label>
                <Select
                  required={true}
                  styles={modalSelectorStyles}
                  options={Array.from(statusOptions.values())}
                  defaultValue={statusOptions.get(formData.status)}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.value }))
                  }
                  isRequired
                />
                <label>Tags</label>
                <Select
                  styles={modalSelectorStyles}
                  options={tagOptions}
                  isMulti
                  value={formData.tags.map((tag) => { return {
                    value: tag.id ? tag.id : tag.value, 
                    label: tag.name ? tag.name : tag.label
                  }})}
                  onChange={(values) =>
                    setFormData((prev) => ({ ...prev, tags: values }))
                  }
                />
              </div>
            </form>
          </>
        ) : (
          <>
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
          </>
        )}


      </Modal>
    </div>
  );
};