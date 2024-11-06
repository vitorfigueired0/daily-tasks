import { useState } from "react";
import { api } from "../../../services/api"
import Modal from "../../Modal/Modal";
import { TagBadge } from "../../TagBadge/TagBadge";
import Select from 'react-select'
import "./KanbanCard.css";

export const KanbanCard = ({ data, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    console.log(1)
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
        data={data}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${title}`}
        setTasks={setTasks}
      >
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

      </Modal>
    </div>
  );
};
