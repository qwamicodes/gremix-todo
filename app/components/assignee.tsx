import clsx from "clsx";
import type { Task } from "~/lib/types";
import { useTaskUpdate } from "~/lib/use-task-update";
import { AssigneeMenu } from "./assignee-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface AssigneeProps {
	task: Task;
}

function Assignee({ task }: AssigneeProps) {
	const update = useTaskUpdate(task);

	return (
		<Popover placement="bottom-end">
			<PopoverTrigger>
				<div
					data-assignee-button
					className={clsx(
						"flex items-center gap-1 bg-transparent text-sm font-mono text-secondary hover:bg-stone-200 dark:hover:bg-neutral-800 px-1 py-0.5 rounded-full",
					)}
				>
					<img
						src={`https://api.dicebear.com/9.x/dylan/svg?seed=${task.assignee}`}
						className="rounded-full size-5 bg-blue-500"
						alt={task.assignee}
					/>{" "}
					@{task.assignee}
				</div>
			</PopoverTrigger>

			<PopoverContent className="z-50 popover-content animate-fade-in animate-duration-200">
				<AssigneeMenu
					task={task}
					onAssigneeUpdate={(assignee) => update.mutate({ assignee })}
				/>
			</PopoverContent>
		</Popover>
	);
}

export { Assignee };
