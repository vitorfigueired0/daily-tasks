import "./KanbanCard.css"

export const KanbanCard = ({ data }) => {
  const { description, tag } = data

  const truncateDescription = () => {
    if(description.length <= 100){
      return description
    }

    return description.slice(0, 96).concat('...')
  }

  return (
    <div id='kanban-card-wrapper'>
      <h1>Título aqui</h1>
      <p>{truncateDescription()}</p>
      <hr />

      <div id='badge-div'>
        <span>Nome da tag</span>
      </div>
    </div>
  )
} 