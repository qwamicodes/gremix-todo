import { TodoItem } from "./todo-item";

export function Todos() {
	return (
		<div className="overflow-y-auto">
			<ul className="divide-y divide-stone-200 dark:divide-neutral-700/50">
				<li>
					<TodoItem
						title="Implement auth pages. Login, create account, forgot password, etc."
						status="todo"
						assignee="ebarthur"
					/>
				</li>
				<li>
					<TodoItem title="Setup project structure" status="in-progress" assignee="ebarthur" />
				</li>
				<li>
					<TodoItem title="Research on project stack" status="done" assignee="notgr" />
				</li>
			</ul>
		</div>
	);
}
