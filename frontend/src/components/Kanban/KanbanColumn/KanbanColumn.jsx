import { useEffect, useState } from "react"
import "./KanbanColumn.css"
import { KanbanCard } from "../KanbanCard/KanbanCard"

export const KanbanColumn = ({ data, tasks, setTasks }) => {
  const [cardsData, setCardsData] = useState([])
  const { id, title, statusId } = data

  useEffect(() => {
    if (tasks) {
      const columnTasks = tasks.rows.filter((task) => task.status === statusId)
      setCardsData(columnTasks)
    }
  }, [tasks])


  return (
    <div id='kanban-column-wrapper'>
      <h1>{title}</h1>
      <hr id={id} />
      {cardsData.map((card) => (
        <KanbanCard data={card} setTasks={setTasks} key={card.id}/>
      ))}
    </div>
  )
}