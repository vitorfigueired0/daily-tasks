import "./KanbanBoard.css"
import { KanbanColumn } from "../KanbanColumn/KanbanColumn"

export const KanbanBoard = ({ tasks }) => {
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

	return (
		<div id='kanban-wrapper'>
			{
				columns.map((column) =>
					(<KanbanColumn data={column} tasks={tasks} />))
			}
		</div>
	)

}