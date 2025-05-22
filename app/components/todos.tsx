import { TaskComposer } from "./task-composer";
import { TodoItem } from "./todo-item";
import { useTasks } from "~/lib/use-tasks";
import type { Task } from "@prisma/client";
import { LoadingButton } from "./loading-button";

export function Todos() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTasks();

	const tasks = data?.pages.flatMap((p) => p.tasks) ?? [];

	return (
		<div className="overflow-y-auto h-full">
			<ul className="divide-y divide-stone-200 dark:divide-neutral-700/50">
				<li className="sticky top-0 z-10">
					<TaskComposer />
				</li>

				{tasks.map((task) => (
					<li key={task.id}>
						<TodoItem task={task} />
					</li>
				))}

				<li className="p-4 text-center">
					<LoadingButton
						onClick={() => fetchNextPage()}
						isLoading={isFetchingNextPage}
						done={!hasNextPage && !isFetchingNextPage}
					/>
				</li>
			</ul>
		</div>
	);
}
