import type { Task } from "@prisma/client";
import React from "react";
import { usePaginatedResults } from "~/lib/use-paginated-results";
import { TaskComposer } from "./task-composer";
import { TodoItem } from "./todo-item";

async function load(previous: Task[][]) {
	const res = await fetch(`/list?page=${previous.length}`);
	const data = await res.json();

	return data.tasks;
}

export function Todos() {
	const { results, isLoading } = usePaginatedResults(load);
	const [newEntries, setNewEntries] = React.useState<Task[]>([]);

	const handleNewEntry = React.useCallback((task: Task) => {
		setNewEntries((prev) => [task, ...prev]);
	}, []);

	return (
		<div className="overflow-y-auto h-full">
			<ul className="divide-y divide-stone-200 dark:divide-neutral-700/50">
				<li className="sticky top-0 z-10">
					<TaskComposer onNewEntry={handleNewEntry} />
				</li>

				{[...newEntries, ...results.flat()].map((task) => (
					<li key={task.id}>
						<TodoItem task={task} />
					</li>
				))}
			</ul>
		</div>
	);
}
