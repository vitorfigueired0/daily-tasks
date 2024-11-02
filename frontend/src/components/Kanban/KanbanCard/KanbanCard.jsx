import { useState } from "react"
import Modal from "../../Modal/Modal"
import "./KanbanCard.css"

export const KanbanCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { title, description, tag } = data

  const truncateDescription = () => {
    if(description.length <= 100){
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
        <span>Nome da tag</span>
      </div>
      <Modal
        isCreate={false}
        data={data}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      >

      </Modal>
    </div>
  )
} 