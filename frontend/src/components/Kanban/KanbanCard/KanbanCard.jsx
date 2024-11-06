import { useState } from "react"
import Modal from "../../Modal/Modal"
import { TagBadge } from "../../TagBadge/TagBadge"
import "./KanbanCard.css"

export const KanbanCard = ({ data, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id, title, description, tags } = data

  const truncateDescription = () => {
    if (description.length <= 100) {
      return description
    }

    return description.slice(0, 96).concat('...')
  }

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div id='kanban-card-wrapper' onClick={() => setIsModalOpen(true)}>
      <h1>{title}</h1>
      <p>{truncateDescription()}</p>
      <hr />

      <div id='badge-div'>
        {tags.map((tag) => (
          <TagBadge name={tag.name} nameHex={tag.nameHex} backgroundHex={tag.backgroundHex} key={tag.id}/>
        ))}
      </div>

      <Modal
        isCreate={false}
        data={data}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        setTasks={setTasks}
        handleSubmit={handleCloseModal}
      >
        <div></div>
      </Modal>
    </div>
  )
} 