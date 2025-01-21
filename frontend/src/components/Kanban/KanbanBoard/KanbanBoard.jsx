import "./KanbanBoard.css"
import { KanbanColumn } from "../KanbanColumn/KanbanColumn"
import { DragDropContext } from "react-beautiful-dnd";
import { api } from "../../../services/api"


export const KanbanBoard = ({ tasks, setTasks, tagOptions }) => {
	const columns = [
		{
			id: 'to-do-style',
			title: 'To do',
			statusId: 'pending'
		},
		{
			id: 'in-progress-style',
			title: 'In Progress',
			statusId: 'inProgress'
		},
		{
			id: 'done-style',
			title: 'Done',
			statusId: 'completed'
		},
	]

	const columnsData = columns.map((column) => {
		return ({
			...column,
			tasks: tasks.filter((task) => task.status === column.statusId),
		})
	}
		
);

	const onDragEnd = async (result) => {
		const taskId = result.draggableId;
		const movedTaskIndex = tasks.findIndex((task) => task.id == taskId);


		if ((movedTaskIndex != -1) && (result.destination.droppableId != result.source.droppableId)) {
			
			const updatedTasks = Array.of(...tasks)
			updatedTasks[movedTaskIndex].status = result.destination.droppableId

			setTasks(updatedTasks)


			const data = { status: result.destination.droppableId }
			try {
				await api.patch(`/tasks/${taskId}`, data, {
					headers: {
						Authorization: localStorage.getItem('authToken')
					}
				});

			} catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<div id='kanban-wrapper'>
			<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
				{
					columnsData.map((column, index) =>
						(<KanbanColumn data={column} tasks={tasks} key={index} setTasks={setTasks} tagOptions={tagOptions} />))
				}
			</DragDropContext>
		</div>
	)

}