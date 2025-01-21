import { useEffect, useState } from "react";
import "./KanbanColumn.css";
import { KanbanCard } from "../KanbanCard/KanbanCard";
import { Droppable, Draggable } from "react-beautiful-dnd";



export const KanbanColumn = ({ data, setTasks, tagOptions }) => {
  const { id, title, statusId } = data;

  return (
    <div className="kanban-column-wrapper">  
      <div className="kanban-column-header">
        <h1 className='column-title'>{title}</h1>
      </div>
      <hr id={id} />
      {data && (
        <Droppable droppableId={statusId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='cards-wrapper'>
            {data.tasks.map((card, index) => (
              <Draggable draggableId={`${card.id}`} index={index} key={card.id}>
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
      )}
    
    </div>
  )

};