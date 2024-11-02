import "./KanbanBoard.css"
import { KanbanColumn } from "../KanbanColumn/KanbanColumn"

export const KanbanBoard = () => {

	const columns = [
		{
			id: 'to-do-style',
			title: 'To do'
		},
		{
			id: 'in-progress-style',
			title: 'In Progress'
		},
		{
			id: 'done-style',
			title: 'Done'
		},
	]

	return (
		<div id='kanban-wrapper'>
			{
				columns.map((column) =>
					(<KanbanColumn data={column} />))
			}
		</div>
	)

}