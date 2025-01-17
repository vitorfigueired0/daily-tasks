import { useEffect, useState } from "react";
import "./KanbanColumn.css";
import { KanbanCard } from "../KanbanCard/KanbanCard";


export const KanbanColumn = ({ data, tasks, setTasks, tagOptions }) => {
  const [cardsData, setCardsData] = useState([]);
  const [showHiddenTasks, setShowHiddenTasks] = useState(false);
  const { id, title, statusId } = data;

  useEffect(() => {
    if (tasks) {
      const columnTasks = tasks.rows.filter((task) => {
        if (task.status !== statusId) return false;
        return true;
      });

      setCardsData(columnTasks);
    }
  }, [tasks, showHiddenTasks]);

  return (
    <div className="kanban-column-wrapper">
      <div className="kanban-column-header">
        <h1 className='column-title'>{title}</h1>  
      </div>
      <hr id={id} />
      <div className='cards-wrapper'>
        {cardsData.map((card) => (
          <KanbanCard
            data={card}
            setTasks={setTasks}
            key={card.id}
            tagOptions={tagOptions}
          />
        ))}
      </div>
    </div>
  );
};