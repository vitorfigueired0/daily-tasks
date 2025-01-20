import { useEffect, useState } from "react";
import "./KanbanColumn.css";
import { KanbanCard } from "../KanbanCard/KanbanCard";
import { Droppable, Draggable } from "react-beautiful-dnd";



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
      
      <Droppable droppableId={statusId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='cards-wrapper'>
            {cardsData.map((card, index) => (
              <Draggable draggableId={`${card.id}`} index={index}>
                {(provided) => (
                  <KanbanCard
                  provided={provided}
                  innerRef={provided.innerRef}
                  data={card}
                  setTasks={setTasks}
                  key={card.id}
                  tagOptions={tagOptions}
                />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};