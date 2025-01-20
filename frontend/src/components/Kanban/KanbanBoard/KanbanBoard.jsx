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

	const onDragEnd = async (result) => {
		const taskId = result.draggableId;
		const targetTask = tasks.rows.filter((task) => task.id === taskId);

		if (targetTask && (result.destination.droppableId != result.source.droppableId)) {
			const data = { status: result.destination.droppableId }
			try {
				await api.patch(`/tasks/${taskId}`, data, {
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
	}

	return (
		<div id='kanban-wrapper'>
			<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
				{
					columns.map((column, index) =>
						(<KanbanColumn data={column} tasks={tasks} key={index} setTasks={setTasks} tagOptions={tagOptions} />))
				}
			</DragDropContext>
		</div>
	)

}