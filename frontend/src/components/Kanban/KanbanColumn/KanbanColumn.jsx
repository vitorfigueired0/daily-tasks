import "./KanbanColumn.css"

export const KanbanColumn = ({ data }) => {
  const { id, title } = data
  
  return (
    <div id='kanban-column-wrapper'>
      <h1>{title}</h1>
      <hr id={id}/> 
    </div>
  )
}